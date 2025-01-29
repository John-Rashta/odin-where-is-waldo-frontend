import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Image {
    id: string,
    name: string,
    url: string
};

interface Character {
    id: string,
    name: string,
    imageUrl: string
};

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
    map: [{id: string, name: string}],
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
            startGame: builder.mutation<GameStartData, number|void> ({
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
            updateGame: builder.mutation<ReturnMessage, {body: GameUpdateBody, gameid: string}> ({
                query:  ({body, gameid}) => ({
                    url: `/game/${gameid}`,
                    method: "PUT",
                    body,
                })
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
    useStartGameMutation, 
    useUpdateGameMutation, 
    useAddScoreMutation, 
    useGetScoreQuery 
} = apiSlice;