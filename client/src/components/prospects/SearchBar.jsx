import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function SearchBar(props) {

  const handleSearchChange = (e) => {
    props.setText(e.target.value);
  };

  return (
    <input type="text" onChange={handleSearchChange} placeholder="Search" />
    );
}


