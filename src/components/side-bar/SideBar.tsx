import { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import {
  HomeOutlined,
  MenuOutlined,
  ScheduleOutlined
} from '@ant-design/icons';
import { Tooltip } from 'antd';

import { getImagePlaceholder } from '../../helpers';

import './SideBar.css';

const navLinks = [
  { path: '/dashboard', title: 'Dashboard', icon: <HomeOutlined /> },
  { path: '/todo', title: 'Todo', icon: <ScheduleOutlined /> }
];

const user = { name: 'mohamed agina' };

export const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarEl = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const sidebar = sidebarEl.current;
    if (!sidebar) return;

    const handleClose = (e: MouseEvent) => {
      if (!sidebar.contains(e.target as Node)) setIsExpanded(false);
    };

    document.addEventListener('click', handleClose, true);

    return () => document.removeEventListener('click', handleClose);
  }, []);

  return (
    <div className={`overlay-wrapper ${isExpanded ? 'expanded' : ''}`}>
      <aside ref={sidebarEl} className="app-sidebar">
        <Tooltip placement="right" title={isExpanded ? 'Collapse' : 'Expand'}>
          <button
            className="burger-btn"
            onClick={() => setIsExpanded(current => !current)}
          >
            <MenuOutlined />
          </button>
        </Tooltip>

        <nav>
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.title}>
                <Tooltip placement="right" title={isExpanded ? '' : link.title}>
                  <NavLink to={link.path}>
                    {link.icon} {isExpanded && link.title}
                  </NavLink>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
        <div className="user-identity">
          <Tooltip placement="top" title={isExpanded ? '' : user.name}>
            <span className="profile-picture">
              {getImagePlaceholder(user.name)}
            </span>
          </Tooltip>
          {isExpanded && user.name}
        </div>
      </aside>
    </div>
  );
};
