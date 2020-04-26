/*
 * app/analytics
 *
 * A higher-order component to control sending analytics to segmentio
 */

import { metrics } from 'react-metrics';

const SEGMENT_CLIENT_ID = 'PLACEHOLDER_KEY';

const hasKey = (obj, key, then) => {
  if (Object.keys(obj).indexOf(key) !== -1) {
    then();
  }
};

class SegmentAnalyticsApi {
  constructor() {
    hasKey(window, 'analytics', () =>
      hasKey(window.analytics, 'load', () =>
        window.analytics.load(SEGMENT_CLIENT_ID),
      ),
    );
  }

  pageView(category, name, props, options) {
    hasKey(window, 'analytics', () =>
      window.analytics.page(category, name, props, options),
    );
  }

  track(event, props) {
    hasKey(window, 'analytics', () => window.analytics.track(event, props));
  }
}

export default metrics({
  vendors: [
    {
      api: new SegmentAnalyticsApi(),
    },
  ],
});
