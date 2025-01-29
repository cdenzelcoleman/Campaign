import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import HomePage from '../HomePage/HomePage';
import CampaignListPage from '../CampaignListPage';
import CampaignDetailPage from '../CampaignDetailPage.jsx';
import NewCampaignPage from '../NewCampaignPage.jsx';
import ProfilePage from '../ProfilePage.jsx';
import PublishedCampaignsPage from '../PublishedCampaignsPage.jsx';
import SignUpPage from '../SignUpPage/SignUpPage.jsx';
import LogInPage from '../LogInPage/LogInPage.jsx';
import ProtectedRoute from '../../components/ProtectedRoute.jsx';

const App = () => {
  return (
    <Router>
      <NavBar /> {/* Ensure NavBar is outside Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/campaigns" element={<CampaignListPage />} />
        <Route path="/campaigns/published" element={<PublishedCampaignsPage />} />
        <Route path="/campaigns/:campaignId" element={<CampaignDetailPage />} />
        <Route
          path="/new-campaign"
          element={
            <ProtectedRoute>
              <NewCampaignPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;