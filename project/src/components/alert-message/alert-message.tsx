import { useAppError } from '../../hooks/use-app-error';

function AlertMessage(): JSX.Element | null {
  const [appError, setAppError] = useAppError();
  if(!appError) {
    return null;
  }
  return (
    <div data-testid='alert-message' className='alert-wrapper'>
      <div className="app-alert">
        <button className="app-alert-close" onClick={() => setAppError(null)}>X</button>
        <h2>Error during server data exchange!</h2>
        <p>
          {appError.message}
        </p>
      </div>
    </div>
  );
}

export default AlertMessage;
