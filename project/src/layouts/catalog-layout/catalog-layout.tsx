import Footer from '../../components/footer/footer';
import Catalog from '../../components/catalog/catalog';
import { memo, PropsWithChildren } from 'react';
import { CatalogProps } from '../../components/catalog/catalog-props';

function CatalogLayout(props: PropsWithChildren<CatalogProps>): JSX.Element {
  return (
    <div className="page-content">
      <Catalog title={props.title} type={props.type}>{props.children}</Catalog>
      <Footer />
    </div>
  );
}

export default memo(CatalogLayout);
