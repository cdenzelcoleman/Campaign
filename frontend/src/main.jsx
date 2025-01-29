import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import NavBar from './components/NavBar/NavBar';
import CampaignDetail from './components/CampaignDetail.jsx';
import PublishedCampaigns from './components/PublishedCampaigns.jsx';
import HomePage from './pages/HomePage/HomePage';
import LogInPage from './pages/LogInPage/LogInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import PostListPage from './pages/PostListPage/PostListPage';
import NewPostPage from './pages/NewPostPage/NewPostPage';
import ProtectedRoute from './components/ProtectedRoute.jsx'; 

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route
            path="/posts"
            element={
              <ProtectedRoute>
                <PostListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/new"
            element={
              <ProtectedRoute>
                <NewPostPage />
              </ProtectedRoute>
            }
          />
          <Route path="/campaigns/published" element={<PublishedCampaigns />} />
          <Route path="/campaigns/:id" element={<CampaignDetail />} />
          {/* other routes */}
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);