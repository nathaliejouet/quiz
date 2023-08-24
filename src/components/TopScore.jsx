import { Grid, Typography, Paper, Button } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import { scoreHistoryFilteredSelector } from "../state/selectors";
import { useNavigate } from "react-router-dom";
import { minutesAndHoursFormat } from "../utils/text";
import { useTranslation } from "react-i18next";
import { formAtom } from "../state/atom";

function TopScore() {
  const [scoreHistoryFiltered] = useRecoilState(scoreHistoryFilteredSelector);
  const form = useRecoilValue(formAtom);
  const navigate = useNavigate();

  const { t } = useTranslation();

  function handleClick() {
    navigate("/");
  }

  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ ml: 7, mt: 2 }}>
          Meilleurs scores
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ ml: 7, mt: 2 }}>
          Catégorie : {t("themes", { returnObjects: true })[form.theme]}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" sx={{ ml: 7, mt: 2 }}>
          Difficulté :{" "}
          {t("difficulties", { returnObjects: true })[form.difficulty]}
        </Typography>
      </Grid>
      {scoreHistoryFiltered.map((score, index) => {
        return (
          <Grid item xs={4} key={index} align="center">
            <Paper
              elevation={3}
              sx={{
                width: 500,
                backgroundColor: "#fafafa",
                m: 2,
                p: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 3 }}>
                Nom : {score.name}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 3 }}>
                Date : {score.date}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 3 }}>
                Score: {score.score}
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 3 }}>
                Temps:{" "}
                {minutesAndHoursFormat(score.time.minutes, score.time.seconds)}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
      <Grid item xs={12} align="center">
        <Button
          type="submit"
          onClick={handleClick}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Retour
        </Button>
      </Grid>
    </Grid>
  );
}

export default TopScore;
