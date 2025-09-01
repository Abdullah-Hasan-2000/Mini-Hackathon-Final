import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export default function BasicTable({data}) {
    
    const columns = data[0] ? Object.keys(data[0]) : [];
    
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column, i) => {
                return <TableCell align="center" key={i}>{column.toUpperCase()}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((e,i) => (
            <TableRow
              key={e.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align='center'>
                {e.id}
              </TableCell>
              <TableCell align="center">{e.name}</TableCell>
              <TableCell align="center">{e.location}</TableCell>
              <TableCell align="center">{e.managerId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
