const getStarElement = (value: number): JSX.Element => (
  <>
    <input className="rating__input" id={`star-${value}`} type="radio" name="rating" value={`${value}`} />
    <label className="rating__label" htmlFor={`star-${value}`}>Rating {`${value}`}</label>
  </>
);

function AddReviewForm(): JSX.Element {
  const ratingChooser = (
    <div className="rating">
      <div className="rating__stars">
        {new Array(10).fill(null).map((v, i) => getStarElement(10 - i))}
      </div>
    </div>
  );
  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        {ratingChooser}
        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
