import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LogoLetter from './logo-letter';

describe('Component: LogoLetter', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <LogoLetter num={0} letter='W' />
      </BrowserRouter>,
    );

    expect(screen.getByText(/W/i)).toBeInTheDocument();
  });
});
