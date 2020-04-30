import mongoose from 'mongoose';

const metricSchema = mongoose.Schema({
  networkTimings: {
    css: [Number],
    font: [Number],
    img: [Number],
    script: [Number],
  },
  TTFB: Number,
  DCL: Number,
  LOAD: Number,
  FCP: Number,
});

export const Metric = mongoose.model('Metric', metricSchema);
