import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Image, Character } from "../../util/interfaces";

interface GameCharData {
    chars: Character[],
    foundChars: string[],
};

interface GameStartData {
    game: string
};

interface GameUpdateBody {
    coordX: number,
    coordY: number,
    char: string
}

interface ReturnMessage {
    message: string
}

interface ScoreData {
    time: string,
    username: string,
    map: {id: string, name: string},
    gameid: string
}

interface ScoresReturn {
    scores: ScoreData[],
}

interface ScoreInput {
    username: string,
    gameid: string,
}

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000"
    }),
    tagTypes: ["Score", "Chars", "GameScore"],
    endpoints: builder => ({
        
            fetchImages: builder.query<Image[], void> ({
                query: () => `/image`,
            }),
            startGame: builder.mutation<GameStartData, number> ({
                query: (imageid) => ({
                    url: `/game${imageid ? `?imageid=${imageid}` : ""}`,
                    method: "POST",
                }),
                invalidatesTags:["Chars", "GameScore"],
            }),
            getCharacters: builder.query<GameCharData, string> ({
                query: (gameid) => ({
                    url: `/game/${gameid}/characters`,
                }),
                providesTags: ["Chars"],
                transformResponse(responseData: GameCharData) {
                    const response = {
                        chars: responseData.chars.map((char) => {
                            return {
                                    ...char, 
                                    found: responseData.foundChars.includes(char.id)
                                }
                        }),
                        foundChars: responseData.foundChars
                    };
                    return response
                }


            }),
            updateGame: builder.mutation<ReturnMessage, {body: GameUpdateBody, gameid: string}> ({
                query:  ({body, gameid}) => ({
                    url: `/game/${gameid}`,
                    method: "PUT",
                    body,
                }),
                async onQueryStarted({body, gameid}, lifecycleApi) {
                    try {
                    const {data: res} = await lifecycleApi.queryFulfilled;
                    if (res.message === "Correct Coordinates" || res.message === "Game Finished") {
                        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                        const patchResult = lifecycleApi.dispatch(
                            apiSlice.util.updateQueryData("getCharacters", gameid, draft => {
                                const foundChar = draft.chars.find((char) => char.id === body.char);
                                if (foundChar) {
                                    foundChar.found = true;
                                }
                            } )
                        )
                    }
                    // eslint-disable-next-line no-empty
                    } catch {}

                }
            }),
            getScore: builder.query<ScoresReturn, void> ({
                query: () => "/scoreboard",
                providesTags: ["Score"]
            }),
            addScore: builder.mutation<ReturnMessage, ScoreInput> ({
                query: ({username, gameid}) => ({
                    url: `/scoreboard/${gameid}`,
                    method: "POST",
                    body: {username}
                }),
                invalidatesTags: ["Score"]
            }),
            getScoreOfGame: builder.query<{score : ScoreData} , string> ({
                query: (gameid) => ({
                    url: `/scoreboard/${gameid}`,
                }),
                providesTags: ["GameScore"]
            })
    })
});

export const { 
    useFetchImagesQuery,
    useStartGameMutation,
    useUpdateGameMutation, 
    useAddScoreMutation, 
    useGetScoreQuery,
    useGetCharactersQuery,
    useGetScoreOfGameQuery,
    
} = apiSlice;