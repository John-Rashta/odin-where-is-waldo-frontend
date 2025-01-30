import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Image } from "../../util/interfaces";

interface nestState {
    image: Image
}

const initialState: nestState = {
    image: {
        id: 1,
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
    }),
    selectors: {
        selectId: data => data.image.id,
        selectName: data => data.image.name,
        selectUrl: data => data.image.url,
        selectImage: data => data.image
    }
});

export const { setImage } = imageSlice.actions;
export const { selectId, selectName, selectUrl, selectImage } = imageSlice.selectors;


