import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Status } from "../../types/statusType";
import { RootState } from "../store";
import axios from "axios";
import { IUser } from "../../types/userModel";

interface UserStateType {
  users: IUser[];
  currentUser: IUser | null;
  status: Status;
  error: string | null;
  token: string | null
}

const initialState: UserStateType = {
  users: [],
  currentUser: null,
  status: "idle",
  error: null,
  token: localStorage.getItem('token') || null,
  
};

const BASE_URL = import.meta.env.VITE_BASE_URL;



export const fetchUsers = createAsyncThunk('users/fetchusers',
  async (_,{getState}) => {
    const state = getState() as { user: UserStateType };
      const response = await axios.get(BASE_URL,{
        headers:{
          Authorization: `Bearer ${state.user.token}`
        }
      });
      return response.data
  
  })

export const fetchCurrentUser = createAsyncThunk('users/fetchcurrentuser',
  async (_,{getState}) => {
    const state = getState() as { user: UserStateType };
  
      const response = await axios.get(BASE_URL,{
        headers:{
          Authorization: `Bearer ${state.user.token}`
        }
      });
      return response.data
  
  })


export const register = createAsyncThunk('users/register',async (user: IUser): Promise<IUser|undefined> => {
  
      const response = await axios.post(`${BASE_URL}/register`, user);
      return response.data
      
    })
    
    export const login = createAsyncThunk('users/login',async (user: IUser): Promise<IUser|undefined> => {
      
      const response = await axios.post(`${BASE_URL}/login`, user);
      localStorage.setItem('token', response.data.token);
    return response.data

})
 


export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending";
        state.error = null
    })
    .addCase(fetchUsers.fulfilled, (state, action) => {
        if (action.payload) state.users = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.error = "Can't fetch users";
        state.status = "rejected";
      })
      .addCase(register.pending, (state) => {
        state.status = "pending";
        state.error = null
    })
    .addCase(register.fulfilled, (state, action) => {
        if (action.payload) state.users.push(action.payload);
        state.status = "fulfilled";
      })
      .addCase(register.rejected, (state) => {
        state.error = "Can't register user";
        state.status = "rejected";
      })
      .addCase(login.pending, (state) => {
        state.status = "pending";
        state.error = null
    })
    .addCase(login.fulfilled, (state, action) => {
        if (action.payload) state.currentUser = action.payload;
        state.status = "fulfilled";
      })
      .addCase(login.rejected, (state) => {
        state.currentUser = null;      
        state.error = "Can't login user";
        state.status = "rejected";
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        if (action.payload) state.currentUser = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.currentUser = null;      
        state.error = "Can't login user";
        state.status = "rejected";
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "pending";
        state.error = null
    })

  },
});

export default usersSlice.reducer
