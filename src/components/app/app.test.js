import App from "@root/components/app/app";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      errorsCount={3}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
