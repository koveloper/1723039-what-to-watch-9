import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignInForm from './sign-in-form';
import { LoginData } from '../../types/login-data';

describe('Component: SignInForm', () => {

  it('should render correctly', () => {
    render(
      <SignInForm onSubmit={() => void 0}/>,
    );
    //check that email field on screen
    const email = screen.getByRole('textbox') as HTMLInputElement;
    expect(email).not.toBe(null);
    expect(email.placeholder).toBe('Email address');
    //check password on screen
    const pwd = screen.getByPlaceholderText('Password') as HTMLInputElement;
    expect(pwd).not.toBe(null);
    expect(pwd.placeholder).toBe('Password');
    //check for submit button on screen
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should invoke onSubmit with user enetered data', () => {
    const fakeUserName = 'fake-user-name';
    const fakePassword = 'pwqeiudy12398ry21o3dh12ohd';
    render(
      <>
        <div id="test-login-content">---</div>
        <div id="test-password-content">---</div>
        <SignInForm onSubmit={(data: LoginData) => {
          const snapshots = screen.getAllByText('---');
          if(snapshots && snapshots.length === 2) {
            snapshots[0].textContent = data.login;
            snapshots[1].textContent = data.password;
          }
        }}
        />
      </>,
    );
    expect(screen.getAllByText('---').length).toBe(2);
    //get input fields
    const email = screen.getByRole('textbox') as HTMLInputElement;
    const pwd = screen.getByPlaceholderText('Password') as HTMLInputElement;
    //simulate input events
    userEvent.type(email, fakeUserName);
    userEvent.type(pwd, fakePassword);
    //simulate submit button click
    userEvent.click(screen.getByRole('button'));
    //check screen data
    expect(screen.getByText(fakeUserName)).toBeInTheDocument();
    expect(screen.getByText(fakePassword)).toBeInTheDocument();
  });
});
