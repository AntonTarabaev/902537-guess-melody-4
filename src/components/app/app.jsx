import WelcomeScreen from "@root/components/welcome-screen/welcome-screen";

const welcomeButtonClickHandler = () => {};

const App = (props) => {
  const {errorsCount} = props;

  return (
    <WelcomeScreen
      errorsCount={errorsCount}
      onWelcomeButtonClick={welcomeButtonClickHandler}
    />
  );
};

App.propTypes = {
  errorsCount: PropTypes.number.isRequired,
};

export default App;
