import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ButtonType } from './constants';
import Svg from './svg';
import SvgButton from './svg-button';

type FilmCardButtonsProps = {
  isShowAddReviewButton: boolean;
  isShowAddToFavorsButton: boolean;
  isFavorite: boolean;
  onButtonClick: (type: ButtonType) => void;
}

function FilmCardButtons(props: FilmCardButtonsProps): JSX.Element {
  return (
    <div data-testid="film-buttons" className="film-card__buttons">
      <SvgButton onClick={() => props.onButtonClick(ButtonType.Play)} title='Play'>
        <Svg width={19} height={19} href='#play-s'></Svg>
      </SvgButton>
      {
        props.isShowAddToFavorsButton
          ? (
            <SvgButton onClick={() => props.onButtonClick(ButtonType.MyList)} title='My list'>
              {
                props.isFavorite
                  ? <Svg width={18} height={14} href='#in-list'></Svg>
                  : <Svg width={19} height={20} href='#add'></Svg>
              }
            </SvgButton>
          )
          : null
      }
      {
        props.isShowAddReviewButton
          ? <Link onClick={(evt) => {evt.preventDefault(); props.onButtonClick(ButtonType.AddReview);}} to="#" className="btn film-card__button">Add review</Link>
          : null
      }
    </div>
  );
}

export default memo(
  FilmCardButtons,
  (prevProps, nextProps) => (
    prevProps.isShowAddReviewButton === nextProps.isShowAddReviewButton
    && prevProps.isShowAddToFavorsButton === nextProps.isShowAddToFavorsButton
    && prevProps.isFavorite === nextProps.isFavorite
  ),
);
