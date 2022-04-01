import userEvent from '@testing-library/user-event';
import {render, screen} from '@testing-library/react';
import PlayButton from './play-button';

describe('Component: PlayButton', () => {
  it('should render correctly', () => {
    render(
      <PlayButton playing onClick={() => void 0}/>,
    );
    //check button to be on screen
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should fire onClick event', () => {
    render(
      <>
        <div id="context-snapshot">---</div>
        <PlayButton playing onClick={() => {
          const snapshot = screen.getByText('---');
          if(snapshot) {
            snapshot.textContent = 'play button click test';
          }
        }}
        />
      </>,
    );
    //test for redirect to fake page on click
    expect(screen.getByText(/---/i)).toBeInTheDocument();
    //fire click event and check result markup
    userEvent.click(screen.getByRole('button'));
    //check screen results
    expect(screen.queryByText(/---/i)).not.toBeInTheDocument();
    expect(screen.getByText('play button click test')).toBeInTheDocument();
  });
});
