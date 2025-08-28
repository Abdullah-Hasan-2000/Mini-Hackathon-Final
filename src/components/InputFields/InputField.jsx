import React from 'react'
import TextField from '@mui/material/TextField'

const InputField = ({ label, onchange, type, autoComplete }) => {
  return (
    <TextField sx={{ borderRadius: "8px", "& .MuiOutlinedInput-root": { borderRadius: "8px" } }} label={label} variant="outlined" fullWidth onChange={onchange} required type={type} autoComplete={autoComplete} />
  )
}

export default InputField