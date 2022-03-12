function Spinner(): JSX.Element {
  const styleObject: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
    height: '100%',
    minHeight: '100vh',
    background: 'rgba(30,30,30,0.8)',
    backdropFilter: 'blur(8px)',
    color: 'white',
  };
  return (
    <div style={styleObject}>Loading...<br/>Please wait...</div>
  );
}

export default Spinner;
