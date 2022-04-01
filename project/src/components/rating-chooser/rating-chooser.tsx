import { useGenerateKeys } from '../../hooks/use-generate-keys';
import { MAX_FILM_MARK } from '../../utils/constants';
import Star from '../star/star';

type RatingChooserProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
}

function RatingChooser(props: RatingChooserProps): JSX.Element {
  const starKeys = useGenerateKeys('star', MAX_FILM_MARK);
  return (
    <div className="rating">
      <div className="rating__stars">
        {new Array(MAX_FILM_MARK).fill(null).map((v, i) => <Star checked={props.rating === (MAX_FILM_MARK - i)} key={starKeys[i]} onClickCallback={props.onRatingChange} value={MAX_FILM_MARK - i}/>)}
      </div>
    </div>
  );
}

export default RatingChooser;
