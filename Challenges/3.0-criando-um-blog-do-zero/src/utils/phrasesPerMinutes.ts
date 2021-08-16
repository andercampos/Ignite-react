const WORDS_PER_MINUTE = 200;

export const phrasesPerMinutes = (bodys: string[]): number => {
  const noOfWords = bodys.reduce((acc, body) => {
    return acc + body.split(/\s/g).length;
  }, 0);

  const minutes = noOfWords / WORDS_PER_MINUTE;

  return Math.ceil(minutes);
};
