import { useEffect } from 'react';
import { SideBar } from './components';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ContentManagement } from './pages';

import { useDispatch } from 'react-redux';
import { fetchApplication } from './store';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';

function App() {
  const dispatch = useDispatch<ThunkDispatch<any, void, AnyAction>>();

  useEffect(() => {
    dispatch(fetchApplication());
  }, [dispatch]);

  return (
    <>
      <SideBar />
      <Routes>
        <Route path="/" element={<ContentManagement />} />
      </Routes>
    </>
  );
}

export default App;
