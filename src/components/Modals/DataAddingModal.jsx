import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Paper } from '@mui/material';
import InputField from '../InputFields/InputField.jsx'
import SubmitButton from '../Buttons/SubmitButton.jsx';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '600px',
  bgcolor: 'background.paper',
  
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, handleClose, addData }) {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Paper elevation={8} sx={style}>
          <Box sx={{ paddingX: 2, paddingY: 2, width: '95%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h1>Add New Branch</h1>
              <Box sx={{ marginTop: 2, width: '75%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Box>
                  <form>
                    <Box sx={{ padding: 3, width: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 3 }}>    
                        <InputField label="Branch Name" type="text" id="branchName" name="branchName" required />                      
                        <InputField label="Branch Location" type="text" id="branchLocation" name="branchLocation" required />
                        <InputField label="Manager ID" type="text" id="managerId" name="managerId" required />
                      <SubmitButton type="submit" value={"Add Branch"} onclick={addData} />
                    </Box>
                  </form>
                </Box>
              </Box>
            </Box>
        </Paper>
      </Modal>
    </div>
  );
}
