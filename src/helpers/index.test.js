import getLetterMatchCount from ".";

describe("getLetterMatchCount", () => {
  const secretWord = "party";
  test("returns correct count when there are no matching letters", () => {
    const letterMatchCount = getLetterMatchCount("bones", secretWord);
    // tồn tại 0 chữ cái giống nhâu giữa "party" và "bones"
    expect(letterMatchCount).toBe(0);
  });
  test("returns the correct count when there are three matching letters", () => {
    const letterMatchCount = getLetterMatchCount("train", secretWord);
    // tồn tại 3 chữ cái giống nhâu giữa "party" và "train"
    expect(letterMatchCount).toBe(3);
  });
  test("returns the correct count when there are duplicate letters in the guess", () => {
    const letterMatchCount = getLetterMatchCount("parka", secretWord);
    // tồn tại 3 chữ cái giống nhâu giữa "party" và "parka"
    expect(letterMatchCount).toBe(3);
  });
});
