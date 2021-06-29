import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import SearchBox from '.';

test('testing SearchBox value changing', () => {
  const { getByDisplayValue } = render(<SearchBox handleNameChange />);

  const input = getByDisplayValue('');

  fireEvent.change(input, { target: { value: 'yah' } });

  getByDisplayValue('yah');
});
