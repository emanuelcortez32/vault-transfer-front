import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { DepositCard } from "../components/Deposit/DepositCard";
import { connectContract } from "../components/hocs/connectContract";
import { ContractAdapter } from "../models/web3Models";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#AED9E0',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const mapContractMethodsToProps = (contract: ContractAdapter) => ({
  getTotalSupplyPool: () => { contract.method('getTotalSupplyPool').call() }
});

type AccountDashboardProps = {
  getTotalSupplyPool: Function
}

export const AccountDashboard = ({getTotalSupplyPool}: AccountDashboardProps) => {

  getTotalSupplyPool();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={8}>
          <Item>
            <Grid
              container
              spacing={2}
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Grid item xs={6}>
                <Item>
                  <DepositCard />
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default connectContract(AccountDashboard)('Pool', mapContractMethodsToProps);
