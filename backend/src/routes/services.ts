import { Router, Request, Response } from 'express';

const router = Router();

// Placeholder for getting service details
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Services API route' });
});

router.get('/:id', (req: Request, res: Response) => {
  const serviceId = req.params.id;
  // In a real app, fetch service details from DB
  const dummyService = {
    id: serviceId,
    name: `Service ${serviceId} Example`,
    description: `Detailed description for service ${serviceId}.`,
    benefits: ['Benefit 1', 'Benefit 2']
  };
  res.status(200).json(dummyService);
});

export default router;import { Router, Request, Response } from 'express';

const router = Router();

// Placeholder for getting service details
router.get('/', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Services API route' });
});

router.get('/:id', (req: Request, res: Response) => {
  const serviceId = req.params.id;
  // In a real app, fetch service details from DB
  const dummyService = {
    id: serviceId,
    name: `Service ${serviceId} Example`,
    description: `Detailed description for service ${serviceId}.`,
    benefits: ['Benefit 1', 'Benefit 2']
  };
  res.status(200).json(dummyService);
});

export default router;
