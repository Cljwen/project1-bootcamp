import React from "react";
import "./App.css";
import Form from "./Form.js";
import DisplayListing from "./Listing.js";
import Overview from "./Overview.js";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ImageAvatar from "./AvatarDisplay";
import NoEntry from "./images/noentry.png";

import { theme } from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entries: [],
      addingEntry: false,
    };
  }

  //
  componentDidMount = () => {
    //get local storage of entries array
    const entriesLocalStorage = localStorage.getItem("entriesLocalStorage");
    // convert string to valid object
    const parsedEntriesLocalStorage = JSON.parse(entriesLocalStorage);

    if (parsedEntriesLocalStorage) {
      this.setState({
        entries: parsedEntriesLocalStorage,
      });
    }
  };

  // Add entry into array from form.js
  liftAddedEntry = (currentEntry) => {
    const entries = this.state.entries;
    entries.push(currentEntry);
    const sortedEntryArray = entries.sort(
      (a, b) => -(new Date(a.dateInput) - new Date(b.dateInput))
    );

    this.setState({
      entries: sortedEntryArray,
    });
    // set local storage here
    const entriesLocalStorageArray = JSON.stringify(entries);

    // save to local storage
    localStorage.setItem("entriesLocalStorage", entriesLocalStorageArray);
  };

  // function to load form if button is pressed
  loadEntryForm = () => {
    this.setState({
      addingEntry: !this.state.addingEntry,
    });
  };

  // Add CURRENT entry data from form.js
  liftEditedEntryArray = (editedEntryArray) => {
    const entries = editedEntryArray;
    const sortedEntryArray = entries.sort(
      (a, b) => -(new Date(a.dateInput) - new Date(b.dateInput))
    );
    this.setState({
      entries: sortedEntryArray,
    });
    // set local storage here
    const entriesLocalStorageArray = JSON.stringify(entries);
    // save to localStorage
    localStorage.setItem("entriesLocalStorage", entriesLocalStorageArray);
  };

  render() {
    return (
      <div className="App">
        <ThemeProvider theme={theme}>
          <header className="App-header">
            <ImageAvatar />
            <h2>Hello, Carmen.</h2>
          </header>
          <Overview entries={this.state.entries} />
          <div>
            {this.state.entries.length === 0 ? (
              <div className="ZeroEntry">
                <img alt="No entries" src={NoEntry} />
                <br />
                You have not added any entries yet.
              </div>
            ) : (
              <div className="Transaction"> Your Entries</div>
            )}
          </div>
          <DisplayListing
            entries={this.state.entries}
            triggerUpdateEntryArray={(editedEntryArray) =>
              this.liftEditedEntryArray(editedEntryArray)
            }
          />

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
          <br />
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
        </ThemeProvider>
      </div>
    );
  }
}

export default App;
