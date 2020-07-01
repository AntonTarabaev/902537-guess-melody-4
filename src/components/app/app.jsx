import WelcomeScreen from "@root/components/welcome-screen/welcome-screen";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ArtistQuestionScreen from "@root/components/artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "@root/components/genre-question-screen/genre-question-screen";
import {GameType} from "@root/consts";
import GameScreen from "@root/components/game-screen/game-screen";
import withAudioPlayer from "@root/hocs/with-audio-player/with-audio-player";
import {ActionCreator} from "@root/reducer";
import {connect} from "react-redux";

const GenreQuestionScreenWrapped = withAudioPlayer(GenreQuestionScreen);
const ArtistQuestionScreenWrapped = withAudioPlayer(ArtistQuestionScreen);

class App extends React.PureComponent {
  _renderGameScreen() {
    const {
      maxMistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      step,
    } = this.props;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <GameScreen
              type={question.type}
            >
              <ArtistQuestionScreenWrapped
                onAnswer={onUserAnswer}
                question={question}
              />
            </GameScreen>
          );
        case GameType.GENRE:
          return (
            <GameScreen
              type={question.type}
            >
              <GenreQuestionScreenWrapped
                onAnswer={onUserAnswer}
                question={question}
              />
            </GameScreen>
          );
      }
    }

    return null;
  }

  render() {
    const {questions} = this.props;

    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderGameScreen()}
          </Route>
          <Route exact path="/artist">
            <ArtistQuestionScreenWrapped
              onAnswer={() => {}}
              question={questions[1]}
            />
          </Route>
          <Route exact path="/genre">
            <GenreQuestionScreenWrapped
              onAnswer={() => {}}
              question={questions[0]}
            />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  maxMistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  step: state.step,
  maxMistakes: state.maxMistakes,
  questions: state.questions,
});

const mapDispatchToProps = (dispatch) => ({
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistakes(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
