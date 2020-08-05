import React from "react";
import {Checkbox as MaterialCheckbox} from "@material-ui/core";

export default function Checkbox(props) {
  const [checked, setChecked] = React.useState(props.checked);

  const handleChange = (event) => {
    setChecked(event.target.checked);

    // Then call the callback, adding status of the checkbox instead of an event.
    props.clickEvent(event.target.checked);
  };

  return (
    <div>
      <MaterialCheckbox
        color="default"
        // Use the checked state to know what checked value should be.
        checked={checked}
        inputProps={{ 'aria-label': 'checkbox with default color' }}
        // When the value of the checkbox changes, call this callback with the event.
        onChange={handleChange}
      />
    </div>
  );
}