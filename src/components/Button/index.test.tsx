import React from 'react';
import { render, screen } from '@testing-library/react';
import 'jest-styled-components';

import Button from '.';

test('testing Button', () => {
  const { container } = render(<Button text="button" />);

  const button = screen.getByText('button');
  expect(button).toBeInTheDocument();

  expect(container).toMatchSnapshot();
});
