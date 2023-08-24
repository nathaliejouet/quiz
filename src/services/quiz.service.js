export default {
  async getQuestions(theme, difficulty) {
    const res = await fetch(
      `https://quizzapi.jomoreschi.fr/api/v1/quiz?limit=5&category=${theme}&difficulty=${difficulty}`
    );
    return await res.json();
  },
};
