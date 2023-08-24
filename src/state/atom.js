import { DefaultValue, atom } from "recoil";

const localStorageEffect =
  (key) =>
  ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue) => {
      if (newValue instanceof DefaultValue) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

export const formAtom = atom({
  key: "formAtom",
  default: {
    name: "",
    theme: "tv_cinema",
    difficulty: "facile",
  },
  effects_UNSTABLE: [localStorageEffect("form")],
});

export const quizAtom = atom({
  key: "quizAtom",
  default: {
    currentQuestion: 1,
    totalQuestions: 2,
    score: 0,
  },
  effects_UNSTABLE: [localStorageEffect("quiz")],
});

export const timerAtom = atom({
  key: "timerAtom",
  default: { seconds: 0, minutes: 0 },
});

export const scoreHistoryAtom = atom({
  key: "scoreHistoryAtom",
  default: [],
  effects_UNSTABLE: [localStorageEffect("score_history")],
});

export const incrementQuestion = (quiz) => {
  return { ...quiz, currentQuestion: quiz.currentQuestion + 1 };
};

export const incrementScore = (quiz) => {
  return { ...quiz, score: quiz.score + 1 };
};
