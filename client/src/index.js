// TTFB, domContentLoadedEvent and load events are handled
const perfObserver = new PerformanceObserver((list, obs) => {
  for (const entry of list.getEntries()) {
    // TODO: transfer the data to api
    console.log('Time to first byte', entry.responseStart);
    console.log('DOMContentLoaded', entry.domContentLoadedEventEnd);
    console.log('load Complete', entry.duration);
  }
  // Disconnect observer since callback is only triggered once.
  obs.disconnect();
});

perfObserver.observe({ type: 'navigation', buffered: true });

// FCP event is handled
const paintObserver = new PerformanceObserver((list, obs) => {
  for (const entry of list.getEntriesByName('first-contentful-paint')) {
    console.log('First Contentful Paint', entry.startTime);
    obs.disconnect();
  }
});

// Start observing paint entry types.
paintObserver.observe({
  type: 'paint',
  buffered: true,
});

// Send the collected data to perfanalyzer server once the user leaves the tab.
addEventListener(
  'visibilitychange',
  function fn() {
    if (document.visibilityState === 'hidden') {
      const perfData = new FormData();

      perfData.append('entries', JSON.stringify(performance.getEntries()));

      // Check for sendBeacon support:
      if ('sendBeacon' in navigator) {
        // Beacon the requested
        if (navigator.sendBeacon('https://www.buraktargac.com', perfData)) {
          console.log('sendBeacon success');
        } else {
          // sendBeacon failed! Use XHR or fetch instead
          // TODO fallback scenario should be handled with axios or redaxios
          console.log('sendbeacon failed');
        }
      } else {
        // sendBeacon not available! Use XHR or fetch instead
        console.log('sendbeacon not available');
      }
      removeEventListener('visibilitychange', fn, true);
    }
  },
  true
);
