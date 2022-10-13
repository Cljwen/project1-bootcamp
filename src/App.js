import React from "react";
import "./App.css";
import Form from "./Form.js";
import DisplayListing from "./Listing.js";
import Overview from "./Overview.js";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      addingEntry: false,
    };
  }

  // Add CURRENT entry data from form.js
  liftAddedEntry = (currentEntry) => {
    const entries = this.state.entries;
    entries.push(currentEntry);
    this.setState({
      entries: entries,
    });
  };

  // function to load form if button is pressed
  loadEntryForm = () => {
    this.setState({
      addingEntry: !this.state.addingEntry,
    });
  };

  liftEditedEntryArray = (editedEntryArray) => {
    this.setState({
      entries: editedEntryArray,
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">Expense Tracker</header>
        <div>
          <Overview entries={this.state.entries} />
          <br />
          <DisplayListing
            entries={this.state.entries}
            triggerUpdateEntryArray={(editedEntryArray) =>
              this.liftEditedEntryArray(editedEntryArray)
            }
          />

          <br />
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            aria-label="add"
            onClick={this.loadEntryForm}
          >
            <AddIcon sx={{ mr: 1 }} />
            Add Entry
          </Fab>
          {this.state.addingEntry === true && (
            <div>
              <br />
              <Form
                triggerLiftEntries={(currentEntry) => {
                  this.liftAddedEntry(currentEntry);
                }}
                triggerHideEntryForm={this.loadEntryForm}
              />
            </div>
          )}
          <br />
          {/* <button onClick={this.loadEntryForm}> + Add Entry</button> */}
          {/* {this.state.addingEntry === true && (
            <div>
              <br />
              <Form
                triggerLiftEntries={(currentEntry) => {
                  this.liftAddedEntry(currentEntry);
                }}
                triggerHideEntryForm={this.loadEntryForm}
              />
            </div>
          )} */}
        </div>
      </div>
    );
  }
}

export default App;
