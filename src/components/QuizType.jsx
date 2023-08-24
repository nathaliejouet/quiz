import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  FormControl,
  Select,
  MenuItem,
  Button,
  InputLabel,
  Typography,
} from "@mui/material";
import { useRecoilState, useResetRecoilState } from "recoil";
import { quizAtom, formAtom } from "../state/atom";
import { useTranslation } from "react-i18next";
import Difficulty from "../enums/Difficulty";
import Theme from "../enums/Theme";

function QuizType() {
  const { t } = useTranslation();
  const [form, setForm] = useRecoilState(formAtom);
  const navigate = useNavigate();

  const difficulties = Object.values(Difficulty);
  const themes = Object.values(Theme);
  const resetQuiz = useResetRecoilState(quizAtom);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function handleSubmit(e) {
    e.preventDefault();
    resetQuiz();
    navigate("/quiz");
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 8,
      }}
    >
      <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
        QUIZ APP
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Prénom"
          name="name"
          required
          fullWidth
          sx={{ mb: 3 }}
          onChange={handleChange}
        />

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Thème</InputLabel>
          <Select
            name="theme"
            value={form.theme}
            label="Thème"
            onChange={handleChange}
          >
            {themes.map((theme) => (
              <MenuItem value={theme} key={theme}>
                {t(`themes.${theme}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Difficulté</InputLabel>
          <Select
            name="difficulty"
            value={form.difficulty}
            label="Difficulté"
            onChange={handleChange}
          >
            {difficulties.map((difficulty) => (
              <MenuItem value={difficulty} key={difficulty}>
                {t(`difficulties.${difficulty}`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          GO !
        </Button>
      </form>
    </Box>
  );
}

export default QuizType;
