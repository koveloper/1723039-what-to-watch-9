import { FilmDataProps } from '../../types/film-data-type';
import { getBlankLink } from '../../utils/logic-utils';
import FilmCardBackground from '../film-card-background/film-card-background';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import RatingChooser from '../rating-chooser/rating-chooser';

function AddReviewPage(props: FilmDataProps): JSX.Element {
  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <FilmCardBackground
          title={props.title}
          imageUrl={props.backgroundImageUrl}
        />

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo isLight={false}/>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <a href="film-page.html" className="breadcrumbs__link">{props.title}</a>
              </li>
              <li className="breadcrumbs__item">
                <a href={getBlankLink()} className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>
          <UserBlock/>
        </header>
        <FilmCardPoster
          title={props.title}
          posterUrl={props.posterImageUrl}
          size='small'
        />
      </div>

      <div className="add-review">
        <form action="#" className="add-review__form">
          <RatingChooser />

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit">Post</button>
            </div>

          </div>
        </form>
      </div>

    </section>
  );
}

export default AddReviewPage;
