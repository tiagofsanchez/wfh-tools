import React from 'react';
import { makeStyles , withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
    margin: `auto`,
    marginTop: `40px`,
  },
});

const WFHSlider = withStyles({
  root: {
    color: `rebeccapurple`,
  },
})(Slider)

function valuetext(value) {
  return `${value}`;
}

function RangeSlider(props) {
  const { minAge , maxAge ,onAgeSelection } = props  
  const classes = useStyles();
  const [value, setValue] = React.useState([minAge, maxAge]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onAgeSelection(value)
  };
  


  return (
    <div className={classes.root}>
      <WFHSlider
        value={value}
        min={minAge}
        max={maxAge}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
        valueLabelDisplay="on"
      />
    </div>
  )
}

export default RangeSlider;