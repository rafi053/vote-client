import { configureStore } from "@reduxjs/toolkit";
import  users  from './features/usersSlice'
import  candidates  from './features/candidatesSlice'

export const store = configureStore({
    reducer:{
        users: users,
        candidates: candidates
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch