import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthContext.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './pages/App/App.jsx';
import Home from './pages/HomePage/HomePage.jsx';

// Lazy load components
const PublishedCampaigns = React.lazy(() => import('./pages/PublishedCampaignsPage.jsx'));
const CampaignDetail = React.lazy(() => import('./pages/CampaignDetailPage.jsx'));
const CampaignList = React.lazy(() => import('./pages/CampaignListPage.jsx'));
const SignUp = React.lazy(() => import('./pages/SignUpPage/SignUpPage.jsx'));
const LogIn = React.lazy(() => import('./pages/LogInPage/LogInPage.jsx'));
const NewCampaign = React.lazy(() => import('./pages/NewCampaignPage.jsx'));
const Profile = React.lazy(() => import('./pages/ProfilePage.jsx'));

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
      <AuthProvider>
        <Router>
          <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="campaigns" element={<Suspense fallback={<div>Loading...</div>}><CampaignList /></Suspense>} />
            <Route path="campaigns/published" element={<Suspense fallback={<div>Loading...</div>}><PublishedCampaigns /></Suspense>} />
            <Route path="new-campaign" element={<Suspense fallback={<div>Loading...</div>}><NewCampaign /></Suspense>} />
            <Route path="campaigns/:id" element={<Suspense fallback={<div>Loading...</div>}><CampaignDetail /></Suspense>} />
            <Route path="signup" element={<Suspense fallback={<div>Loading...</div>}><SignUp /></Suspense>} />
            <Route path="login" element={<Suspense fallback={<div>Loading...</div>}><LogIn /></Suspense>} />
            <Route path="profile" element={<Suspense fallback={<div>Loading...</div>}><Profile /></Suspense>} />
          </Route>
          </Routes>
        </Router>
      </AuthProvider>
  </React.StrictMode>
);