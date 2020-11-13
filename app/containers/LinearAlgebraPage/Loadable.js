/**
 * Asynchronously loads the component for LinearAlgebraPage
 */
import React from 'react';

import Loadable from 'react-loadable';

import CenteredParagraph from 'components/CenteredParagraph';
import Spinner from 'components/MonkeyPatchedSpinKit';
import Section from 'components/Section';

export default Loadable({
  loader: () => import('./index').catch(e => console.error(e)),
  loading: () => (
    <Section title="" anchor="none">
      <CenteredParagraph>
        <p>Loading</p>
        <Spinner name="folding-cube" />
      </CenteredParagraph>
    </Section>
  ),
});
