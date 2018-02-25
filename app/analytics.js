/*
 * app/analytics
 *
 * A higher-order component to control sending analytics to segmentio
 */

import { metrics } from 'react-metrics';

const SEGMENT_CLIENT_ID = 'PLACEHOLDER_KEY';

class SegmentAnalyticsApi {
  constructor() {
    window.analytics.load(SEGMENT_CLIENT_ID);
  }
  pageView(category, name, props, options) {
    window.analytics.page(category, name, props, options);
  }
  track(event, props) {
    window.analytics.track(event, props);
  }
}

export default metrics({
  vendors: [
    {
      api: new SegmentAnalyticsApi(),
    },
  ],
});
