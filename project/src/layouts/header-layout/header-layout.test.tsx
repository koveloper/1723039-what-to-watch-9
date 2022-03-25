import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HeaderType } from './header-type';
import HeaderLayout from './header-layout';

describe('Component: HeaderLayout', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <HeaderLayout type={HeaderType.FilmCard}>
          <button>test-button</button>
        </HeaderLayout>
      </BrowserRouter>,
    );
    //check elements on screen
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBe(screen.getByText('test-button'));
  });
});
