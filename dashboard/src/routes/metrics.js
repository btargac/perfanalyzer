import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { BarChart } from '../components/BarChart';
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
  const ttfbData = [
    {
      id: 'TTFB',
      data: metrics?.map(metric => ({
        x: metric.createdAt,
        y: metric.TTFB,
      })),
    },
  ];

  const fcpData = [
    {
      id: 'FCP',
      data: metrics?.map(metric => ({
        x: metric.createdAt,
        y: metric.FCP,
      })),
    },
  ];

  const dclData = [
    {
      id: 'DCL',
      data: metrics?.map(metric => ({
        x: metric.createdAt,
        y: metric.DCL,
      })),
    },
  ];

  const loadData = [
    {
      id: 'LOAD',
      data: metrics?.map(metric => ({
        x: metric.createdAt,
        y: metric.LOAD,
      })),
    },
  ];

  const networkTimingsData = metrics?.map(metric => ({
    date: metric.createdAt,
    cssColor: 'hsl(135, 70%, 50%)',
    fontColor: 'hsl(308, 70%, 50%)',
    imgColor: 'hsl(351, 70%, 50%)',
    scriptColor: 'hsl(113, 70%, 50%)',
    // construct an object like {css: 0, image: 0, ...} end spread it
    ...Object.fromEntries(
      Object.entries(metric.networkTimings).map(([key, values]) => [
        key,
        values.reduce((acc, curr) => acc + curr, 0),
      ])
    ),
  }));

  return (
    <div className="metrics">
      <div className="chart-holder">
        <div className="chart-title">Time to First Byte</div>
        {metrics?.length ? (
          <LineChart data={ttfbData} color={'hsl(282,70%,50%)'} />
        ) : null}
      </div>
      <div className="chart-holder">
        <div className="chart-title">First Contentful Paint</div>
        {metrics?.length ? (
          <LineChart data={fcpData} color={'hsl(143,62%,25%)'} />
        ) : null}
      </div>
      <div className="chart-holder">
        <div className="chart-title">Document Load</div>
        {metrics?.length ? (
          <LineChart data={dclData} color={'hsl(212,85%,43%)'} />
        ) : null}
      </div>
      <div className="chart-holder">
        <div className="chart-title">Window LOAD</div>
        {metrics?.length ? (
          <LineChart data={loadData} color={'hsl(1,82%,39%)'} />
        ) : null}
      </div>
      <div className="chart-holder">
        <div className="chart-title">Network Timings</div>
        {metrics?.length ? (
          <BarChart data={networkTimingsData} color={'hsl(1,82%,39%)'} />
        ) : null}
      </div>
    </div>
  );
}
