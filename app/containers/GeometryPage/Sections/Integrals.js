/*
 * Integrals
 *
 * A section describing integrals, their formulation and what they actually
 * mean.
 */

import React from 'react';

import MathJax from 'react-mathjax';

import DoubleIntegralVisualization from 'components/DoubleIntegralVisualization';
import Section from 'components/Section';
import {
  RollingSingleIntegralVisualization,
  SpreadingSingleIntegralVisualization,
} from 'components/SingleIntegralVisualization';
import Strong from 'components/Strong';

const IntegralsSection = () => (
  <Section title="Integrals" anchor="integrals">
    <p>
      One of the most important things when describing geometry is having
      a consistent mechanism to define properties that do not appear to
      have an easily calculable value, such as the area of a curved surface
      or under a curved line, the surface area of an smooth but arbitrary
      surface or even the volume between two enclosed parabolas.
    </p>
    <p>
      It turns out that calculus provides us with a tool called the{' '}
      <Strong>Integral</Strong> you can calculate all these properties in
      a fairly consistent way.
    </p>
    <p>
      Unfortunately, the way that the integral is typically taught to students
      does not do very much to explain why it is useful to find these properties
      and also does not inspire students to think about what else it could be
      used for other than finding the area underneath curves. Part of the reason
      why this is the case is that the integral is taught in the context of
      calculus, where it is typically referred to as the {'"antiderivative"'}.
    </p>
    <p>
      While the fundamental theorem of calculus shows that this is technically
      true, it still does not give us a good intuition as to what integration
      actualy is and instead implants this abstract idea that is only good for
      to reverse differentiation as long as you throw an arbitrary constant,{' '}
      <MathJax.Node inline>C</MathJax.Node> on the end.
    </p>
    <p>
      Your math teachers did not get it all wrong, however. Usually in learning
      the integral you would have gotten some sort of hand-wavey explanation
      about how if you imagined drawing little rectangles underneath a function
      and adding them all up, then you could approximate the area under that
      function by making the rectangles thinner and thinnner.
    </p>
    <SpreadingSingleIntegralVisualization
      startSegments={20}
      endSegments={100}
      xMin={-4}
      xMax={4}
      yMin={0}
      yMax={3.5}
      func={(x) => (-(1 / 2) * (x ** 2)) + 3}
    />
    <p>
      Then you would have moved directly on to the notation and various
      antidifferentiation rules:
    </p>
    <MathJax.Node>{'\\int 3x \\, dx = \\frac{3}{2}x^2 + C'}</MathJax.Node>
    <p>
      What is worth paying attention to now is the{' '}
      <MathJax.Node inline>dx</MathJax.Node> sitting at the end of the integral
      expression. What that actually translates to is, for every point{' '}
      <MathJax.Node inline>x</MathJax.Node>, spaced evenly by <MathJax.Node inline>dx</MathJax.Node>{' '}
      evaluate the function at <MathJax.Node inline>x</MathJax.Node> to
      get <MathJax.Node inline>y</MathJax.Node>{' '}, then multiply by{' '}
      <MathJax.Node inline>dx</MathJax.Node>. Then, add up every result.
    </p>
    <RollingSingleIntegralVisualization
      xMin={-4}
      xMax={4}
      yMin={0}
      yMax={3.5}
      func={(x) => (-(1 / 2) * (x ** 2)) + 3}
      segments={20}
    />
    <p>
      So it stands to reason that we can actually re-express any integral
      as the sum of the function evaluated at points{' '}
      <MathJax.Node inline>{'x_{min}'}</MathJax.Node> to{' '}
      <MathJax.Node inline>{'x_{max}'}</MathJax.Node> each separated
      by <MathJax.Node inline>dx</MathJax.Node>,{' '}
      times <MathJax.Node inline>dx</MathJax.Node> itself.
    </p>
    <MathJax.Node>
      {'\\int_0^4 - \\frac{1}{2}x^2 + 3 \\, dx = \\sum_0^{4 / dx} -\\frac{1}{2}x^2 + 3 \\, dx'}
    </MathJax.Node>
    <p>
      This notation is called a <Strong>Riemann Sum</Strong>.
    </p>
    <p>
      So going back to the example of <Strong>why</Strong> the integral represents
      the area under a function, consider what happens when we apply the
      Riemann sum formula to it.
    </p>
    <p>
      Take a very simple function like <MathJax.Node inline>y = x</MathJax.Node>. If we
      were to integrate by drawing lots of rectangles from the{' '}
      <MathJax.Node inline>x</MathJax.Node> axis to the line defined by the function,
      we would essentially end up with a right angled triangle.
    </p>
    <SpreadingSingleIntegralVisualization
      startSegments={20}
      endSegments={100}
      xMin={0}
      xMax={3}
      yMin={0}
      yMax={3}
      func={(x) => x}
    />
    <p>
      Now consider what happens when we take the Riemann sum from 0 to 3.
    </p>
    <MathJax.Node>
      {'\\sum_0^{3 / dx} x \\, dx'}
    </MathJax.Node>
    <p>
      Lets say that for arguments sake, <MathJax.Node inline>dx</MathJax.Node> is
      0.5. So we evaluate the function at 0, 0.5, 1.0, 1.5, multiply by{' '}
      <MathJax.Node inline>dx</MathJax.Node> and take the sum of
      all those evaluations.
    </p>
    <MathJax.Node>{'x = 0, x \\times dx = 0'}</MathJax.Node>
    <MathJax.Node>{'x = 0.5, x \\times dx = 0.25'}</MathJax.Node>
    <MathJax.Node>{'x = 1.0, x \\times dx = 0.5'}</MathJax.Node>
    <MathJax.Node>{'x = 1.5, x \\times dx = 0.75'}</MathJax.Node>
    <MathJax.Node>{'x = 2.0, x \\times dx = 1.0'}</MathJax.Node>
    <MathJax.Node>{'x = 2.5, x \\times dx = 1.25'}</MathJax.Node>
    <MathJax.Node>{'x = 3.0, x \\times dx = 1.5'}</MathJax.Node>
    <p>
      Now, adding up all those results, we get 5.25.
    </p>
    <p>
      If we were to use the classic fomula,{' '}
      <MathJax.Node inline>{'a = \\frac{1}{2}b \\times h'}</MathJax.Node>we
      would get<MathJax.Node inline>{'\\frac{1}{2} 3 \\times 3 = 4.5'}</MathJax.Node>. So
      we came pretty close! Its important to recognise that a Riemann sum is
      an approximation that gets better as <MathJax.Node inline>dx</MathJax.Node> gets
      smaller, so by using more iterations we could get a more accurate result.
    </p>
    <p>
      The nice thing about the Riemann sum is that it can easily be extended
      to additional dimensions. You just do a Riemann sum of Riemann sums! Say
      for instance we wanted to find the volume over a triangular prisim with
      base 3, height 3 and depth 1. You can do this by dividing it into two
      integrals. First, integrate over the the right-triangle as before.
    </p>
    <SpreadingSingleIntegralVisualization
      startSegments={20}
      endSegments={100}
      xMin={0}
      xMax={3}
      yMin={0}
      yMax={3}
      func={(x) => x}
    />
    <p>
      Then, consider the <MathJax.Node inline>xz</MathJax.Node> dimension. Our
      function there is always <MathJax.Node inline>z = 1</MathJax.Node>. So
      we can just integrate over that.
    </p>
    <SpreadingSingleIntegralVisualization
      startSegments={1}
      endSegments={1}
      xMin={0}
      xMax={3}
      yMin={0}
      yMax={1}
      func={() => 1}
    />
    <p>
      Putting the two together, we get a 3D shape like a triangular prism
      that we integrate both ways by using some pillars.
    </p>
    <DoubleIntegralVisualization
      xMin={0}
      xMax={3}
      yMin={0}
      yMax={1}
      zMin={0}
      zMax={3}
      func={(x) => x}
      segments={10}
    />
    <p>
      Notationally, this is quite familiar. Remember? Its just a sum of sums.
    </p>
    <MathJax.Node>
      {'\\sum_0^{1 / dy} \\sum_0^{3 / dx} x \\, dx \\, dy'}
    </MathJax.Node>
    <p>
      If we wanted to express this as an integral, you can use a double-integral
      which is exactly what you would expect.
    </p>
    <MathJax.Node>
      {'\\int_0^1 \\int_0^3 x \\, dx \\, dy'}
    </MathJax.Node>
    <p>
      Double integrals are evaluated by by integrating the first variable,
      <MathJax.Node inline>x</MathJax.Node> on the left hand side, then
      integrating the second variable <MathJax.Node inline>y</MathJax.Node>, treating
      all each other variable like a constant.
    </p>
    <p>
      So integrating <MathJax.Node inline>x</MathJax.Node> first, we have:
    </p>
    <MathJax.Node>
      {'\\int_0^1 \\frac{1}{2} 3^2 \\, dy'}
    </MathJax.Node>
    <p>
      Then, we integrate with respect to <MathJax.Node inline>y</MathJax.Node>, which
      is just:
    </p>
    <MathJax.Node>
      {'\\frac{1}{2} 3^2 \\times 1'}
    </MathJax.Node>
    <p>
      Now consider an even more complex function, a paraboloid in two
      dimensions.
    </p>
    <MathJax.Node>
      {'z = -x^2 - y^2 + 2'}
    </MathJax.Node>
    <p>
      Describing the area of this shape in terms of a simple formula would
      be very difficult. But using the technique of integration we learned here,
      we can always find a solution that converges on the area.
    </p>
    <DoubleIntegralVisualization
      xMin={-2}
      xMax={2}
      yMin={-2}
      yMax={2}
      zMin={0}
      zMax={2}
      func={(x, y) => (-(x ** 2) - (y ** 2)) + 2}
      segments={15}
      wireframe={false}
    />
    <MathJax.Node>
      {'\\int_{-2}^2 \\int_{-2}^{2} -x^2 - y^2 + 2 \\, dx \\, dy'}
    </MathJax.Node>
    <p>
      Working through that integral we have:
    </p>
    <MathJax.Node>
      {'\\int_{-2}^2 \\biggl[\\frac{-x^3}{2} - y^2x + 2x\\biggr]_{-2}^{2} \\, dy'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\int_{-2}^2 \\biggl(\\biggl[\\frac{-2^3}{3} - y^2(2) + 2(2)\\biggr] - \\biggl[\\frac{-(-2)^3}{3} - y^2(-2) + 2(-2)\\biggr]\\biggr) \\, dy'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\int_{-2}^2 \\biggl(\\biggl[\\frac{-8}{3} - 2y^2 + 4\\biggr] - \\biggl[\\frac{8}{3} + 2y^2 - 4\\biggr]\\biggr) \\, dy'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\int_{-2}^2 \\frac{-16}{3} - 4y^2 + 8 \\, dy'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\biggl[\\frac{-16y}{3} - \\frac{4y^3}{3} + 8y\\biggl]_{-2}^{2}'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\biggl[\\frac{-16(2)}{3} - \\frac{4(2)^3}{3} + 8(2)\\biggl] - \\biggl[\\frac{-16(-2)}{3} - \\frac{4(-2)^3}{3} + 8(-2)\\biggl]'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\biggl[\\frac{-32}{3} - \\frac{32}{3} + 16\\biggl] - \\biggl[\\frac{32}{3} - \\frac{-32}{3} - 16\\biggl]'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\biggl[\\frac{-64}{3} + \\frac{48}{3}\\biggl] - \\biggl[\\frac{64}{3} - \\frac{48}{3}\\biggl]'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\biggl[\\frac{-16}{3}\\biggl] - \\biggl[\\frac{16}{3}\\biggl]'}
    </MathJax.Node>
    <MathJax.Node>
      {'\\frac{-32}{3}'}
    </MathJax.Node>
    <p>
      Looking at the graph, the volume exists in the negative{' '}
      <MathJax.Node inline>z</MathJax.Node> direction, hence, our final answer
      is negative.
    </p>
  </Section>
);

export default IntegralsSection;
