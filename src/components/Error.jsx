import { Box, Typography } from "@mui/material";

function Error() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 8,
      }}
    >
      <Typography component="h2" variant="h4" sx={{ mb: 3 }}>
        Une erreur s'est produite...
      </Typography>
    </Box>
  );
}

export default Error;
