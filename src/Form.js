import React from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      dateInput: new Date(),
      amount: "",
      description: "",
      type: "",
    };
  }

  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  dateChangeHandler = (e) => {
    var dateInput = e.toLocaleDateString().split("/");
    var formattedDateInput = `${dateInput[2]}-${dateInput[1]}-${dateInput[0]}`;
    this.setState({
      dateInput: formattedDateInput,
      date: e.toLocaleDateString(),
    });
  };

  // handleSubmit
  handleFormSubmit(e) {
    e.preventDefault();
    const currentEntry = {
      date: this.state.date,
      dateInput: this.state.dateInput,
      amount: +this.state.amount,
      description: this.state.description,
      type: this.state.type,
    };
    console.log(currentEntry.dateInput);
    console.log("Amount" + currentEntry.amount);
    console.log("Type " + currentEntry.type);
    console.log("Description" + currentEntry.description);

    this.props.triggerLiftEntries(currentEntry);
    this.props.triggerHideEntryForm();
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <FormLabel>Date</FormLabel>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Calendar onChange={(e) => this.dateChangeHandler(e)} />
          </div>
          <br />
          <br />
          <FormControl>
            <FormLabel>Amount</FormLabel>
            <Input
              name="amount"
              onSubmit={(e) => this.handleFormSubmit(e)}
              onChange={(e) => this.handleFormChange(e)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
            />
          </FormControl>
          <br />
          <br />
          <FormControl
            name="description"
            onSubmit={(e) => this.handleFormSubmit(e)}
            onChange={(e) => this.handleFormChange(e)}
          >
            <FormLabel>Description</FormLabel>
            <TextField name="description" size="small" fullWidth />
          </FormControl>
          <br />
          <br />
          <FormControl>
            <FormLabel>Type</FormLabel>
            <RadioGroup
              row
              name="type"
              onSubmit={(e) => this.handleFormSubmit(e)}
              onChange={(e) => this.handleFormChange(e)}
            >
              <FormControlLabel
                value="income"
                control={<Radio />}
                label="Income"
              />
              <FormControlLabel
                value="expense"
                control={<Radio />}
                label="Expense"
              />
            </RadioGroup>
          </FormControl>
          <br />
          <br />
          <Button
            variant="contained"
            size="medium"
            type="Submit"
            value="Submit"
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

export default Form;
