import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LineChart } from '../components/LineChart';

import {
  fetchMetrics,
  fetchMetricsByDate,
  selectMetrics,
} from '../store/slices/metricsSlice';

export default function Metrics() {
  const metrics = useSelector(selectMetrics);
  const dispatch = useDispatch();
  const [withDate, setWithDate] = useState(false);
  // TOD: add a data picker to filter the api response

  const fetchHandler = () => {
    dispatch(
      withDate ? fetchMetricsByDate({ startDate: Date.now() }) : fetchMetrics()
    );
  };

  useEffect(() => {
    fetchHandler();
    // eslint-disable-next-line
  }, []);

  // get data for specific charts
  const ttfbData = {
    color: 'hsl(103, 70%, 50%)',
    id: 'TTFB',
    data: metrics?.map(metric => ({
      x: metric.createdAt,
      y: metric.TTFB,
    })),
  };

  const fcpData = {
    id: 'FCP',
    data: metrics?.map(metric => ({
      x: metric.createdAt,
      y: metric.FCP,
    })),
  };

  const dclData = {
    id: 'DCL',
    data: metrics?.map(metric => ({
      x: metric.createdAt,
      y: metric.DCL,
    })),
  };

  const loadData = {
    id: 'LOAD',
    data: metrics?.map(metric => ({
      x: metric.createdAt,
      y: metric.LOAD,
    })),
  };

  console.log('ttfbData', ttfbData);

  return (
    <div className="metrics">
      <div className="chart-holder">
        <div className="chart-title">TTFB</div>
        {metrics?.length ? <LineChart data={ttfbData} /> : null}
      </div>
      <div className="chart-holder">
        <div className="chart-title">FCP</div>
        {metrics?.length ? <LineChart data={fcpData} /> : null}
      </div>
      <div className="chart-holder">
        <div className="chart-title">DCL</div>
        {metrics?.length ? <LineChart data={dclData} /> : null}
      </div>
      <div className="chart-holder">
        <div className="chart-title">LOAD</div>
        {metrics?.length ? <LineChart data={loadData} /> : null}
      </div>
      an extra bar chart for load durations ?
    </div>
  );
}
