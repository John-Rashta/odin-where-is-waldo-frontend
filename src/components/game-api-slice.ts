import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Image, Character } from "../../util/interfaces";

interface GameStartData {
    chars: Character[],
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
    endpoints: builder => ({
        
            fetchImages: builder.query<Image[], void> ({
                query: () => `/image`,
            }),
            startGame: builder.query<GameStartData, number> ({
                query: (imageid) => ({
                    url: `/game${imageid ? `?imageid=${imageid}` : ""}`,
                    method: "POST",
                }),
                transformResponse(responseData: GameStartData) {
                    return {
                        game: responseData.game,
                        chars: responseData.chars.map((char) => {
                            return {...char, found: false}
                        }),
                    }
                }
            }),
            updateGame: builder.mutation<ReturnMessage, {body: GameUpdateBody, gameid: string, imageid: number}> ({
                query:  ({body, gameid}) => ({
                    url: `/game/${gameid}`,
                    method: "PUT",
                    body,
                }),
                async onQueryStarted({body, imageid}, lifecycleApi) {
                    try {
                    const {data: res} = await lifecycleApi.queryFulfilled;
                    if (res.message === "Correct Coordinates") {
                        // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
                        const patchResult = lifecycleApi.dispatch(
                            apiSlice.util.updateQueryData("startGame", imageid, draft => {
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
            getScore: builder.query<ScoreData[], void> ({
                query: () => "/score",
            }),
            addScore: builder.mutation<ReturnMessage, ScoreInput> ({
                query: ({username, gameid}) => ({
                    url: `/score/${gameid}`,
                    method: "POST",
                    body: {username}
                })
            })
    })
});

export const { 
    useFetchImagesQuery, 
    useLazyStartGameQuery,
    useUpdateGameMutation, 
    useAddScoreMutation, 
    useGetScoreQuery 
} = apiSlice;