function Spinner(): JSX.Element {
  return (
    <div className="spinner">
      <span>Loading...</span>
      <span>Please wait...</span>
      <div className="spinner-anime">
        <div className="spinner-anime-item"></div>
        <div className="spinner-anime-item"></div>
        <div className="spinner-anime-item"></div>
        <div className="spinner-anime-item"></div>
        <div className="spinner-anime-item"></div>
      </div>
    </div>
  );
}

export default Spinner;
