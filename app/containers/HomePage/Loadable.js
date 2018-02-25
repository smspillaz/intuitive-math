/**
 * Asynchronously loads the component for HomePage
 */
import React from 'react';

import Loadable from 'react-loadable';

import CenteredParagraph from 'components/CenteredParagraph';
import Spinner from 'components/MonkeyPatchedSpinKit';
import Section from 'components/Section';

export default Loadable({
  loader: () => import('./index'),
  loading: () => (
    <Section title="">
      <CenteredParagraph>
        <Spinner name="circle" />
      </CenteredParagraph>
    </Section>
  ),
});
