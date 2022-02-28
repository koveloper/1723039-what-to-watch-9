type VideoComponentProps = {
    videoLink: string;
}

function VideoComponent(props: VideoComponentProps): JSX.Element {
  return (
    <video className="player__video" poster="img/player-poster.jpg">
      <source src={props.videoLink}/>
    </video>
  );
}

export default VideoComponent;
