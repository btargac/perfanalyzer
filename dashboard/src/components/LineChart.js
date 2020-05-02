import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const data = [
  {
    id: 'japan',
    color: 'hsl(103, 70%, 50%)',
    data: [
      {
        x: 'plane',
        y: 240,
      },
      {
        x: 'helicopter',
        y: 140,
      },
      {
        x: 'boat',
        y: 98,
      },
      {
        x: 'train',
        y: 148,
      },
      {
        x: 'subway',
        y: 224,
      },
      {
        x: 'bus',
        y: 21,
      },
      {
        x: 'car',
        y: 32,
      },
      {
        x: 'moto',
        y: 164,
      },
      {
        x: 'bicycle',
        y: 253,
      },
      {
        x: 'horse',
        y: 94,
      },
      {
        x: 'skateboard',
        y: 172,
      },
      {
        x: 'others',
        y: 77,
      },
    ],
  },
];

export const LineChart = ({ data }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ format: '%Y-%m-%dT%H:%M:%S.%L%Z', type: 'time' }}
    xFormat="time:%Y-%m-%dT%H:%M:%S.%L%Z"
    yScale={{
      type: 'linear',
      min: 'auto',
      max: 'auto',
      stacked: true,
      reverse: false,
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: 'bottom',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'date',
      legendOffset: 36,
      legendPosition: 'middle',
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'ms',
      legendOffset: -40,
      legendPosition: 'middle',
    }}
    colors={{ scheme: 'blue_purple' }}
    curve="natural"
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 100,
        translateY: 0,
        itemsSpacing: 0,
        itemDirection: 'left-to-right',
        itemWidth: 80,
        itemHeight: 20,
        itemOpacity: 0.75,
        symbolSize: 12,
        symbolShape: 'circle',
        symbolBorderColor: 'rgba(0, 0, 0, .5)',
        effects: [
          {
            on: 'hover',
            style: {
              itemBackground: 'rgba(0, 0, 0, .03)',
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);
