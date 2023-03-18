import { configureStore } from "@reduxjs/toolkit";

import homeSliceReucer from "./homeSlice";


export const store = configureStore({
    reducer: {
        home: homeSliceReucer
    }
});