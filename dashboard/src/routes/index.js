import React from 'react';

const MetricsComponent = React.lazy(() => import('./metrics'));
const HomeComponent = React.lazy(() => import('./home'));

export const routes = [
  {
    path: '/',
    exact: true,
    component: HomeComponent,
  },
  {
    path: '/metrics',
    component: MetricsComponent,
  },
];
