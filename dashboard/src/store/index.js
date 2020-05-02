import { configureStore } from '@reduxjs/toolkit';

import metricReducer from './slices/metricsSlice';

export default configureStore({
  // combineReducers is not necessary here since we'll have a flat store with only one level of slices
  reducer: {
    metrics: metricReducer,
  },
});
