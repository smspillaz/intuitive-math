/**
 * Asynchronously loads the component for HomePage
 */
import React from 'react';

import Loadable from 'react-loadable';

import CenteredParagraph from 'components/CenteredParagraph';
import Spinner from 'components/MonkeyPatchedSpinKit';
import Section from 'components/Section';

console.log('Entered loadable js');

import('./index').then((imported) => {
  console.log('Did import of index');
})

export default Loadable({
  loader: () => import('./index'),
  loading: () => (
    <Section title="" anchor="none">
      <CenteredParagraph>
        <Spinner name="circle" />
      </CenteredParagraph>
    </Section>
  ),
});
