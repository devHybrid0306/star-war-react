import React from 'react';
import { render } from '@testing-library/react';

import TableHeaderRow from '.';

test('TableHeader works', () => {
  const data = ['a', 'b', 'c', 'd', 'e'];
  const { getByTestId } = render(<TableHeaderRow data={data} />);
  expect(getByTestId('Table-HR-Wrapper')).toHaveStyle('background: rgb(219, 54, 21)');
});
