import React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

class Overview extends React.Component {
  handleNetBalance = (type) => {
    const income = this.props.entries.reduce((sum, entry) => {
      if (entry.type === "Income") {
        sum = sum + entry.amount;
      }
      return sum;
    }, 0);

    if (type === "Income") {
      return income.toFixed(2);
    }

    const expense = this.props.entries.reduce((sum, entry) => {
      if (entry.type === "Expense") {
        sum = sum + entry.amount;
      }
      return sum;
    }, 0);

    if (type === "Expense") {
      return expense.toFixed(2);
    }

    const netBalance = income - expense;

    if (type === "Net") {
      return netBalance.toFixed(2);
    }
  };

  render() {
    return (
      <div className="Overview">
        {/* <BoxSx> */}
        <div className="Overview-Header">
          <h2>Here's an overview of your pocket:</h2>
        </div>
        <Grid container spacing={1.5} px={3}>
          <Grid xs={6}>
            <Item>
              Income
              <br />
              <div className="Overview-Numbers income">
                ${this.props.entries ? this.handleNetBalance("Income") : "0"}
              </div>
            </Item>
          </Grid>
          <Grid xs={6}>
            <Item>
              Expenses <br />
              <div className="Overview-Numbers expense">
                ${this.props.entries ? this.handleNetBalance("Expense") : "0"}
              </div>
            </Item>
          </Grid>
          <Grid xs={12}>
            <Item>
              Net Balance
              <div className="Overview-Numbers black">
                ${this.props.entries ? this.handleNetBalance("Net") : "0"}
              </div>
            </Item>
          </Grid>
        </Grid>
        {/* </BoxSx> */}
        <br />
      </div>
    );
  }
}
export default Overview;
