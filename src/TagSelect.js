import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Select from '@material-ui/core/Select';


const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
    backgroundColor: theme.palette.background.default,
  },
}));

const TagSelect = ({tags, onChange, value}) => {
  const classes = useStyles();
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel htmlFor="tag-select">Category</InputLabel>
      <Select
        native
        id="tag-select"
        onChange={handleChange}
        value={value}
      >
        <option aria-label="None" value="_">Show All</option>
        {tags.map(tag => (
          <option key={tag.value} value={tag.value}>{tag.displayName}</option>
        ))}
      </Select>
    </FormControl>
  );
};

export default TagSelect;
