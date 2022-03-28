import { Alert } from 'react-bootstrap';
import { useAppError } from '../../hooks/use-app-error';

export default function AlertMessage(): JSX.Element | null {
  const [appError, setAppError] = useAppError();
  if(appError === null) {
    return null;
  }
  return (
    <div className='alert-wrapper'>
      <Alert variant="danger" onClose={() => setAppError(null)} dismissible transition>
        <Alert.Heading>Error during server data exchange!</Alert.Heading>
        <p>
          {appError.message}
        </p>
      </Alert>
    </div>
  );
}
