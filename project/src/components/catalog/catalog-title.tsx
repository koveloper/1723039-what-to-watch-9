import { PropsWithChildren } from 'react';

type CatalogTitleProps = {
    isHidden?: boolean;
}

function CatalogTitle(props: PropsWithChildren<CatalogTitleProps>): JSX.Element {
  return (
    <h2 className={props.isHidden ? 'catalog__title visually-hidden' : 'catalog__title'}>{props.children}</h2>
  );
}

export default CatalogTitle;
