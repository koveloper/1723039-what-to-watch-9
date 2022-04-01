import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Detail from './detail';

describe('Component: Detail', () => {

  it('should render correctly', () => {
    const fakeTitle = 'fake-title';
    const fakeChildren = 'fake-children';
    render(
      <BrowserRouter>
        <Detail title={fakeTitle}>
          {fakeChildren}
        </Detail>
      </BrowserRouter>,
    );
    //check all genres names on screen
    expect(screen.getByText(fakeTitle)).toBeInTheDocument();
    expect(screen.getByText(fakeChildren)).toBeInTheDocument();
  });
});
