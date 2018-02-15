/**
 * Asynchronously loads the component for LinearAlgebraPage
 */
import React from 'react';

import Loadable from 'react-loadable';
import Spinner from 'react-spinkit';

import CenteredParagraph from 'components/CenteredParagraph';
import Section from 'components/Section';

export default Loadable({
  loader: () => import('./index'),
  loading: () => (
    <Section title="">
      <CenteredParagraph>
        <Spinner name="folding-cube" />
      </CenteredParagraph>
    </Section>
  ),
});
