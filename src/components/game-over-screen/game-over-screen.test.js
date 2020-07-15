import GameOverScreen from "@root/components/game-over-screen/game-over-screen";

it(`Should GameOverScreen render correctly`, () => {
  const tree = renderer
    .create(<GameOverScreen
      onReplayButtonClick={() => {}}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
