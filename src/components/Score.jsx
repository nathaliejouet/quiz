import { Button, Grid, Box, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { quizAtom, timerAtom } from "../state/atom";
import { minutesAndHoursFormat } from "../utils/text";

function Score() {
  const navigate = useNavigate();
  const quiz = useRecoilValue(quizAtom);
  const timer = useRecoilValue(timerAtom);

  function handleClick() {
    navigate("/");
  }

  return (
    <Box>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h3" sx={{ m: 3 }}>
            Score : {quiz.score} / {quiz.totalQuestions}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Temps : {minutesAndHoursFormat(timer.minutes, timer.seconds)}
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} align="center">
        <Link component={RouterLink} to="/topscore">
          Voir les meilleurs scores
        </Link>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          type="submit"
          onClick={handleClick}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Rejouer
        </Button>
      </Grid>
    </Box>
  );
}

export default Score;
