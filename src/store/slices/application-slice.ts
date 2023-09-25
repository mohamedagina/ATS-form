import { SerializedError, createSlice } from '@reduxjs/toolkit';
import { fetchApplication, updateCover } from '../';
import { Application } from '../../models';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    isLoading: false,
    data: {} as Application,
    error: null as SerializedError | null
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchApplication.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchApplication.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchApplication.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(updateCover.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateCover.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(updateCover.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export const applicationReducer = applicationSlice.reducer;
