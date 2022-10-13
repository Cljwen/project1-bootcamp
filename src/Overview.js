import React from "react";

class Overview extends React.Component {
  handleNetBalance = (type) => {
    const income = this.props.entries.reduce((sum, entry) => {
      if (entry.type === "income") {
        sum = sum + entry.amount;
      }
      return sum;
    }, 0);

    if (type === "income") {
      return income.toFixed(2);
    }

    const expense = this.props.entries.reduce((sum, entry) => {
      if (entry.type === "expense") {
        sum = sum + entry.amount;
      }
      return sum;
    }, 0);

    if (type === "expense") {
      return expense.toFixed(2);
    }

    const netBalance = income - expense;

    if (type === "net") {
      return netBalance.toFixed(2);
    }
  };

  render() {
    return (
      <div>
        Income: $ {this.props.entries ? this.handleNetBalance("income") : "0"}
        <br />
        Expense: $ {this.props.entries ? this.handleNetBalance("expense") : "0"}
        <br />
        Net: $ {this.props.entries ? this.handleNetBalance("net") : "0"}
        <br />
      </div>
    );
  }
}
export default Overview;
