function Spinner(): JSX.Element {
  return (
    <div className="spinner">
      {/* <h2 className="wait-for-connect-title">${this._sign}</h2> */}
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
    // <div className="spinner">
    //   <span>Loading...</span>
    //   <span>Please wait...</span>
    // </div>
  );
}

export default Spinner;
