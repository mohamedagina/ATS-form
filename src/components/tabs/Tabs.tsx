import { Link, useSearchParams } from 'react-router-dom';
import './Tabs.css';

type Tab = {
  id: string;
  title: string;
  component?: JSX.Element;
};

type TabsProps = {
  tabs: Tab[];
};

export const Tabs = ({ tabs }: TabsProps) => {
  const [searchParams] = useSearchParams();

  return (
    <ul className="tabs-list">
      {tabs.map(tab => (
        <li key={tab.id}>
          <Link
            className={`tab-link ${
              (searchParams.get('tab') ?? '1') === tab.id ? 'active' : ''
            }`}
            to={`?tab=${tab.id}`}
          >
            {tab.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};
