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
      Given some subset of numbers in an n-dimensional space, one of the questions
      you might get asked is whether or not those numbers make up a subspace.
    </p>
    <p>
      To answer that question, it is worth defining what a subspace is in terms
      of its formal properties, then what it is in laymans terms, then the visual
      definition, showing why it is that those properties need to be satisfied.
    </p>
    <p>
      For those unfamiliar, we will be using a little bit of set notation
      here - <MathJax.Node inline>\in</MathJax.Node> stands for <Strong>is
      a member of</Strong>. When we use <MathJax.Node inline>(x, y, z): z = C(x, y)</MathJax.Node>{' '}
      we are describing a set containing all three dimensional vectors that satisfy
      the condition that <MathJax.Node inline>z</MathJax.Node> equals some
      function <MathJax.Node inline>C(x, y)</MathJax.Node>. We also often use
      letters from the greek alphabet to describe arbitrary constants, for instance
      alpha <MathJax.Node inline>\alpha</MathJax.Node> and beta{' '}
      <MathJax.Node inline>\beta</MathJax.Node>.
    </p>
    <p>
      The formal definition of a subspace is as follows:
    </p>
    <ul>
      <li>It must contain the zero-vector.</li>
      <li>
        It must be <Strong>closed under addition</Strong>:
        if <MathJax.Node inline>v_1 \in S</MathJax.Node> and{' '}
        <MathJax.Node inline>v_2 \in S</MathJax.Node> for any{' '}
        <MathJax.Node inline>v_1, v_2</MathJax.Node>, then it must
        be true that <MathJax.Node inline>(v_1 + v_2) \in S</MathJax.Node> or
        else <MathJax.Node inline>S</MathJax.Node> is not a subspace.
      </li>
      <li>
        It must be <Strong>closed under scalar multiplication</Strong>:
        if <MathJax.Node inline>v \in S</MathJax.Node> then{' '}
        <MathJax.Node inline>\alpha v \in S</MathJax.Node>, else{' '}
        <MathJax.Node inline>S</MathJax.Node> is not a subspace.
      </li>
    </ul>
    <p>
      All of that was just a fancy way of saying that a subspace just needs
      to define some equal or lesser-dimensional space that ranges from positive infinity
      to negative infinity and passes through the origin.
    </p>
    <p>
      So for instance, valid subspace for a three dimensional space
      might be <MathJax.Node inline>z = 2x + 3y</MathJax.Node>, which is a plane:
    </p>
    <AxisVisualization3D
      render={() => (
        <group>
          <Plane a={2} b={3} c={-1} d={0} transparent opacity={0.5} extents={[-1, 1]} color={0x0099bb} />
        </group>
      )}
    />
    <p>
      And does <MathJax.Node inline>{'{(x, y, z): z = 2x + 3y}'}</MathJax.Node> satisfy
      our three propositions? Well, we can prove this with a bit of analysis:
    </p>
    <ul>
      <li>
        Is the zero vector a member of the space? Well:
        <MathJax.Node inline>0 = 2 \times 0 + 3 \times 0</MathJax.Node>, so yes, it is.
      </li>
      <li>
        Is it closed under addition? To work this out, we can take any
        two <MathJax.Node inline>v_1 \in S</MathJax.Node> and{' '}
        <MathJax.Node inline>v_2 \in S</MathJax.Node> and show that
        their sum, <MathJax.Node inline>v_1 + v_2 \in S</MathJax.Node>:
      </li>
    </ul>
    <MathJax.Node>
      v_1 + v_2 = (x_1 + x_2, y_1 + y_2, z_1 + z_2)
    </MathJax.Node>
    <MathJax.Node>
      2x + 3y = z
    </MathJax.Node>
    <MathJax.Node>
      2x + 3y - z = 0
    </MathJax.Node>
    <MathJax.Node>
      2(x_1 + x_2) + 3(y_1 + y_2) - (z_1 + z_2) = 0
    </MathJax.Node>
    <p>
      Or if we rearrange:
    </p>
    <MathJax.Node>
      2x_1 + 2x_2 + 3y_1 + 3y_2 - z_1 - z_2 = 0
    </MathJax.Node>
    <MathJax.Node>
      2x_1 + 3y_1 - z_1 + 2x_2 + 3y_2 - z_2 = 0
    </MathJax.Node>
    <MathJax.Node>
      2x_1 + 3y_1 - z_1 = - 2x_2 - 3y_2 + z_2
    </MathJax.Node>
    <p>
      Now, if we recall that <MathJax.Node inline>2x_1 + 3y_1 - z_1 = 0</MathJax.Node>{' '}
      and <MathJax.Node inline>2x_2 + 3y_2 - z_2 = 0</MathJax.Node>{' '}, so what we really
      have is:
    </p>
    <MathJax.Node>
      0 = -0
    </MathJax.Node>
    <p>Which is always true, so we are closed under addition</p>
    <ul>
      <li>
        Now for being closed under multiplication. Again, we need to prove
        this by analysis:
      </li>
    </ul>
    <MathJax.Node>
      \alpha v_1 = (\alpha x_2, \alpha y_1, \alpha z_2)
    </MathJax.Node>
    <p>
      And if <MathJax.Node inline>v_1 \in S</MathJax.Node> then{' '}
      <MathJax.Node inline>2x_1 + 3y_1 = z</MathJax.Node>. So if we multiply
      through <MathJax.Node inline>\alpha</MathJax.Node>:
    </p>
    <MathJax.Node>
      2\alpha x + 3\alpha y = \alpha z
    </MathJax.Node>
    <p>
      And this is always true, since it is just a scalar.
    </p>
    <p>
      Therefore, as the subset defined by
      <MathJax.Node inline>{'{(x, y, z): 2x + 3y = z}'}</MathJax.Node>
      is a subspace of the volume defined by the three-dimensional real numbers.
    </p>
    <p>
      What about things that are not subspaces? For instance:{' '}
      <MathJax.Node inline>{'{(x, y, z): |x + y + z| = 1}'}</MathJax.Node>
    </p>
    <p>
      Well, this is actually a non-linear function, and we can show that it is
      not a subspace pretty easily through a counterexample, by showing that
      the set is not closed under addition.
    </p>
    <MathJax.Node>
      {'{(1, 1, -1) \\in S}, |1 + 1 - 1| = 1'}
    </MathJax.Node>
    <MathJax.Node>
      {'{(-1, -1, 1) \\in S}, |-1 - 1 + 1| = 1'}
    </MathJax.Node>
    <MathJax.Node>
      {'{(1, 1, -1) + (-1, -1, 1) \\in S}, |1 + 1 - 1 - 1 - 1 + 1| = 0'}
    </MathJax.Node>
    <p>
      So <MathJax.Node inline>{'{(x, y, z): |x + y + z| = 1}'}</MathJax.Node> is
      not a subspace.
    </p>
  </Section>
);

export default SubspacesSection;
