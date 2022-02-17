import { PropsWithChildren } from 'react';

type ComponentWrapperProps  = {
    wrapperClassName: string;
}

export default function ComponentWrapper(props: PropsWithChildren<ComponentWrapperProps>) {
  return <div className={props.wrapperClassName}>{props.children}</div>;
}
