import { Box, Typography } from "@mui/material";
import { quizAtom } from "../state/atom";
import { useRecoilState } from "recoil";

function Question({ question }) {
  const [quiz] = useRecoilState(quizAtom);

  return (
    <Box>
      <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
        Question {quiz.currentQuestion} / {quiz.totalQuestions}
      </Typography>
      <Typography component="h2" variant="h8" sx={{ mb: 3 }}>
        {question}
      </Typography>
    </Box>
  );
}

export default Question;
