import React from "react";
import EditForm from "./EditForm.js";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

class DisplayListing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editArrayIndex: null,
      editingEntry: false,
    };
  }

  updateEditStatus = (index) => {
    this.setState({
      editArrayIndex: index,
      editingEntry: !this.state.editingEntry,
    });
  };

  editEntry = (editedEntry, index) => {
    const editedEntryArray = this.props.entries;
    editedEntryArray.splice(index, 1, editedEntry);
    this.props.triggerUpdateEntryArray(editedEntryArray);
  };

  deleteEntry = (index) => {
    const editedEntryArray = this.props.entries;
    editedEntryArray.splice(index, 1);
    this.props.triggerUpdateEntryArray(editedEntryArray);
  };

  hideEditForm = () => {
    this.setState({
      editingEntry: false,
    });
  };

  render() {
    const listingDisplay = this.props.entries.map((listing, index) => {
      return (
        <div key={index}>
          <br />
          Date: {listing.date}
          <br />
          Amount: ${listing.amount.toFixed(2)}
          <br />
          Description: {listing.description}
          <br />
          Type: {listing.type}
          <br />
          <Tooltip title="Delete">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => this.deleteEntry(index)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton
              aria-label="edit"
              size="small"
              onClick={() => this.updateEditStatus(index)}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          {this.state.editArrayIndex === index &&
            this.state.editingEntry === true && (
              <div>
                <EditForm
                  currentListing={listing}
                  editIndex={index}
                  triggerEdit={(currentEntry, index) =>
                    this.editEntry(currentEntry, index)
                  }
                  triggerHideEditForm={() => this.hideEditForm()}
                />
              </div>
            )}
          {/* <button onClick={() => this.updateEditStatus(index)}>Edit</button>
          <button onClick={() => this.deleteEntry(index)}>Delete</button> */}
          {/* {this.state.editArrayIndex === index &&
            this.state.editingEntry === true && (
              <div>
                <EditForm
                  currentListing={listing}
                  editIndex={index}
                  triggerEdit={(currentEntry, index) =>
                    this.editEntry(currentEntry, index)
                  }
                  triggerHideEditForm={() => this.hideEditForm()}
                />
              </div>
            )} */}
        </div>
      );
    });
    return <div>{listingDisplay}</div>;
  }
}

export default DisplayListing;
