import { Link } from 'react-router-dom';
import Footer from '../../components/footer/footer';
import { AppRoute } from '../../utils/constants';

const notFoundDivStyle:React.CSSProperties = {
  height: '100%',
  flexGrow: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const linkStyle:React.CSSProperties = {
  maxWidth: '300px',
  width: '100%',
  fontWeight: '200',
};


function Error404(): JSX.Element {
  return (
    <div className="user-page">
      <Link to={AppRoute.Root} className='logo__link logo__link--light' style={linkStyle}>Return to main page</Link>

      <div style={notFoundDivStyle}>
        <h1>Page not found</h1>
      </div>

      <Footer />
    </div>
  );
}

export default Error404;
