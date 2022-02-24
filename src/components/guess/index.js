const GuessComponent = (props) => {
  let contents;
  // console.log(props);
  if (props.guessedWords && props.guessedWords.length === 0) {
    contents = (
      <span data-test="guess-instructions">Try to guess the secret word!</span>
    );
  } else {
    const guessedWordsRows =
      props.guessedWords &&
      props.guessedWords.length > 0 &&
      props.guessedWords.map((word, index) => {
        return (
          <div data-test="guessed-word" key={index}>
            <div>{word?.guessedWord || ""}</div>
            <div>{word?.letterMatchCount || ""}</div>
          </div>
        );
      });
    contents = (
      <div data-test="guessed-words">
        <h3>Guessed Words</h3>
        <table>
          {/* <thread>
            <tr>
              <th>Guess</th>
              <th>Matching Letters</th>
            </tr> */}
          {/* </thread> */}
          <tbody>{guessedWordsRows}</tbody>
        </table>
      </div>
    );
  }
  return <div data-test="component-guessed-words">{contents}</div>;
};
export default GuessComponent;
