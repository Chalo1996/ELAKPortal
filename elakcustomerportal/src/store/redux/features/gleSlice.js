import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://sisos-eu.azurewebsites.net/api/cmd";

const initialState = {
  gleData: [],
  isLoading: true,
  isError: false,
};

export const fetchData = createAsyncThunk(
  "funeralExpense/fetchData",
  async (data, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    if (!token) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const dataToPost = {
        cmd: "ExeChain",
        data: {
          chain: "M3TrainingGLECalculator",
          context: JSON.stringify(data),
        },
      };
      const response = await axios.post(url, dataToPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("funeralExpense response: ", response);
      return response.data.outData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const funeralExpenseSlice = createSlice({
  name: "funeralExpense",
  initialState: initialState,
  reducers: {
    resetData: (state) => {
      state.isLoading = true;
      state.gleData = [];
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.gleData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { resetData } = funeralExpenseSlice.actions;
export const { reducer: funeralExpenseReducer } = funeralExpenseSlice;
