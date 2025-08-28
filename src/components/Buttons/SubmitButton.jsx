import React from 'react'
import { Button } from '@mui/material';

const SubmitButton = ({color, value, onclick, type}) => {
  return (
    <Button 
      sx={{padding: "12px 16px", fontSize: "16px", borderRadius: "8px"}} 
      variant="contained" 
      color={color} 
      fullWidth 
      onClick={onclick}
      type={type}
    >
      {value}
    </Button>
  )
}

export default SubmitButton