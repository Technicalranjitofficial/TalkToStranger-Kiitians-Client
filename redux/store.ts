import { configureStore } from "@reduxjs/toolkit";
import SocketSlice from "./slice/SocketSlice";

export const store = configureStore({
reducer:{
    socketSlice:SocketSlice
}
})


export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch