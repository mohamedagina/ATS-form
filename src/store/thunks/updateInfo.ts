import { createAsyncThunk } from '@reduxjs/toolkit';
import { SummaryOptions } from '../../models';
import { RootState } from '..';
import { message } from 'antd';

type UpdateInfoArgs = {
  newInfo: SummaryOptions;
  category: 'personalInformation' | 'profile';
  title: string;
};

const BASE_URL = process.env.REACT_APP_BASE_URL as string;
export const updateInformation = createAsyncThunk(
  'application/updateInfo',
  async ({ newInfo, category, title }: UpdateInfoArgs, { getState }) => {
    const state = getState() as RootState;
    const currentApplication = state.application.data;

    const newApplication = {
      ...currentApplication,
      attributes: {
        ...currentApplication.attributes,
        [category]: {
          ...currentApplication.attributes[category],
          [title]: newInfo
        }
      }
    };

    try {
      await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: newApplication })
      });
      message.success(`${category} information updated successfully`, 3);
    } catch (ex) {
      message.error(`Couldn't update ${category} information`, 3);
    }

    return newApplication;
  }
);
