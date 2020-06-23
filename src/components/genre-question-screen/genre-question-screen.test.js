import GenreQuestionScreen from "@root/components/genre-question-screen/genre-question-screen";

const question = {
  type: `genre`,
  genre: `rock`,
  answers: [{
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `blues`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `jazz`,
  }, {
    src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
    genre: `rock`,
  }],
};

it(`GenreQuestionScreen is rendered correctly`, () => {
  const tree = renderer.create(
      <GenreQuestionScreen
        onAnswer={() => {}}
        question={question}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
