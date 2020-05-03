import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { BarChart } from '../components/BarChart';
import { LineChart } from '../components/LineChart';
import { ReactComponent as EmptyImage } from '../images/no-data.svg';

import {
  fetchMetrics,
  fetchMetricsByDate,
  selectMetrics,
  selectLoading,
} from '../store/slices/metricsSlice';

const _30MinutesToMillisecs = 30 * 60 * 1000;

export default function Metrics() {
  const metrics = useSelector(selectMetrics);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - _30MinutesToMillisecs)
  );
  const [endDate, setEndDate] = useState(new Date());
  const [isDateSelected, setIsDateSelected] = useState(false);

  const fetchHandler = () => {
    dispatch(
      startDate
        ? fetchMetricsByDate({
            startDate: startDate.getTime(),
            endDate: endDate.getTime(),
          })
        : fetchMetrics()
    );
  };

  const dateChangeHandler = (date, type) => {
    setIsDateSelected(true);
    type === 'start' ? setStartDate(date) : setEndDate(date);
  };

  useEffect(() => {
    dispatch(fetchMetrics());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isDateSelected) {
      fetchHandler();
    }
    // eslint-disable-next-line
  }, [startDate, endDate, isDateSelected]);

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

  const commonDatePickerProps = {
    timeIntervals: 15,
    showTimeSelect: true,
    dateFormat: 'MMMM d, yyyy h:mm aa',
    popperModifiers: {
      offset: {
        enabled: true,
        offset: '5px, 10px',
      },
      preventOverflow: {
        enabled: true,
        escapeWithReference: false,
        boundariesElement: 'viewport',
      },
    },
  };

  return (
    <div className="metrics">
      <div className="metric-controls">
        <Link className="navigation-button" to="/">
          <span role="img" aria-label="Home">
            🏠
          </span>
          Back
        </Link>
        <div className="date-picker">
          <div className="date-picker__title">Start Date</div>
          <DatePicker
            {...commonDatePickerProps}
            selected={startDate}
            onChange={date => dateChangeHandler(date, 'start')}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            popperPlacement="bottom-start"
            maxDate={endDate}
          />
        </div>
        <div className="date-picker">
          <div className="date-picker__title">End Date</div>
          <DatePicker
            {...commonDatePickerProps}
            selected={endDate}
            onChange={date => dateChangeHandler(date, 'end')}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            popperPlacement="bottom-end"
            maxDate={new Date()}
          />
        </div>
      </div>
      {metrics?.length ? (
        <>
          <div className="chart-holder">
            <div className="chart-title">Time to First Byte</div>
            <LineChart data={ttfbData} color={'hsl(282,70%,50%)'} />
          </div>
          <div className="chart-holder">
            <div className="chart-title">First Contentful Paint</div>
            <LineChart data={fcpData} color={'hsl(143,62%,25%)'} />
          </div>
          <div className="chart-holder">
            <div className="chart-title">Document Load</div>
            <LineChart data={dclData} color={'hsl(212,85%,43%)'} />
          </div>
          <div className="chart-holder">
            <div className="chart-title">Window LOAD</div>
            <LineChart data={loadData} color={'hsl(1,82%,39%)'} />
          </div>
          <div className="chart-holder">
            <div className="chart-title">Network Timings</div>
            <BarChart data={networkTimingsData} color={'hsl(1,82%,39%)'} />
          </div>
        </>
      ) : loading === 'idle' ? (
        <div className="empty-metrics">
          <h3>Oops no data found</h3>
          <EmptyImage className="empty-image" />
          <span>Try selecting a different date range</span>
        </div>
      ) : null}
    </div>
  );
}
