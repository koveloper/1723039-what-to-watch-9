import {render, screen} from '@testing-library/react';
import Spinner from './spinner';

describe('Component: ShowMoreButton', () => {
  it('should render correctly', () => {
    render(
      <Spinner />,
    );
    //check that links count is equal to genres count
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });
});
