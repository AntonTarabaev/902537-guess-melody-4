import GenreQuestionItem from "@root/components/genre-question-item/genre-question-item";

const answer = {
  src: `https://upload.wikimedia.org/wikipedia/commons/4/4e/BWV_543-fugue.ogg`,
  genre: `rock`,
};

it(`GenreQuestionItem is rendered correctly`, () => {
  const tree = renderer.create(
      <GenreQuestionItem
        answer={answer}
        id={0}
        onChange={() => {}}
        renderPlayer={() => {}}
        userAnswer={false}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
