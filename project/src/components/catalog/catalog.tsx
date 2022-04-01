import { PropsWithChildren } from 'react';

type CatalogProps = {
  type: 'full' | 'filtered';
  title: string;
  titleHidden?: boolean;
};

function Catalog(props: PropsWithChildren<CatalogProps>): JSX.Element {
  return (
    <section data-testid="catalog" className={props.type === 'full' ? 'catalog' : 'catalog catalog--like-this'}>
      <h2 className={props.titleHidden ? 'catalog__title visually-hidden' : 'catalog__title'}>{props.title}</h2>
      {props.children}
    </section>
  );
}

export default Catalog;
