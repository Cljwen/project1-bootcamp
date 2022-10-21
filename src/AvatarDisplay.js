import * as React from "react";
import Avatar from "@mui/material/Avatar";
import AvatarImage from "./images/exava.jpg";

export default function ImageAvatar() {
  return (
    <Avatar alt="Carmen" sx={{ width: 56, height: 56 }} src={AvatarImage} />
  );
}
