import { PropsWithChildren } from 'react';

type SimpleTextProps = {
  addNewLine?: boolean;
}

function SimpleText(props: PropsWithChildren<SimpleTextProps>): JSX.Element {
  return (
    <>
      {`${props.children}${props.addNewLine ? ', ' : ''}`}{props.addNewLine ? <br/> : null}
    </>
  );
}

export default SimpleText;
