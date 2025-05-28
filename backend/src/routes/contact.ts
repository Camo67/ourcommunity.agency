import { Router, Request, Response } from 'express';
// import { sendEmailService } from '../services/emailService'; // Example email service import

const router = Router();

// This route would handle incoming contact form submissions
// (If you decide to move this logic from Supabase Edge Function to a dedicated backend)
router.post('/', async (req: Request, res: Response) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  try {
    // Example: Call an email service to send the notification
    // await sendEmailService(email, name, message);
    console.log(`Received contact message from ${name} (${email}): ${message}`);
    res.status(200).json({ message: 'Contact message received successfully!' });
  } catch (error: any) {
    console.error('Error processing contact form:', error.message);
    res.status(500).json({ error: 'Failed to process contact message.' });
  }
});

export default router;
