import {render, screen} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Catalog from './catalog';

describe('Component: FilmCardDetails', () => {

  it('should render correctly', () => {
    const fakeTitle = 'fake-title';
    const fakeChildren = 'fake-children';
    render(
      <BrowserRouter>
        <Catalog title={fakeTitle} type='full'>
          {fakeChildren}
        </Catalog>
      </BrowserRouter>,
    );
    //check all text values on screen
    expect(screen.getByText(fakeTitle)).toBeInTheDocument();
    expect(screen.getByText(fakeChildren)).toBeInTheDocument();
  });
});
