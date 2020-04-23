import React from 'react';
import { useTheme } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import styled from '@emotion/styled';
import useStyles from '../themes/useStyles'

const Label = styled.h4`
margin-bottom: 35px; 
text-align: center;
`


function valuetext(value) {
  return `${value}`;
}




function RangeSlider(props) {
  const theme = useTheme();
  const mode = theme.palette.type
  const { minAge , maxAge ,onAgeSelection } = props  
  const classes = useStyles();
  const [value, setValue] = React.useState([minAge, maxAge]);

  const handleChange = ( e, newValue) => {
    setValue(newValue);
    onAgeSelection(value)
  };

  
  return (
    <div className={classes.rangeSlider}>
      <Label>Select the age group</Label>
      <Slider
        value={value}
        min={minAge}
        max={maxAge}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
        // style={mode === "dark" ? {color: theme.palette.primary.light} : {color: theme.palette.primary.main}}
      />
    </div>
  )
}

export default RangeSlider;