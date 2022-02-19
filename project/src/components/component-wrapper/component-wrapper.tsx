import { PropsWithChildren } from 'react';

type ComponentWrapperProps  = {
    wrapperClassName?: string | null;
}

export default function ComponentWrapper(props: PropsWithChildren<ComponentWrapperProps>) {
  return (props.wrapperClassName
    ? <div className={props.wrapperClassName}>{props.children}</div>
    : <>{props.children}{null}</>
  );
}
