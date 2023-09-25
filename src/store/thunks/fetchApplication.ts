import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchApplication = createAsyncThunk(
  'application/fetch',
  async () => {
    const response = await (
      await fetch(
        'http://127.0.0.1:4010/api/918.8516051839101/programs/et/application-form'
      )
    ).json();

    return response.data;
  }
);
