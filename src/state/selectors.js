import { selector, useRecoilValue } from "recoil";
import quizService from "../services/quiz.service.js";
import { formAtom, scoreHistoryAtom } from "./atom.js";

export const questionsSelector = selector({
  key: "questionsSelector",
  get: async ({ get }) => {
    return await quizService.getQuestions(
      get(formAtom).theme,
      get(formAtom).difficulty
    );
  },
});

export const formSelector = selector({
  key: "formSelector",
  get: ({ get }) => get(formAtom),
});

export const scoreHistoryFilteredSelector = selector({
  key: "scoreHistoryFilteredSelector",
  get: ({ get }) => {
    const form = useRecoilValue(formSelector);
    return [...get(scoreHistoryAtom)]
      .filter(
        (obj) => obj.theme == form.theme && obj.difficulty === form.difficulty
      )
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);
  },
});
