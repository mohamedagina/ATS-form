import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '..';
import { message } from 'antd';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;
export const updateCover = createAsyncThunk(
  'application/updateCover',
  async (newCover: File, { getState }) => {
    //here I just sent a blob url because I can not send the real file
    const coverTempURL = (window.URL || window.webkitURL).createObjectURL(
      newCover
    );

    const state = getState() as RootState;
    const currentApplication = state.application.data;
    const newApplication = {
      ...currentApplication,
      attributes: { ...currentApplication.attributes, coverImage: coverTempURL }
    };

    try {
      await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: newApplication })
      });
      message.success('Image updated successfully', 3);
    } catch (ex) {
      message.error("Couldn't update the image", 3);
    }

    return newApplication;
  }
);

export const deleteCover = createAsyncThunk(
  'application/deleteCover',
  async (_, { getState }) => {
    const coverTempURL = 'http://example.com';

    const state = getState() as RootState;
    const currentApplication = state.application.data;
    const newApplication = {
      ...currentApplication,
      attributes: { ...currentApplication.attributes, coverImage: coverTempURL }
    };

    try {
      await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: newApplication })
      });
      message.success('Image deleted successfully', 3);
    } catch (ex) {
      message.error("Couldn't delete the image", 3);
    }

    return newApplication;
  }
);
