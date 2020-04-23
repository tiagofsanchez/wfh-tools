import React from "react"
import Slider from "@material-ui/core/Slider"
import styled from "@emotion/styled"

import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  rangeSlider: {
    width: 280,
    margin: `auto`,
  },
}))

const Label = styled.h4`
  margin-bottom: 35px;
  text-align: center;
`

function valuetext(value) {
  return `${value}`
}

function RangeSlider(props) {
  const { minAge, maxAge, onAgeSelection } = props
  const classes = useStyles()
  const [value, setValue] = React.useState([minAge, maxAge])

  const handleChange = (e, newValue) => {
    setValue(newValue)
    onAgeSelection(value)
  }

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
      />
    </div>
  )
}

export default RangeSlider
