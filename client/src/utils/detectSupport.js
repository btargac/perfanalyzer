export const detectSupport = entryTypes =>
  entryTypes.every(entry =>
    PerformanceObserver?.supportedEntryTypes?.includes(entry)
  );
