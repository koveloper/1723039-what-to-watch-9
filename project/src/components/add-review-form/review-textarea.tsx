type ReviewTextAreaProps = {
    review: string;
    onReivewChange: (review: string) => void;
}

export default function ReviewTextArea(props: ReviewTextAreaProps): JSX.Element {
  return (
    <div className="add-review__text">
      <textarea
        onChange={(evt) => {
          props.onReivewChange(evt.target.value);
        }}
        className="add-review__textarea"
        name="review-text"
        id="review-text"
        placeholder="Review text"
        value={props.review}
      />
      <div className="add-review__submit">
        <button className="add-review__btn" type="submit">Post</button>
      </div>
    </div>
  );
}

