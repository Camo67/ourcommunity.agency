import { Router, Request, Response } from 'express';
// import { supabaseAdmin } from '../services/supabaseAdmin'; // Example for Supabase admin client

const router = Router();

// Placeholder for getting community data (e.g., events, news)
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Community API route' });
});

router.get('/events', async (req: Request, res: Response) => {
  try {
    // In a real application, you'd fetch data from a database here.
    // Example using Supabase Admin client (requires setup in services/supabaseAdmin.ts)
    // const { data, error } = await supabaseAdmin.from('community_events').select('*');
    // if (error) throw error;
    // res.status(200).json(data);

    // For now, return dummy data
    const dummyEvents = [
      { id: 1, name: 'Youth Mentorship Session', date: '2025-06-20', time: '10:00 AM', location: 'Online', description: 'Interactive session for youth mentorship.' },
      { id: 2, name: 'Local Clean-up Drive', date: '2025-07-05', time: '09:00 AM', location: 'Community Park', description: 'Join us to make our park cleaner!' },
    ];
    res.status(200).json(dummyEvents);
  } catch (error: any) {
    console.error('Error fetching community events:', error.message);
    res.status(500).json({ error: 'Failed to fetch community events' });
  }
});

export default router;
