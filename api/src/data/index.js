import mongoose from 'mongoose';

const opts = {
  timestamps: true,
};

const metricSchema = mongoose.Schema(
  {
    networkTimings: {
      css: [Number],
      font: [Number],
      img: [Number],
      script: [Number],
    },
    TTFB: { type: Number, min: 0 },
    DCL: { type: Number, min: 0 },
    LOAD: { type: Number, min: 0 },
    FCP: { type: Number, min: 0 },
  },
  opts
);

export const Metric = mongoose.model('Metric', metricSchema);
