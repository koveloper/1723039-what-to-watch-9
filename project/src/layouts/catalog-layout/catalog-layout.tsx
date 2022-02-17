import { useLocation } from 'react-router-dom';
import { AppRoute } from '../../utils/constants';
import { DefaultLayoutProps } from '../../types/common-types';
import Footer from '../../components/footer/footer';

function CatalogLayout(props: DefaultLayoutProps): JSX.Element {
  const url = useLocation();
  const classes = url.pathname === AppRoute.Root
    ? 'catalog'
    : 'catalog catalog--like-this';
  const header = url.pathname === AppRoute.Root
    ? <h2 className="catalog__title visually-hidden">Catalog</h2>
    : <h2 className="catalog__title">More like this</h2>;
  const showMoreButton = url.pathname === AppRoute.Root
    ? (
      <div className="catalog__more">
        <button className="catalog__button" type="button">Show more</button>
      </div>
    )
    : null;
  return (
    <div className="page-content">
      <section className={classes}>
        {header}
        {props.children}
        {showMoreButton}
      </section>
      <Footer />
    </div>
  );
}

export default CatalogLayout;
