import { communicator, storage } from './utils';

// TTFB, domContentLoadedEvent and load events are handled
const navigationObserver = new PerformanceObserver((list, obs) => {
  for (const entry of list.getEntries()) {
    storage.set({
      TTFB: entry.responseStart,
      DCL: entry.domContentLoadedEventEnd,
      LOAD: entry.duration,
    });
  }
  // Disconnect observer since callback is only triggered once.
  obs.disconnect();
});

navigationObserver.observe({ type: 'navigation', buffered: true });

// FCP event is handled
const paintObserver = new PerformanceObserver((list, obs) => {
  for (const entry of list.getEntriesByName('first-contentful-paint')) {
    storage.set({
      FCP: entry.responseStart,
    });
    // Disconnect observer since first-contentful-paint is only triggered once.
    obs.disconnect();
  }
});

// Start observing paint entry types.
paintObserver.observe({
  type: 'paint',
  buffered: true,
});

// create an eventListener and send the data when it's the right time to send metrics
communicator.initListener();
