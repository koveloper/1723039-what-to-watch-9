function SimpleText({content, withNewLine}: {
  content: string;
    withNewLine: boolean;
}): JSX.Element {
  return (
    <>
      {`${content}${withNewLine ? ', ' : ''}`}{withNewLine ? <br/> : null}
    </>
  );
}

export default SimpleText;
