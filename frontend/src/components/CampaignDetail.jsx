import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getCampaignById, likeCampaign, commentCampaign, publishCampaign } from '../services/campaignService';
import CommentSection from './CommentSection';

const CampaignDetail = () => {};