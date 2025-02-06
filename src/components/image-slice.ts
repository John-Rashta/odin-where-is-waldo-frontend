import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image } from "../../util/interfaces";

interface nestState {
    gameOver: boolean,
    image: Image
}

const initialState: nestState = {
    gameOver: true,
    image: {
        id: 0,
        name: "0",
        url: "0"
    }
};

export const imageSlice = createSlice({
    name: "image",
    initialState,
    reducers: create => ({
        setImage: create.reducer((state, action: PayloadAction<Image> ) => {
             state.image = action.payload;
        }),
        setGameState: create.reducer((state, action: PayloadAction<boolean>) => {
            state.gameOver = action.payload;
        })
    }),
    selectors: {
        selectId: data => data.image.id,
        selectName: data => data.image.name,
        selectUrl: data => data.image.url,
        selectImage: data => data.image,
        selectGameState: data => data.gameOver
    }
});

export const { setImage, setGameState } = imageSlice.actions;
export const { selectId, selectName, selectUrl, selectImage, selectGameState } = imageSlice.selectors;


