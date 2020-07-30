import React, { useState } from "react";
import Prospects from "../../pages/Prospects";
import { makeStyles } from "@material-ui/core/styles";
import CustomTextField from "../CustomTextField";
import {Grid} from "@material-ui/core";


export default function SearchBar() {
  return (
    <input type="text" onChange={handleSearchChange} placeholder="Search" />
    );
}

const handleSearchChange = (e) => {
    const target = e.target;
    console.log(target.value);
  };
