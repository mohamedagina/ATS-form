import { Checkbox, Switch } from 'antd';
import './InfoSummary.css';
import { SummaryOptions } from '../../models';
import { revertCamelCase } from '../../helpers';

import { useDispatch } from 'react-redux';
import { updateInformation } from '../../store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type PropsType = {
  title: string;
  category: 'personalInformation' | 'profile';
  options: SummaryOptions;
};
export const InfoSummary = ({ title, options, category }: PropsType) => {
  const optionalOption = options.hasOwnProperty('internalUse')
    ? 'internalUse'
    : 'mandatory';
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();

  const handleSwitchChange = (checked: boolean) => {
    const newInfo = { ...options, show: !checked };
    dispatch(updateInformation({ newInfo, category, title }));
  };

  const handleCheckChange = (e: CheckboxChangeEvent) => {
    const newInfo = { ...options, [optionalOption]: e.target.checked };
    dispatch(updateInformation({ newInfo, category, title }));
  };

  return (
    <div className="info-summary">
      {revertCamelCase(title)}
      <div className="info-options">
        <Checkbox
          defaultChecked={options[optionalOption]}
          onChange={handleCheckChange}
        >
          {optionalOption === 'internalUse' ? 'Internal' : 'Mandatory'}
        </Checkbox>

        <label className="switch-label">
          <Switch
            defaultChecked={!options.show}
            onChange={handleSwitchChange}
          />{' '}
          {options.show ? 'Hide' : 'Show'}
        </label>
      </div>
    </div>
  );
};
