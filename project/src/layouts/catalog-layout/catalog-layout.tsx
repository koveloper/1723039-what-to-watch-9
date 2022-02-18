import Footer from '../../components/footer/footer';
import { PropsWithChildren } from 'react';
import { CatalogProps } from '../../components/catalog/catalog-props';
import Catalog from '../../components/catalog/catalog';

function CatalogLayout(props: PropsWithChildren<CatalogProps>): JSX.Element {
  return (
    <div className="page-content">
      <Catalog {...props}>{props.children}</Catalog>
      <Footer />
    </div>
  );
}

export default CatalogLayout;
