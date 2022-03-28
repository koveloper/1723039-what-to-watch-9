import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HeaderType } from './header-type';
import Header from './header';

describe('Component: HeaderLayout', () => {
  it('should render correctly', () => {
    render(
      <BrowserRouter>
        <Header type={HeaderType.FilmCard}>
          <button>test-button</button>
        </Header>
      </BrowserRouter>,
    );
    //check elements on screen
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBe(screen.getByText('test-button'));
  });
});
