import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './pages/App/App.jsx';
import PublishedCampaigns from './pages/PublishedCampaignsPage.jsx';
import CampaignDetail from './pages/CampaignDetailPage.jsx';
import CampaignList from './pages/CampaignListPage.jsx';
import SignUp from './pages/SignUpPage/SignUpPage.jsx'; 
import LogIn from './pages/LogInPage/LogInPage.jsx'; 
import NewCampaign from './pages/NewCampaignPage.jsx';
import Profile from './pages/ProfilePage.jsx';
import Home from './pages/HomePage/HomePage.jsx';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
      <AuthProvider>
        <Router>
          <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="campaigns" element={<CampaignList />} />
            <Route path="campaigns/published" element={<PublishedCampaigns />} />
            <Route path="campaigns/:id" element={<CampaignDetail />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
            <Route path="new-campaign" element={<NewCampaign />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          </Routes>
        </Router>
      </AuthProvider>
  </React.StrictMode>
);