import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectX({ defaultVal, setVal, arr, label }) {
  const handleChange = (event) => {
    setVal(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={defaultVal}
          label={defaultVal}
          onChange={handleChange}
        >
          {
            arr.map(item => {
              return (
                <MenuItem value={item}>{item}</MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    </Box>
  );
}
