import { render } from '@testing-library/react';

import AnotherComponent from './another-component';

describe('AnotherComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AnotherComponent />);
    expect(baseElement).toBeTruthy();
  });
});
