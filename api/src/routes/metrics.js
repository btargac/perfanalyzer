import { Router } from 'express';

import { Metric } from '../data';

const router = Router();

router.post('/', async (req, res, next) => {
  try {
    const data = JSON.parse(req.body);

    const metric = new Metric(data);

    await metric.save();

    res.set('Content-Length', 0);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const metrics = await Metric.find({});

    res.json(metrics);
  } catch (err) {
    next(err);
  }
});

export default router;
