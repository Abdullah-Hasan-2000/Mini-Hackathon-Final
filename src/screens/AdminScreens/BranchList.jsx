import React, {use, useEffect, useState} from 'react'
import ResponsiveAppBar from '../../components/Navbar/AdminNavbar.jsx';
import NavigationBar from '../../components/Drawers/AdminDrawer.jsx';
import { Box, Paper } from '@mui/material';
import DataTable from '../../components/Table/DataTable.jsx';
import SubmitButton from '../../components/Buttons/SubmitButton.jsx'
import DataAddingModal from '../../components/Modals/DataAddingModal.jsx'
import { useSelector, useDispatch } from 'react-redux';
import { fetchBranches } from '../../store/Slices/BranchSlice.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import { toast, Bounce } from 'react-toastify';
import { resetBranchState } from '../../store/Slices/BranchSlice.jsx';

const BranchListScreen = () => {
    const [columns, setColumns] = useState([]);
    const dispatch = useDispatch();

    const { branches, isLoading, isError, isSuccess, errorMessage } = useSelector((state) => state.Branch);

    const setData1 = () => {
        const newArray = branches.map((e,i) => {
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
        dispatch(fetchBranches());
        dispatch(resetBranchState());
    }, [dispatch]);

    useEffect(() => {
        setData1();
    }, [branches]);

    useEffect(() => {
      if (isSuccess) {
        toast.success('Data Successfully fetched!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      } if (isError) {
        toast.error('Message: ' + errorMessage + " data", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }

    }, [isError]);

    

    if (isLoading) {
      return <Loader />;
    }


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