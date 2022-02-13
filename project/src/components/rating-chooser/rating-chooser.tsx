const getStarElement = (value: number): JSX.Element => (
  <>
    <input className="rating__input" id={`star-${value}`} type="radio" name="rating" value={`${value}`} />
    <label className="rating__label" htmlFor={`star-${value}`}>Rating {`${value}`}</label>
  </>
);

function RatingChooser(): JSX.Element {
  return (
    <div className="rating">
      <div className="rating__stars">
        {getStarElement(10)}
        {getStarElement(9)}
        {getStarElement(8)}
        {getStarElement(7)}
        {getStarElement(6)}
        {getStarElement(5)}
        {getStarElement(4)}
        {getStarElement(3)}
        {getStarElement(2)}
        {getStarElement(1)}
      </div>
    </div>
  );
}

export default RatingChooser;
