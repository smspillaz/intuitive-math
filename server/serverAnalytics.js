/*
 * server/serverAnalytics
 *
 * A higher-order component to control sending analytics to segmentio
 * with compatibility with node.
 */

import { metrics } from 'react-metrics';
import Analytics from 'analytics-node';

const SEGMENT_CLIENT_ID = 'PLACEHOLDER_KEY';

class SegmentAnalyticsApi {
  constructor() {
    this.analytics = new Analytics(SEGMENT_CLIENT_ID);
  }
  pageView(category, name, props, options) {
    this.analytics.page(category, name, props, options);
  }
  track(event, props) {
    this.analytics.track(event, props);
  }
}

export default metrics({
  vendors: [
    {
      api: new SegmentAnalyticsApi(),
    },
  ],
});
