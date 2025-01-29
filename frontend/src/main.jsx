import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes } from 'react-router';
import CampaignDetail from './components/CampaignDetail.jsx';
import { PublishCampaign } from './components/PublishCampaign.jsx';
import './index.css';
import App from './pages/App/App.jsx';

React.Dom.render(
  <React.StrictMode>
    <Router>
      <Routes>
        {/* routes */}
        <Route path="/campaigns/:id" element={<CampaignDetail />} />
        <Route path="/campaigns/:id/publish" element={<PublishCampaign />} />
        {/* routes */}
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
