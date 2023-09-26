import { useState } from 'react';
import { Tooltip } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { AdditionalQuestion } from '../../models';
import './QuestionSummary.css';
import { QuestionForm } from '../';

type PropsType = {
  category: 'personalInformation' | 'profile' | 'customisedQuestions';
  question: AdditionalQuestion;
};

export const QuestionSummary = ({ question, category }: PropsType) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="question-summary">
      <span className="question-type">
        {question.duration
          ? `${question.duration} ${question.durationUnit}`
          : question.type}
      </span>

      <div className="question-info">
        {question.question}
        <Tooltip title="Edit" placement="top">
          <button
            className="text-btn"
            onClick={() => setIsEditing(curr => !curr)}
          >
            <EditOutlined />
          </button>
        </Tooltip>
      </div>

      {isEditing && (
        <QuestionForm
          questionToEdit={question}
          category={category}
          onClose={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};
