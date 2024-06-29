import { render } from '@testing-library/react';
import NoQuestionFound404 from './NoQuestionFound404'; // Adjust the import path as necessary

describe('NoQuestionFound404', () => {
  it('should match the snapshot', () => {
    const { asFragment } = render(<NoQuestionFound404 />);
    expect(asFragment()).toMatchSnapshot();
  });
});