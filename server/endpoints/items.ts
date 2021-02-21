import { Router } from 'express';
import authentication from '../middleware/authentication';
import { getItems, updateItem } from '../services/itemManager';

const router = Router();

router.get('/api/items', authentication, (req, res) => {
  res.status(200).json({
    items: getItems(),
  });
});

router.post('/api/items', authentication, (req, res) => {
  const { id, title, description, password } = req.body

  if (!id || !title || !password) {
    res.status(400).json({
      error: 'mandatory parameter is missing',
    })
    return
  }
  
  const itemData = {
    id,
    title,
    description,
    password,
    createdAt: new Date().toISOString(),
  }

  updateItem(itemData)

  res.status(200).json({
    ...itemData,
  })
});

export default router;
