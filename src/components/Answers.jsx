import { RadioGroup, Radio, FormLabel, FormControlLabel } from "@mui/material";
import { shuffleArray } from "../utils/arrays";
import { useMemo } from "react";

function Answers({ badAnswers, solution, handleResponse }) {
  const answers = useMemo(
    () => shuffleArray([...badAnswers, solution]),
    [...badAnswers, solution]
  );

  return (
    <>
      <FormLabel>Réponses</FormLabel>
      <RadioGroup name="answers-group">
        {answers.map((answer, index) => {
          return (
            <FormControlLabel
              key={index}
              value={answer}
              control={<Radio />}
              label={answer}
              onChange={(e) => handleResponse(e.target.value)}
            />
          );
        })}
      </RadioGroup>
    </>
  );
}

export default Answers;
