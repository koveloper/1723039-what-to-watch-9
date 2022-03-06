import CatalogTitle from './catalog-title';
import { PropsWithChildren } from 'react';
import { CatalogProps } from './catalog-props';

function Catalog(props: PropsWithChildren<CatalogProps>): JSX.Element {
  return (
    <section className={props.type === 'full' ? 'catalog' : 'catalog catalog--like-this'}>
      <CatalogTitle isHidden={props.titleHidden}>{props.title}</CatalogTitle>
      {props.children}
    </section>
  );
}

export default Catalog;
