import React from "react";
import EditForm from "./EditForm.js";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { cardTheme } from "./theme.js";
import { ThemeProvider } from "@mui/material/styles";

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
          <ThemeProvider theme={cardTheme}>
            <Card className={"MuiEntryCard"}>
              <CardContent>
                <Grid container spacing={0}>
                  <Grid xs={12} py={1}>
                    <Typography sx={{ fontSize: "3vh" }} color="text.secondary">
                      {listing.date}
                    </Typography>

                    <Divider className={"MuiDivider"} />
                  </Grid>
                  <Grid xs={3}>
                    <Typography
                      noWrap
                      sx={{ fontSize: "2vh" }}
                      color="text.secondary"
                    >
                      {listing.category}
                    </Typography>
                  </Grid>
                  <Grid xs={6} px={0.5}>
                    <Typography
                      sx={{
                        fontSize: "2.5vh",
                        fontWeight: "bold",
                        lineHeight: "1.1",
                      }}
                    >
                      {listing.description}
                    </Typography>
                  </Grid>
                  <Grid xs={3} zeroMinWidth>
                    <Typography
                      sx={{
                        fontSize: "3vh",
                      }}
                      variant={`body2 ${
                        listing.type === "Income" ? `income` : `expense`
                      }`}
                    >
                      ${listing.amount.toFixed(2)}
                    </Typography>
                    <br />
                    <Box row="true" padding={0}>
                      <Tooltip title="Delete">
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={() => this.deleteEntry(index)}
                        >
                          <DeleteIcon
                            className={"MuiIconButton"}
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={() => this.updateEditStatus(index)}
                        >
                          <EditIcon
                            className={"MuiIconButton"}
                            fontSize="small"
                          />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </ThemeProvider>

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
        </div>
      );
    });
    return <div>{listingDisplay}</div>;
  }
}

export default DisplayListing;
