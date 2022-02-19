function Star({key, value}: {key: string, value: number}): JSX.Element {
  return (
    <>
      <input className="rating__input" id={`star-${value}`} type="radio" name="rating" value={`${value}`} />
      <label className="rating__label" htmlFor={`star-${value}`}>Rating {`${value}`}</label>
    </>
  );
}

export default Star;
