import React from "react"
import { IconButton } from '@material-ui/core'
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

export const PrevButton = ({ enabled, onClick }) => (
  <IconButton onClick={onClick} disabled={!enabled}  size="medium">
      <ArrowBackIosOutlinedIcon fontSize="large" /> 
  </IconButton>
)

export const NextButton = ({ enabled, onClick }) => (
  <IconButton onClick={onClick} disabled={!enabled} size="medium">
      <ArrowForwardIosIcon fontSize="large"  />
  </IconButton>
)
