import { useSearchParams } from 'react-router-dom';

import { Tabs, CoverUpload } from '../../components';
import './ContentManagement.css';

const ApplicationForm = () => {
  return (
    <div className="application-form">
      <CoverUpload />
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
