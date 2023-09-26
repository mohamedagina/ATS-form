import { SerializedError, createSlice } from '@reduxjs/toolkit';
import {
  fetchApplication,
  updateCover,
  updateInformation,
  deleteCover,
  addQuestion,
  updateQuestion,
  deleteQuestion
} from '../';
import { Application } from '../../models';

const applicationSlice = createSlice({
  name: 'application',
  initialState: {
    isLoading: false,
    data: {
      id: '',
      type: 'applicationForm',
      attributes: {
        coverImage: 'http://example.com',
        personalInformation: {
          firstName: {
            internalUse: false,
            show: true
          },
          lastName: {
            internalUse: false,
            show: true
          },
          emailId: {
            internalUse: false,
            show: true
          },
          phoneNumber: {
            internalUse: false,
            show: true
          },
          nationality: {
            internalUse: false,
            show: true
          },
          currentResidence: {
            internalUse: false,
            show: true
          },
          idNumber: {
            internalUse: false,
            show: true
          },
          dateOfBirth: {
            internalUse: false,
            show: true
          },
          gender: {
            internalUse: false,
            show: true
          },
          personalQuestions: [{ id: '', type: 'Paragraph', question: '' }]
        },
        profile: {
          education: {
            mandatory: true,
            show: true
          },
          experience: {
            mandatory: true,
            show: true
          },
          resume: {
            mandatory: true,
            show: true
          },
          profileQuestions: []
        },
        customisedQuestions: []
      }
    } as Application,
    error: null as SerializedError | null
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchApplication.pending, state => {
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

    builder.addCase(deleteCover.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteCover.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteCover.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(updateInformation.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateInformation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(updateInformation.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(addQuestion.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(addQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(updateQuestion.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(updateQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(updateQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });

    builder.addCase(deleteQuestion.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteQuestion.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  }
});

export const applicationReducer = applicationSlice.reducer;
