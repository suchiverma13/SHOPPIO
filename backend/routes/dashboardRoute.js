import express from 'express';
import { getDashboardData } from '../controllers/dashboardController.js';
// Correct import: using a default import
import adminAuth from '../middleware/adminAuth.js'; 

const dashboardRouter = express.Router();

// The API endpoint for your dashboard
// Add the 'adminAuth' middleware here to protect the route
dashboardRouter.get('/dashboard', adminAuth, getDashboardData);

export default dashboardRouter;