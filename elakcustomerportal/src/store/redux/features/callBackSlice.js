import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://sisos-eu.azurewebsites.net/api/cmd";

const initialState = {
  data: {},
  isLoading: false,
  error: null,
};

export const fetchData = createAsyncThunk(
  "callBack/fetchData",
  async (data, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const { token } = getState().auth;

    if (!token) {
      return rejectWithValue("No token found");
    }

    try {
      const requestData = {
        cmd: "ExeChain",
        data: {
          chain: "M3TrainingCallBackEmail",
          context: JSON.stringify(data),
        },
      };
      const response = await axios.post(url, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("callBack response: ", response.data);
      return response.data.outData;
    } catch (error) {
      console.error("fetchData error:", error);
      return rejectWithValue(error.message || error.response?.data || "Error occurred");
    }
  }
);

const callBackSlice = createSlice({
  name: "callBack",
  initialState: initialState,
  reducers: {
    resetData: (state) => {
      state.isLoading = false;
      state.error = null;
      state.data = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Error occurred";
      });
  },
});

export const { resetData } = callBackSlice.actions;
export const callBackReducer = callBackSlice.reducer;
