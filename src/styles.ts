import { Theme, createStyles } from "@mui/material";

export default (theme: Theme) => {
  return createStyles({
    root: {
      margin: theme.spacing(2),
      padding: 0.5,
      fontSize: 2,
      textAlign: "center",
    },
  });
};
