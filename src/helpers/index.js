// gussedWord = "bones", secretWord = "party"
export const getLetterMatchCount = (gussedWord, secretWord) => {
  // chuyển 1 chuỗi thành mảng string sử dụng split -> VD: "party" = [ 'p', 'a', 'r', 't', 'y' ]
  const secretLetters = secretWord.split("");
  console.log(secretLetters);
  // chuyển 1 chuỗi thành object nhưng là dạng giống array không phải là dạng key-value sử dụng new Set -> VD: "bones" = Set(5) { 'b', 'o', 'n', 'e', 's' }
  const guessedLetterSet = new Set(gussedWord);
  console.log(guessedLetterSet);
  // filter là tạo ra 1 mảng mới chứa các thuộc tính thoả điều kiện
  // sau đó lấy mảng mới này .length
  const result = secretLetters.filter((letter) => guessedLetterSet.has(letter));
  console.log(result);
  return result.length;
};
