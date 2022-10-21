import React from "react";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";

import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Calendar from "react-calendar";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "react-calendar/dist/Calendar.css";
import { Categories } from "./Categories.js";
import { theme } from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: props.currentListing.date,
      dateInput: props.currentListing.dateInput,
      amount: props.currentListing.amount.toFixed(2),
      category: props.currentListing.category,
      description: props.currentListing.description,
      type: props.currentListing.type,
      addCategory: false,
      addCategoryName: "",
      formCategoryArray: Categories,
      errorMessage: "",
    };
  }

  componentDidMount = () => {
    //get local storage of categories
    const categoryArrayLocal = localStorage.getItem("categoryLocalStorage");
    // convert string to valid object
    const parsedCategoryArrayLocal = JSON.parse(categoryArrayLocal);

    if (parsedCategoryArrayLocal) {
      this.setState({
        formCategoryArray: parsedCategoryArrayLocal,
      });
    }
  };

  // number input validation for amount form field
  handleNumberCheck(e) {
    if (isNaN(e.target.value)) {
      e.target.value = "";
      this.setState({
        [e.target.name]: e.target.value,
        errorMessage: "Please key in numbers only.",
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
        errorMessage: "",
      });
    }
  }

  // add new category to category array
  handleAddCategory = () => {
    const editCategoryArray = this.state.formCategoryArray;
    editCategoryArray.splice(-1, 0, this.state.addCategoryName);
    this.setState({
      formCategoryArray: editCategoryArray,
      addCategory: false,
      category: this.state.addCategoryName,
    });
    // set local storage here
    const categoryLocalStorageArray = JSON.stringify(editCategoryArray);

    // save to localStorage
    localStorage.setItem("categoryLocalStorage", categoryLocalStorageArray);
  };

  // check if add category option is selected and toggle status to true
  handleCategoryChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      addCategory: false,
    });
    if (e.target.value === "Add Category") {
      this.setState({
        addCategory: true,
      });
    }
  }

  handleFormChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  // handle submit of form input
  handleFormSubmit(e) {
    e.preventDefault();
    const currentEntry = {
      date: this.state.date,
      dateInput: this.state.dateInput,
      amount: +this.state.amount,
      category: this.state.category,
      description: this.state.description,
      type: this.state.type,
    };
    const index = this.props.editIndex;
    this.props.triggerEdit(currentEntry, index);
    this.props.triggerHideEditForm();
  }

  // store date & date input to feed back into calendar function for editing
  handleDateChange = (e) => {
    var dateInput = e.toLocaleDateString().split("/");
    var formattedDateInput = `${dateInput[2]}-${dateInput[1]}-${dateInput[0]}`;

    this.setState({
      dateInput: formattedDateInput,
      date: e.toLocaleDateString(),
    });
  };
  render() {
    return (
      <div>
        <form onSubmit={(e) => this.handleFormSubmit(e)}>
          <FormLabel>Date</FormLabel>
          <br />
          <div
            style={{
              display: "flex",
              margin: "15px",
              justifyContent: "center",
            }}
          >
            <Calendar
              onChange={(e) => this.handleDateChange(e)}
              value={new Date(this.props.currentListing.dateInput.toString())}
            />
          </div>
          <ThemeProvider theme={theme}>
            <FormControl required={true} sx={{ width: "60%", padding: "20px" }}>
              <FormLabel>Amount</FormLabel>
              <Input
                name="amount"
                error={this.state.errorMessage ? true : false}
                onSubmit={(e) => this.handleFormSubmit(e)}
                onChange={(e) => this.handleNumberCheck(e)}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                value={this.state.amount}
              />
              <FormHelperText id="amount">
                {this.state.errorMessage}
              </FormHelperText>
            </FormControl>

            <FormControl required={true} sx={{ width: "60%", margin: "20px" }}>
              <InputLabel id="category">Category</InputLabel>
              <Select
                value={this.state.category}
                name="category"
                label="category"
                onChange={(e) => this.handleCategoryChange(e)}
                onSubmit={(e) => this.handleFormSubmit(e)}
              >
                {this.state.formCategoryArray.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {this.state.addCategory ? (
                <FormControl
                  id="Category Name"
                  sx={{ margin: "20px 0px" }}
                  onChange={(e) => this.handleFormChange(e)}
                >
                  <TextField label="Category Name" name="addCategoryName" />
                  <Button
                    onClick={this.handleAddCategory}
                    sx={{ margin: "20px 0px" }}
                    variant="contained"
                  >
                    Save
                  </Button>
                </FormControl>
              ) : null}
            </FormControl>

            <FormControl
              name="description"
              required={true}
              sx={{ width: "60%", padding: "20px" }}
              onSubmit={(e) => this.handleFormSubmit(e)}
              onChange={(e) => this.handleFormChange(e)}
            >
              <FormLabel>Description</FormLabel>
              <TextField
                required={true}
                name="description"
                value={this.state.description}
              />
            </FormControl>

            <FormControl sx={{ width: "40%", padding: "20px" }}>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                name="type"
                onSubmit={(e) => this.handleFormSubmit(e)}
                onChange={(e) => this.handleFormChange(e)}
                value={this.state.type}
              >
                <Box
                  sx={{
                    width: "100%",
                  }}
                >
                  <FormControlLabel
                    value="Income"
                    control={<Radio required={true} />}
                    label="Income"
                  />
                  <FormControlLabel
                    value="Expense"
                    control={<Radio required={true} />}
                    label="Expense"
                  />
                </Box>
              </RadioGroup>
            </FormControl>

            <Box
              sx={{
                width: "100%",
                marginBottom: "70px",
              }}
            >
              <Button
                variant="contained"
                size="medium"
                type="Submit"
                value="Submit"
                sx={{ width: "20%" }}
              >
                Submit
              </Button>
            </Box>
          </ThemeProvider>
        </form>
      </div>
    );
  }
}

export default EditForm;
