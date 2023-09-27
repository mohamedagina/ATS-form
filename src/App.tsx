import { useEffect } from 'react';
import { SideBar } from './components';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ContentManagement, UnderConstruction } from './pages';

import { useDispatch } from 'react-redux';
import { fetchApplication } from './store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { ConfigProvider } from 'antd';

function App() {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();

  useEffect(() => {
    dispatch(fetchApplication());
  }, [dispatch]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#087B2F'
        }
      }}
    >
      <SideBar />
      <Routes>
        <Route path="/" element={<ContentManagement />} />
        <Route path="*" element={<UnderConstruction />} />
      </Routes>
    </ConfigProvider>
  );
}

export default App;
