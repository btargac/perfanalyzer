import React from 'react';
import { ResponsiveLine } from '@nivo/line';

export const LineChart = ({ data, color }) => (
  <ResponsiveLine
    data={data}
    margin={{ top: 50, right: 100, bottom: 80, left: 60 }}
    xScale={{
      format: '%Y-%m-%dT%H:%M:%S.%LZ',
      type: 'time',
    }}
    xFormat="time:%Y-%m-%dT%H:%M:%S.%LZ"
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
      tickRotation: -30,
      format: '%Y/%m/%d %H:%M:%S',
      legend: 'date',
      legendOffset: 75,
      legendPosition: 'middle',
    }}
    axisLeft={{
      orient: 'left',
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'ms',
      legendOffset: -50,
      legendPosition: 'middle',
    }}
    colors={color}
    curve="natural"
    enablePointLabel={true}
    pointSize={10}
    pointColor={{ theme: 'background' }}
    pointBorderWidth={2}
    pointBorderColor={{ from: 'serieColor' }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
    legends={[
      {
        anchor: 'top-right',
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
