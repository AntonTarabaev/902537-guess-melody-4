import Player from "@root/components/audio-player/audio-player";
import withAudio from "@root/hocs/with-audio/with-audio";

const AudioPlayer = withAudio(Player);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends React.PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayerId: 0,
      };
    }

    render() {
      const {activePlayerId} = this.state;

      return <Component
        {...this.props}
        renderPlayer={(src, id) => {
          return (
            <AudioPlayer
              isPlaying={id === activePlayerId}
              onPlayButtonClick={() => this.setState({
                activePlayerId: activePlayerId === id ? -1 : id,
              })}
              src={src}
            />
          );
        }}
      />;
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
