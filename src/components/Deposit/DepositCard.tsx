import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";

export const DepositCard = () => {

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Depositar
        </Typography>
        <FormControl fullWidth sx={{ m: 1 }} variant="filled">
          <InputLabel htmlFor="filled-adornment-amount">Monto</InputLabel>
          <FilledInput
            id="filled-adornment-amount"
            value={""}
            startAdornment={
              <InputAdornment position="start">ETH</InputAdornment>
            }
          />
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          size="small"
        >
          Continuar
        </Button>
      </CardActions>
    </Card>
  );
};
