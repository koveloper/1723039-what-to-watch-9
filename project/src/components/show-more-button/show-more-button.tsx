type ShowMoreButtonProps = {
  onClick: () => void;
}

function ShowMoreButton(props: ShowMoreButtonProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button data-testid="show-more" onClick={() => props.onClick()} className="catalog__button" type="button">Show more</button>
    </div>
  );
}

export default ShowMoreButton;
