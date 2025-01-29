import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import SignUpPage from './SignUpPage/SignUpPage';
import LogInPage from './LogInPage/LogInPage';
import CampaignListPage from './CampaignListPage.jsx';
import CampaignDetailPage from './CampaignDetailPage.jsx';
import PublishedCampaignsPage from './PublishedCampaignsPage.jsx';
import NewCampaignPage from './NewCampaignPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/campaigns" element={<CampaignListPage />} />
      <Route path="/campaigns/published" element={<PublishedCampaignsPage />} />
      <Route
        path="/campaigns/new"
        element={
          <ProtectedRoute>
            <NewCampaignPage />
          </ProtectedRoute>
        }
      />
      <Route path="/campaigns/:id" element={<CampaignDetailPage />} />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      {/* more routes*/}
    </Routes>
  );
};

export default App;