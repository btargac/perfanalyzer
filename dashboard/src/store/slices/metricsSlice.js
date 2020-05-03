import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const metricAPIEndpoint = process.env.REACT_APP_METRIC_API_ENDPOINT;

export const fetchMetricsByDate = createAsyncThunk(
  'metrics/fetchMetricsByDate',
  async ({ startDate, endDate }, thunkAPI) => {
    let url = `${metricAPIEndpoint}${
      startDate ? '?startDate=' + startDate : ''
    }`;

    if (startDate && endDate) {
      url = `${url}&endDate=${endDate}`;
    } else if (endDate) {
      url = `${url}?endDate=${endDate}`;
    }
    const response = await fetch(url);
    return await response.json();
  }
);

export const fetchMetrics = createAsyncThunk(
  'metrics/fetchMetrics',
  async () => {
    const response = await fetch(metricAPIEndpoint);
    return await response.json();
  }
);

export const metricsSlice = createSlice({
  name: 'metrics',
  initialState: {
    data: [],
    loading: 'idle',
  },
  reducers: {},
  extraReducers: {
    [fetchMetrics.pending]: state => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    [fetchMetrics.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.data = action.payload;
      }
    },
    [fetchMetricsByDate.pending]: state => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    },
    [fetchMetricsByDate.fulfilled]: (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.data = action.payload;
      }
    },
  },
});

const { reducer } = metricsSlice;
export const selectMetrics = state => state.metrics.data;
export const selectLoading = state => state.metrics.loading;

export default reducer;
