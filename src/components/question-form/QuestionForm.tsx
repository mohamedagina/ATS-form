import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion, deleteQuestion, updateQuestion } from '../../store';
import {
  CloseOutlined,
  PlusOutlined,
  UnorderedListOutlined
} from '@ant-design/icons';
import { Checkbox, Form, Input, Select, Tooltip, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { AdditionalQuestion, QuestionType } from '../../models';
import './QuestionForm.css';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

const questionTypes = [
  { value: 'Paragraph', label: 'Paragraph' },
  { value: 'ShortAnswer', label: 'Short answer' },
  { value: 'YesNo', label: 'Yes or No' },
  { value: 'Dropdown', label: 'Dropdown' },
  { value: 'MultipleChoice', label: 'Multiple choice' },
  { value: 'Date', label: 'Date' },
  { value: 'Number', label: 'Number' },
  { value: 'FileUpload', label: 'File upload' },
  { value: 'VideoQuestion', label: 'Video question' }
];

export const QuestionForm = ({
  category,
  questionToEdit,
  onClose
}: {
  category: 'personalInformation' | 'profile' | 'customisedQuestions';
  questionToEdit?: AdditionalQuestion;
  onClose?: () => void;
}) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [choices, setChoices] = useState<string[]>(
    questionToEdit?.choices || ['']
  );
  const [questionType, setQuestionType] = useState<QuestionType>(
    questionToEdit?.type || 'Paragraph'
  );

  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();
  const [form] = Form.useForm();

  const handleAddChoice = () => {
    if (!choices.every(Boolean)) {
      message.error('Please fill current choices first!', 2);
      return;
    }
    setChoices(curr => [...curr, '']);
  };

  const handleSave = (values: AdditionalQuestion) => {
    let newQuestion = { ...values };
    if (['Dropdown', 'MultipleChoice'].includes(questionType))
      newQuestion.choices = choices;

    if (values.maxChoice) newQuestion.maxChoice = Number(newQuestion.maxChoice);
    if (values.duration) newQuestion.duration = Number(newQuestion.duration);

    if (!questionToEdit) {
      dispatch(addQuestion({ question: newQuestion, category }))
        .unwrap()
        .then(() => resetForm());
      return;
    }

    dispatch(
      updateQuestion({
        question: { ...questionToEdit, ...newQuestion },
        category
      })
    )
      .unwrap()
      .then(() => resetForm());
  };

  const resetForm = () => {
    form.resetFields();
    setChoices(questionToEdit?.choices || ['']);
    setQuestionType(questionToEdit?.type || 'Paragraph');
    setIsAdding(false);
    if (onClose) onClose();
  };

  const handleDelete = () => {
    if (questionToEdit) {
      dispatch(deleteQuestion({ question: questionToEdit, category }))
        .unwrap()
        .then(() => resetForm());
      return;
    }

    resetForm();
  };

  return (
    <Form
      className="add-question-form"
      initialValues={questionToEdit || { type: questionTypes[0].value }}
      form={form}
      onFinish={handleSave}
      onReset={handleDelete}
      layout="vertical"
      requiredMark={false}
    >
      {!isAdding && !questionToEdit ? (
        <button
          className="text-btn add-question-btn"
          type="button"
          onClick={() => setIsAdding(true)}
        >
          <PlusOutlined /> Add a question
        </button>
      ) : (
        <>
          <Form.Item name="type" label="Type">
            <Select
              options={questionTypes}
              onChange={value => setQuestionType(value)}
            />
          </Form.Item>

          <Form.Item
            name="question"
            label="Question"
            rules={[{ required: true, message: 'Please enter your question!' }]}
          >
            <Input placeholder="Type here" />
          </Form.Item>

          {questionType === 'YesNo' && (
            <Form.Item name="disqualify" valuePropName="checked">
              <Checkbox>Disqualify candidate if the answer is no</Checkbox>
            </Form.Item>
          )}

          {['Dropdown', 'MultipleChoice'].includes(questionType) && (
            <div className="choices-inputs">
              <span>Choice</span>
              {choices.map((choice, i) => (
                <Form.Item
                  key={i}
                  rules={[
                    { required: true, message: 'Please enter the choice!' }
                  ]}
                >
                  <div className="choice-input">
                    <UnorderedListOutlined />

                    <Input
                      placeholder="Type here"
                      value={choice}
                      onChange={e =>
                        setChoices(current =>
                          current.map((_choice, index) =>
                            index === i ? e.target.value : _choice
                          )
                        )
                      }
                    />

                    <Tooltip title="Add a choice">
                      <button
                        type="button"
                        className="text-btn"
                        onClick={handleAddChoice}
                      >
                        <PlusOutlined />
                      </button>
                    </Tooltip>
                  </div>
                </Form.Item>
              ))}

              <Form.Item name="other" valuePropName="checked">
                <Checkbox>Enable “Other” option</Checkbox>
              </Form.Item>
            </div>
          )}

          {questionType === 'MultipleChoice' && (
            <Form.Item
              name="maxChoice"
              label="Max choice allowed"
              rules={[
                { required: true, message: 'Please enter choice allowed!' },
                {
                  pattern: /^[1-9]\d*/,
                  message: 'Please enter a valid number!'
                }
              ]}
            >
              <Input placeholder="Enter number of choice allowed here" />
            </Form.Item>
          )}

          {questionType === 'VideoQuestion' && (
            <>
              <Form.Item name="description">
                <TextArea
                  placeholder="Additional information"
                  autoSize={{ minRows: 2, maxRows: 4 }}
                />
              </Form.Item>

              <Form.Item label="BirthDate" style={{ marginBottom: 0 }}>
                <Form.Item
                  name="duration"
                  rules={[
                    {
                      pattern: /^[1-9]\d*/,
                      message: 'Please enter a valid number!'
                    }
                  ]}
                  style={{
                    display: 'inline-block',
                    marginInlineEnd: '0.5rem',
                    width: 'calc(60% - 8px)'
                  }}
                >
                  <Input placeholder="Max duration of video" />
                </Form.Item>

                <Form.Item
                  name="durationUnit"
                  style={{ display: 'inline-block', width: '40%' }}
                >
                  <Select
                    placeholder="in (sec/min)"
                    options={[
                      { value: 'minute', label: 'Minute' },
                      { value: 'second', label: 'Second' }
                    ]}
                  />
                </Form.Item>
              </Form.Item>
            </>
          )}

          <div className="form-buttons">
            <button type="reset" className="text-btn danger">
              <CloseOutlined /> Delete question
            </button>
            <button type="submit" className="submit-btn">
              Save
            </button>
          </div>
        </>
      )}
    </Form>
  );
};
