// const Congats = ({ success }) => {
//   return success ? (
//     <div data-test="component-congrats">
//       <span data-test="congrats-message">
//         Congratulation! You guessed the world!
//       </span>
//     </div>
//   ) : (
//     <div data-test="component-congrats"></div>
//   );
// };
const Congats = (props) => {
  return props?.success ? (
    <div data-test="component-congrats">
      <span data-test="congrats-message">
        Congratulation! You guessed the word!
      </span>
    </div>
  ) : (
    <div>
      <div data-test="component-congrats"></div>
    </div>
  );
  // return (
  // <div>
  //   <div data-test="component-congrats">component-congrats</div>
  //   <div data-test="component-guessed-words">{contents}</div>
  // </div>
  // );
};
export default Congats;
