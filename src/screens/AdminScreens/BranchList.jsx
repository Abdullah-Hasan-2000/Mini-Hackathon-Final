import React, {useEffect, useState} from 'react'
import ResponsiveAppBar from '../../components/Navbar/AdminNavbar.jsx';
import NavigationBar from '../../components/Drawers/AdminDrawer.jsx';
import { Box, Paper } from '@mui/material';
import DataTable from '../../components/Table/DataTable.jsx';
import axios from 'axios';
import SubmitButton from '../../components/Buttons/SubmitButton.jsx'
import DataAddingModal from '../../components/Modals/DataAddingModal.jsx'

const BranchListScreen = () => {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    const getData = async () => {
        try {
            const response = await axios.get('http://localhost:3000/branches');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const setData1 = () => {
        const newArray = data.map((e,i) => {
            return {
                id: e.id,
                name: e.name,
                location: e.location,
                managerId: e.managerId,
            }
        })
        setColumns(newArray);
    } 

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        setData1();
    }, [data]);

  return (
    <>
        <div>
            <DataAddingModal open={open} handleClose={handleClose} />
        </div>
      <Box sx={{ width: '100%' }}>
        <ResponsiveAppBar />
        <Box sx={{ display: 'flex', flexDirection: 'row', padding: 2 , paddingLeft: 6 }}>
          <div style={{ width: '400px', height: '100vh' }}>
            <NavigationBar />
          </div>
          <Box sx={{ marginLeft: 2, width: '100%' }}>
            <Paper elevation={3} sx={{ paddingX: 2, paddingTop: 2, width: '95%', height: '100vh' }}>
              <Box>
                <h1>Branch List</h1>
                <SubmitButton value={"Add Branch"} style={{ marginBottom: '16px' , width: '150px' }} onclick={handleOpen} />
                <Box>
                    <Paper elevation={5}>
                      <DataTable data={columns} />
                    </Paper>
                </Box>
              </Box>             
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  )
}

export default BranchListScreen