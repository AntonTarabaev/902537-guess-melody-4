import WelcomeScreen from "@root/components/welcome-screen/welcome-screen";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ArtistQuestionScreen from "@root/components/artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "@root/components/genre-question-screen/genre-question-screen";
import {GameType} from "@root/consts";
import GameScreen from "@root/components/game-screen/game-screen";
import {ActionCreator} from "@root/reducer/game/game";
import {connect} from "react-redux";
import withActivePlayer from "@root/hocs/with-active-player/with-active-player";
import withUserAnswer from "@root/hocs/with-user-answer/with-user-answer";
import GameOverScreen from "@root/components/game-over-screen/game-over-screen";
import WinScreen from "@root/components/win-screen/win-screen";
import {getAuthorizationStatus} from "@root/reducer/user/selectors";
import {getMaxMistakes, getMistakes, getStep} from "@root/reducer/game/selectors";
import {getQuestions} from "@root/reducer/data/selectors";
import {AuthorizationStatus, Operation as UserOperation} from "@root/reducer/user/user";
import AuthScreen from "@root/components/auth-screen/auth-screen";

const GenreQuestionScreenWrapped = withActivePlayer(withUserAnswer(GenreQuestionScreen));
const ArtistQuestionScreenWrapped = withActivePlayer(ArtistQuestionScreen);

class App extends React.PureComponent {
  _renderGameScreen() {
    const {
      authorizationStatus,
      login,
      maxMistakes,
      mistakes,
      questions,
      onUserAnswer,
      onWelcomeButtonClick,
      resetGame,
      step,
    } = this.props;
    const question = questions[step];

    if (step === -1) {
      return (
        <WelcomeScreen
          errorsCount={maxMistakes}
          onWelcomeButtonClick={onWelcomeButtonClick}
        />
      );
    }

    if (mistakes >= maxMistakes) {
      return (
        <GameOverScreen
          onReplayButtonClick={resetGame}
        />
      );
    }

    if (step >= questions.length) {
      if (authorizationStatus === AuthorizationStatus.NO_AUTH) {
        return (
          <AuthScreen
            onSubmit={login}
            onReplayButtonClick={resetGame}
          />
        );
      }

      return (
        <WinScreen
          questionsCount={questions.length}
          mistakesCount={mistakes}
          onReplayButtonClick={resetGame}
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
  authorizationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  maxMistakes: PropTypes.number.isRequired,
  mistakes: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
  onUserAnswer: PropTypes.func.isRequired,
  onWelcomeButtonClick: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  step: getStep(state),
  maxMistakes: getMaxMistakes(state),
  questions: getQuestions(state),
  mistakes: getMistakes(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onWelcomeButtonClick() {
    dispatch(ActionCreator.incrementStep());
  },
  onUserAnswer(question, answer) {
    dispatch(ActionCreator.incrementMistakes(question, answer));
    dispatch(ActionCreator.incrementStep());
  },
  resetGame() {
    dispatch(ActionCreator.resetGame());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
