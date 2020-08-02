/*
 * Subspaces
 *
 * Section on subspaces, what they do, how they work.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import AxisVisualization3D from 'components/AxisVisualization3D';
import Plane from 'components/Plane';
import Section from 'components/Section';
import Strong from 'components/Strong';

const SubspacesSection = () => (
  <Section title="Subspaces" anchor="subspaces">
    <p>
      Given some subset of numbers in an n-dimensional space, one of the
      questions you might get asked is whether or not those numbers make up a
      subspace.
    </p>
    <p>
      To answer that question, it is worth defining what a subspace is in terms
      of its formal properties, then what it is in laymans terms, then the
      visual definition, showing why it is that those properties need to be
      satisfied.
    </p>
    <p>
      For those unfamiliar, we will be using a little bit of set notation here -{' '}
      <MathJax.Node inline formula="\in" /> stands for{' '}
      <Strong>is a member of</Strong>. When we use{' '}
      <MathJax.Node inline formula="(x, y, z): z = C(x, y)" /> we are describing
      a set containing all three dimensional vectors that satisfy the condition
      that <MathJax.Node inline formula="z" /> equals some function{' '}
      <MathJax.Node inline formula="C(x, y)" />. We also often use letters from
      the greek alphabet to describe arbitrary constants, for instance alpha{' '}
      <MathJax.Node inline formula="\alpha" /> and beta{' '}
      <MathJax.Node inline formula="\beta" />.
    </p>
    <p>The formal definition of a subspace is as follows:</p>
    <ul>
      <li>It must contain the zero-vector.</li>
      <li>
        It must be <Strong>closed under addition</Strong>: if{' '}
        <MathJax.Node inline formula="v_1 \in S" /> and{' '}
        <MathJax.Node inline formula="v_2 \in S" /> for any{' '}
        <MathJax.Node inline formula="v_1, v_2" />, then it must be true that{' '}
        <MathJax.Node inline formula="(v_1 + v_2) \in S" /> or else{' '}
        <MathJax.Node inline formula="S" /> is not a subspace.
      </li>
      <li>
        It must be <Strong>closed under scalar multiplication</Strong>: if{' '}
        <MathJax.Node inline formula="v \in S" /> then{' '}
        <MathJax.Node inline formula="\alpha v \in S" />, else{' '}
        <MathJax.Node inline formula="S" /> is not a subspace.
      </li>
    </ul>
    <p>
      All of that was just a fancy way of saying that a subspace just needs to
      define some equal or lesser-dimensional space that ranges from positive
      infinity to negative infinity and passes through the origin.
    </p>
    <p>
      So for instance, valid subspace for a three dimensional space might be{' '}
      <MathJax.Node inline formula="z = 2x + 3y" />, which is a plane:
    </p>
    <AxisVisualization3D
      title="A plane, which is a subspace"
      render={() => (
        <group>
          <Plane
            a={2}
            b={3}
            c={-1}
            d={0}
            transparent
            opacity={0.5}
            extents={[-1, 1]}
            color={0x0099bb}
          />
        </group>
      )}
    />
    <p>
      And does <MathJax.Node inline formula="{(x, y, z): z = 2x + 3y}" />{' '}
      satisfy our three propositions? Well, we can prove this with a bit of
      analysis:
    </p>
    <ul>
      <li>
        Is the zero vector a member of the space? Well:
        <MathJax.Node inline formula="0 = 2 \times 0 + 3 \times 0" />, so yes,
        it is.
      </li>
      <li>
        Is it closed under addition? To work this out, we can take any two{' '}
        <MathJax.Node inline formula="v_1 \in S" /> and{' '}
        <MathJax.Node inline formula="v_2 \in S" /> and show that their sum,{' '}
        <MathJax.Node inline formula="v_1 + v_2 \in S" />:
      </li>
    </ul>
    <MathJax.Node formula="v_1 + v_2 = (x_1 + x_2, y_1 + y_2, z_1 + z_2" />
    <MathJax.Node formula="2x + 3y = z" />
    <MathJax.Node formula="2x + 3y - z = 0" />
    <MathJax.Node formula="2(x_1 + x_2) + 3(y_1 + y_2) - (z_1 + z_2) = 0" />
    <p>Or if we rearrange:</p>
    <MathJax.Node formula="2x_1 + 2x_2 + 3y_1 + 3y_2 - z_1 - z_2 = 0" />
    <MathJax.Node formula="2x_1 + 3y_1 - z_1 + 2x_2 + 3y_2 - z_2 = 0" />
    <MathJax.Node formula="2x_1 + 3y_1 - z_1 = - 2x_2 - 3y_2 + z_2" />
    <p>
      Now, if we recall that{' '}
      <MathJax.Node inline formula="2x_1 + 3y_1 - z_1 = 0" /> and{' '}
      <MathJax.Node inline formula="2x_2 + 3y_2 - z_2 = 0" /> , so what we
      really have is:
    </p>
    <MathJax.Node formula="0 = -0" />
    <p>Which is always true, so we are closed under addition</p>
    <ul>
      <li>
        Now for being closed under multiplication. Again, we need to prove this
        by analysis:
      </li>
    </ul>
    <MathJax.Node formula="\alpha v_1 = (\alpha x_2, \alpha y_1, \alpha z_2)" />
    <p>
      And if <MathJax.Node inline formula="v_1 \in S" /> then{' '}
      <MathJax.Node inline formula="2x_1 + 3y_1 = z" />. So if we multiply
      through <MathJax.Node inline formula="\alpha" />:
    </p>
    <MathJax.Node formula="2\alpha x + 3\alpha y = \alpha z" />
    <p>And this is always true, since it is just a scalar.</p>
    <p>
      Therefore, as the subset defined by
      <MathJax.Node inline formula="{(x, y, z): 2x + 3y = z}" />
      is a subspace of the volume defined by the three-dimensional real numbers.
    </p>
    <p>
      What about things that are not subspaces? For instance:{' '}
      <MathJax.Node inline formula="{(x, y, z): |x + y + z| = 1}" />
    </p>
    <p>
      Well, this is actually a non-linear function, and we can show that it is
      not a subspace pretty easily through a counterexample, by showing that the
      set is not closed under addition.
    </p>
    <MathJax.Node formula="{(1, 1, -1) \in S}, |1 + 1 - 1| = 1" />
    <MathJax.Node formula="{(-1, -1, 1) \in S}, |-1 - 1 + 1| = 1" />
    <MathJax.Node formula="{(1, 1, -1) + (-1, -1, 1) \in S}, |1 + 1 - 1 - 1 - 1 + 1| = 0" />
    <p>
      So <MathJax.Node inline formula="{(x, y, z): |x + y + z| = 1}" /> is not a
      subspace.
    </p>
  </Section>
);

export default SubspacesSection;
