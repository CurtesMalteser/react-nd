import { render } from '@testing-library/react';
import ErrorComponent from './ErrorComponent';

describe('ErrorComponent', () => {
  it('should match the snapshot ErrorComponent', () => {
    const { asFragment } = render(<ErrorComponent />);
    expect(asFragment()).toMatchSnapshot();
  });
});