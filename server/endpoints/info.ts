import { Router } from 'express';

const router = Router();

// return token owner info
router.get('/api/info', (req, res) => {
  const token = req.headers.authorization?.split(' ')?.[1];

  if (token) {
    res.status(200).json({
      serverTime: new Date().toISOString(),
    });

    return;
  }

  res.status(401).send();
});

export default router;
