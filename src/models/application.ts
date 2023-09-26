export type PersonalBasicQuestion = {
  internalUse: boolean;
  show: boolean;
};

export type QuestionType =
  | 'Paragraph'
  | 'ShortAnswer'
  | 'YesNo'
  | 'Dropdown'
  | 'MultipleChoice'
  | 'Date'
  | 'Number'
  | 'FileUpload'
  | 'VideoQuestion';

export type AdditionalQuestion = {
  id: string;
  type: QuestionType;
  question: string;
  choices?: string[];
  maxChoice?: number;
  disqualify?: boolean;
  other?: boolean;
  durationUnit?: 'minute' | 'second';
  duration?: number;
  description?: string;
};

interface PersonalInfo {
  firstName: PersonalBasicQuestion;
  lastName: PersonalBasicQuestion;
  emailId: PersonalBasicQuestion;
  phoneNumber: PersonalBasicQuestion;
  nationality: PersonalBasicQuestion;
  currentResidence: PersonalBasicQuestion;
  idNumber: PersonalBasicQuestion;
  dateOfBirth: PersonalBasicQuestion;
  gender: PersonalBasicQuestion;
  personalQuestions: AdditionalQuestion[];
}

export type profileBasicQuestion = {
  mandatory: boolean;
  show: boolean;
};

interface profileInfo {
  education: profileBasicQuestion;
  experience: profileBasicQuestion;
  resume: profileBasicQuestion;
  profileQuestions: AdditionalQuestion[];
}

export interface Application {
  id: string;
  type: string;
  attributes: {
    coverImage: string;
    personalInformation: PersonalInfo;
    profile: profileInfo;
    customisedQuestions: AdditionalQuestion[];
  };
}

export type SummaryOptions = {
  show: boolean;
  mandatory?: boolean;
  internalUse?: boolean;
};
