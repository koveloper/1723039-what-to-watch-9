import { DefaultLayoutProps } from '../../types/common-types';

export default function HeaderTitleSimple(props: DefaultLayoutProps): JSX.Element {
  return (
    <h1 className="page-title user-page__title">{props.children}</h1>
  );
}
