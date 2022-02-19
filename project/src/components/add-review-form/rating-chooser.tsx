import Star from './star';

function RatingChooser(): JSX.Element {
  return (
    <div className="rating">
      <div className="rating__stars">
        {new Array(10).fill(null).map((v, i) => <Star key="star" value={10 - i}/>)}
      </div>
    </div>
  );
}

export default RatingChooser;
