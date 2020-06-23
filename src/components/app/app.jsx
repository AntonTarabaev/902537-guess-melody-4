import WelcomeScreen from "@root/components/welcome-screen/welcome-screen";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ArtistQuestionScreen from "@root/components/artist-question-screen/artist-question-screen";
import GenreQuestionScreen from "@root/components/genre-question-screen/genre-question-screen";
import {GameType} from "@root/consts";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      step: -1,
    };
  }

  _renderGameScreen() {
    const {errorsCount, questions} = this.props;
    const {step} = this.state;
    const question = questions[step];

    if (step === -1 || step >= questions.length) {
      return (
        <WelcomeScreen
          errorsCount={errorsCount}
          onWelcomeButtonClick={() => {
            this.setState({
              step: 0,
            });
          }}
        />
      );
    }

    if (question) {
      switch (question.type) {
        case GameType.ARTIST:
          return (
            <ArtistQuestionScreen
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1,
                }));
              }}
              question={question}
            />
          );
        case GameType.GENRE:
          return (
            <GenreQuestionScreen
              onAnswer={() => {
                this.setState((prevState) => ({
                  step: prevState.step + 1,
                }));
              }}
              question={question}
            />
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
            <ArtistQuestionScreen
              onAnswer={() => {}}
              question={questions[1]}
            />
          </Route>
          <Route exact path="/genre">
            <GenreQuestionScreen
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
  errorsCount: PropTypes.number.isRequired,
  questions: PropTypes.array.isRequired,
};

export default App;
