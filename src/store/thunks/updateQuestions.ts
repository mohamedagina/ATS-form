import { createAsyncThunk } from '@reduxjs/toolkit';
import { AdditionalQuestion } from '../../models';
import { RootState } from '..';
import { message } from 'antd';

const BASE_URL = process.env.REACT_APP_BASE_URL as string;
export const addQuestion = createAsyncThunk(
  'application/addQuestion',
  async (
    {
      question,
      category
    }: {
      question: AdditionalQuestion;
      category: 'personalInformation' | 'profile' | 'customisedQuestions';
    },
    { getState }
  ) => {
    const state = getState() as RootState;
    const currentApplication = state.application.data;
    const newQuestion = {
      ...question,
      id: crypto.randomUUID()
    };

    let newApplication;
    if (category === 'customisedQuestions') {
      newApplication = {
        ...currentApplication,
        attributes: {
          ...currentApplication.attributes,
          customisedQuestions:
            currentApplication.attributes.customisedQuestions.concat(
              newQuestion
            )
        }
      };
    } else if (category === 'personalInformation') {
      newApplication = {
        ...currentApplication,
        attributes: {
          ...currentApplication.attributes,
          personalInformation: {
            ...currentApplication.attributes.personalInformation,
            personalQuestions:
              currentApplication.attributes.personalInformation.personalQuestions.concat(
                newQuestion
              )
          }
        }
      };
    } else if (category === 'profile') {
      newApplication = {
        ...currentApplication,
        attributes: {
          ...currentApplication.attributes,
          profile: {
            ...currentApplication.attributes.profile,
            profileQuestions:
              currentApplication.attributes.profile.profileQuestions.concat(
                newQuestion
              )
          }
        }
      };
    } else return currentApplication;

    try {
      await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: newApplication })
      });
      message.success('New question was added successfully', 3);
    } catch (ex) {
      message.error("Couldn't Add the new question", 3);
    }

    return newApplication;
  }
);

export const updateQuestion = createAsyncThunk(
  'application/updateQuestion',
  async (
    {
      question,
      category
    }: {
      question: AdditionalQuestion;
      category: 'personalInformation' | 'profile' | 'customisedQuestions';
    },
    { getState }
  ) => {
    const state = getState() as RootState;
    const currentApplication = state.application.data;
    let newApplication;
    if (category === 'customisedQuestions') {
      newApplication = {
        ...currentApplication,
        attributes: {
          ...currentApplication.attributes,
          customisedQuestions:
            currentApplication.attributes.customisedQuestions.map(_question =>
              question.id === _question.id ? question : _question
            )
        }
      };
    } else if (category === 'personalInformation') {
      newApplication = {
        ...currentApplication,
        attributes: {
          ...currentApplication.attributes,
          personalInformation: {
            ...currentApplication.attributes.personalInformation,
            personalQuestions:
              currentApplication.attributes.personalInformation.personalQuestions.map(
                _question =>
                  question.id === _question.id ? question : _question
              )
          }
        }
      };
    } else if (category === 'profile') {
      newApplication = {
        ...currentApplication,
        attributes: {
          ...currentApplication.attributes,
          profile: {
            ...currentApplication.attributes.profile,
            profileQuestions:
              currentApplication.attributes.profile.profileQuestions.map(
                _question =>
                  question.id === _question.id ? question : _question
              )
          }
        }
      };
    } else return currentApplication;

    try {
      await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: newApplication })
      });
      message.success('New question was added successfully', 3);
    } catch (ex) {
      message.error("Couldn't Add the new question", 3);
    }

    return newApplication;
  }
);

export const deleteQuestion = createAsyncThunk(
  'application/deleteQuestion',
  async (
    {
      question,
      category
    }: {
      question: AdditionalQuestion;
      category: 'personalInformation' | 'profile' | 'customisedQuestions';
    },
    { getState }
  ) => {
    const state = getState() as RootState;
    const currentApplication = state.application.data;

    let newApplication;
    if (category === 'customisedQuestions') {
      newApplication = {
        ...currentApplication,
        attributes: {
          ...currentApplication.attributes,
          customisedQuestions:
            currentApplication.attributes.customisedQuestions.filter(
              _question => question.id !== _question.id
            )
        }
      };
    } else if (category === 'personalInformation') {
      newApplication = {
        ...currentApplication,
        attributes: {
          ...currentApplication.attributes,
          personalInformation: {
            ...currentApplication.attributes.personalInformation,
            personalQuestions:
              currentApplication.attributes.personalInformation.personalQuestions.filter(
                _question => question.id !== _question.id
              )
          }
        }
      };
    } else if (category === 'profile') {
      newApplication = {
        ...currentApplication,
        attributes: {
          ...currentApplication.attributes,
          profile: {
            ...currentApplication.attributes.profile,
            profileQuestions:
              currentApplication.attributes.profile.profileQuestions.filter(
                _question => question.id !== _question.id
              )
          }
        }
      };
    } else return currentApplication;

    try {
      await fetch(BASE_URL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ data: newApplication })
      });
      message.success('New question was added successfully', 3);
    } catch (ex) {
      message.error("Couldn't Add the new question", 3);
    }

    return newApplication;
  }
);
