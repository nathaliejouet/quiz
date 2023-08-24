import Question from "./Question";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Answers from "./Answers";
import {
  formAtom,
  incrementQuestion,
  incrementScore,
  quizAtom,
  scoreHistoryAtom,
  timerAtom,
} from "../state/atom";
import { useRecoilState } from "recoil";
import { useTimer } from "../hooks/useTimer";
import { minutesAndHoursFormat } from "../utils/text";
import { useEffect, useState } from "react";
import { formatDatewithTime24hourFormat } from "../utils/date";
import { useNavigate } from "react-router-dom";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import Error from "./Error";
import { useTranslation } from "react-i18next";
import { questionsSelector } from "../state/selectors";

function QuizForm() {
  const [form] = useRecoilState(formAtom);
  const [quiz, setQuiz] = useRecoilState(quizAtom);
  const [timer, setTimer] = useRecoilState(timerAtom);
  const [scoreHistory, setScoreHistory] = useRecoilState(scoreHistoryAtom);
  const [datas] = useRecoilState(questionsSelector);
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [resp, setResp] = useState("");

  const navigate = useNavigate();
  const { t } = useTranslation();

  const { seconds, minutes, start, stop } = useTimer();

  const currentQuestion = datas.quizzes[quiz.currentQuestion - 1];

  useEffect(() => {
    setQuiz({ ...quiz, totalQuestions: datas.count });
    start();
    return () => {
      stop();
    };
  }, []);

  useEffect(() => {
    return () => {
      setTimer({ seconds, minutes });
    };
  }, [seconds]);

  const handleResponse = (e) => {
    setResp(e);
  };

  const resetErrors = () => {
    setError(false);
    setHelperText("");
    setResp("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!resp) {
      setError(true);
      setHelperText(t("error.requiredResponse"));
    } else {
      resetErrors();

      if (quiz.currentQuestion < quiz.totalQuestions) {
        setQuiz(incrementQuestion);
      }
      if (e.target.value == currentQuestion.anwer) {
        setQuiz(incrementScore);
      }

      if (quiz.currentQuestion === quiz.totalQuestions) {
        setScoreHistory([
          ...scoreHistory,
          {
            name: form.name,
            date: formatDatewithTime24hourFormat(new Date()),
            theme: form.theme,
            difficulty: form.difficulty,
            score: quiz.score,
            time: { minutes: timer.minutes, seconds: timer.seconds },
          },
        ]);

        navigate("/score");
      }
    }
  };

  if (datas.quizzes.length === 0) {
    return <Error />;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" alignItems="center" justify="center">
        <Paper
          elevation={3}
          sx={{
            backgroundColor: "#fafafa",
            width: 700,
            mt: 8,
            p: 5,
          }}
        >
          <FormControl fullWidth error={error} variant="standard">
            <Grid container direction="row">
              <Grid item xs={9}>
                <Typography component="h2" variant="h4" sx={{ mb: 3 }}>
                  Hello {form.name}
                </Typography>
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  mb: 3,
                  mt: 1,
                  textAlign: "end",
                }}
              >
                <HourglassTopIcon
                  sx={{
                    transform: "rotate(30deg)",
                    animation: "spin 2s  infinite",
                    "@keyframes spin": {
                      "0%": {
                        transform: "rotate(0)",
                      },
                      "100%": {
                        transform: "rotate(180deg)",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h4" sx={{ mb: 3, textAlign: "end" }}>
                  {minutesAndHoursFormat(minutes, seconds)}
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Question question={currentQuestion?.question} />
            </Grid>
            <Grid item xs={12}>
              <Answers
                badAnswers={currentQuestion?.badAnswers}
                solution={currentQuestion?.answer}
                handleResponse={handleResponse}
              />
            </Grid>
            <FormHelperText>{helperText}</FormHelperText>
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
              Next
            </Button>
          </FormControl>
        </Paper>
      </Grid>
    </form>
  );
}

export default QuizForm;
