import Star from './star';

type RatingChooserProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
}

export default function RatingChooser(props: RatingChooserProps): JSX.Element {
  return (
    <div className="rating">
      <div className="rating__stars">
        {new Array(10).fill(null).map((v, i) => <Star checked={props.rating === (10 - i)} key={`star-${i.toString()}`} onClickCallback={props.onRatingChange} value={10 - i}/>)}
      </div>
    </div>
  );
}
