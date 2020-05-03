import { Router } from 'express';

import { Metric } from '../data';

const router = Router();
const _30MinutesToMillisecs = 30 * 60 * 1000;

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
  const { startDate, endDate } = req.query;
  const queryStartDate = +startDate || Date.now() - _30MinutesToMillisecs;
  const dbQuery = {
    createdAt: {
      $gte: new Date(queryStartDate),
      ...(endDate ? { $lte: new Date(+endDate) } : {}),
    },
  };

  try {
    const metrics = await Metric.find(dbQuery);

    res.json(metrics);
  } catch (err) {
    next(err);
  }
});

export default router;
