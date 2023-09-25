import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { Tabs, CoverUpload, Panel, InfoSummary } from '../../components';
import './ContentManagement.css';
import { SummaryOptions } from '../../models';

const ApplicationForm = () => {
  const { personalInformation, profile } = useSelector(
    (state: RootState) => state.application.data.attributes
  );
  return (
    <div className="application-form">
      <CoverUpload />
      <Panel title="Personal Information">
        <div className="information-panel">
          {Object.keys(personalInformation).map(
            infoTitle =>
              infoTitle !== 'personalQuestions' && (
                <InfoSummary
                  key={infoTitle}
                  title={infoTitle}
                  category="personalInformation"
                  options={
                    personalInformation[
                      infoTitle as keyof typeof personalInformation
                    ] as SummaryOptions
                  }
                />
              )
          )}
        </div>
      </Panel>

      <Panel title="Profile Information">
        <div className="information-panel">
          {Object.keys(profile).map(
            infoTitle =>
              infoTitle !== 'profileQuestions' && (
                <InfoSummary
                  key={infoTitle}
                  title={infoTitle}
                  category="profile"
                  options={
                    profile[infoTitle as keyof typeof profile] as SummaryOptions
                  }
                />
              )
          )}
        </div>
      </Panel>
    </div>
  );
};

const tabs = [
  { id: '0', title: 'Program Details' },
  { id: '1', title: 'Application Form', component: <ApplicationForm /> },
  { id: '2', title: 'Workflow' },
  { id: '3', title: 'Preview' }
];

export const ContentManagement = () => {
  const [searchParams] = useSearchParams();

  const activeTab = tabs.find(
    tab => tab.id === (searchParams.get('tab') ?? '1')
  );
  return (
    <div className="content-page">
      <header>
        <Tabs tabs={tabs} />
      </header>

      <div className="tab-content">
        {activeTab?.component ?? (
          <div className="unfinished-component">Coming soon...</div>
        )}
      </div>
    </div>
  );
};
