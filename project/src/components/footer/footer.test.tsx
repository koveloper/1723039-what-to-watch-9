import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './footer';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText('© 2019 What to watch Ltd.')).toBeInTheDocument();
  });
});
