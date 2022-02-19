import { DefaultLayoutProps } from '../../types/common-types';

function HeaderTitleSimple(props: DefaultLayoutProps): JSX.Element {
  return (
    <h1 className="page-title user-page__title">{props.children}</h1>
  );
}

export default HeaderTitleSimple;
