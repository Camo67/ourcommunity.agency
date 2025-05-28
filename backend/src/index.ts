import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; // For handling Cross-Origin Resource Sharing

// Import your route modules here as you create them
import communityRoutes from './routes/community';
import contactRoutes from './routes/contact';
import servicesRoutes from './routes/services';

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 4000; // Use a different port than frontend (e.g., 4000)

// Middleware
app.use(cors()); // Configure CORS as needed for your frontend domain
app.use(express.json()); // Enable parsing of JSON request bodies

// Define your API routes
app.use('/api/community', communityRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/services', servicesRoutes);

// Simple health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Backend is running!' });
});

// Root endpoint for the backend (optional)
app.get('/', (req, res) => {
  res.send('Our Community in Unity Backend API');
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});
