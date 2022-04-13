import { render } from '@testing-library/react';

import TestComponent from './test-component';

describe('TestComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TestComponent />);
    expect(baseElement).toBeTruthy();
  });
});
