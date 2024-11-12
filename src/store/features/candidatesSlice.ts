import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./../store";
import axios from "axios";
import { Status } from "./../../types/statusType";
import { ICandidate } from "../../types/candidateModel";

interface CandidateStateType {
  candidates:ICandidate [];
  status: Status;
  error: string | null;
}

const initialState: CandidateStateType = {
  candidates: [
    // {
    //   _id: "1",
    //   name: "Candidate 1",
    //   image: "https://picsum.photos/200/300?random=3",
    //   votes: 0,
    // },
  ],
  
  status: "idle",
  error: null,
};

const BASE_URL = import.meta.env.VITE_BASE_URL;



export const fetchCandidate = createAsyncThunk('candidates/fetchcandidates',async (): Promise<ICandidate[]|undefined> => {

  console.log(localStorage.getItem("token"));
  
      const response = await axios.get(`${"http://localhost:3000"}/candidates`,{
        headers:{
          Authorization: "barer " + localStorage.getItem("token")
        }
      });
      
      
      return response.data
  
  })

export const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCandidate.pending, (state) => {
        state.status = "pending";
        state.error = null
    })
    .addCase(fetchCandidate.fulfilled, (state, action) => {
        if (action.payload) state.candidates = action.payload;
        state.status = "fulfilled";
      })
      .addCase(fetchCandidate.rejected, (state) => {
        state.error = "Can't fetch candidates";
        state.status = "rejected";
      })
  },
});

export default candidatesSlice.reducer
