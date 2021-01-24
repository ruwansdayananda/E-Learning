import React, {useState, useEffect} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Select, MenuItem,FormControl,InputLabel } from '@material-ui/core';
import { useFetch } from "../core/fetch";
import {UploadFileButton} from "./UploadFileButton";
//import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles((theme) => ({
  pageMainContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(17),
  },
  pageSubContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(6),
  },
  detailBox: {
    flexGrow: 1,
    fontSize: 14,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'left',
    color: 'theme.palette.common.white',
  },
  table: {
    minWidth: 700,
  },

  formControl: {
    minWidth: 100,
    paddingBottom: theme.spacing(5),
  }
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#7986cb',
    color: 'theme.palette.common.white',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



function createData(grade, a_id, submissions,s_email,email, marks, comment) {
  return { grade, a_id, submissions,s_email,email, marks, comment};
}

const rows = [
  createData('Grade 6', 1, 'Assignment 1' ),
  
];


export const GradeStudents = () => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const userInformation = useFetch({ url: "/api/user/get-user-information" });
  const currentUserEmail = userInformation.email;

  

  const handleChange = e => setValue(e.target.value);
  
  return (
    <div className={classes.pageMainContainer}>
      
      <FormControl className={classes.formControl}>
        
        <InputLabel>Grades</InputLabel>
        <Select onChange={handleChange}>
          <MenuItem value={1}> Grade 6</MenuItem>
          <MenuItem value={2}> Grade 7</MenuItem>
          <MenuItem value={3}> Grade 8</MenuItem>
          <MenuItem value={4}> Grade 9</MenuItem>
          <MenuItem value={5}> Grade 10</MenuItem>
          <MenuItem value={6}> Grade 11</MenuItem>
          <MenuItem value={7}> Grade 12</MenuItem>
          <MenuItem value={8}> Grade 13</MenuItem>
        </Select>
      </FormControl>
      
      <TableContainer component={Paper} >
        <Table className={classes.table} aria-label="customized table" >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Grade of Student</StyledTableCell>
              <StyledTableCell align="center">Assignment ID</StyledTableCell>
              <StyledTableCell align="center">Submissions</StyledTableCell>
              <StyledTableCell align="center">Student Email</StyledTableCell>
              <StyledTableCell align="center">Teacher Email</StyledTableCell>
              <StyledTableCell align="center">Grade</StyledTableCell>
              <StyledTableCell align="center">Feedback Comments</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.grade_of_class}>
                <StyledTableCell component="th" scope="row" align="center">
                  {value}
                </StyledTableCell>
                <StyledTableCell align="center">{row.a_id}</StyledTableCell>
                <StyledTableCell align="center">{row.submissions}</StyledTableCell>
                
                <StyledTableCell align="center">{row.s_email}</StyledTableCell>
                <StyledTableCell align="center">{currentUserEmail}</StyledTableCell>
                <StyledTableCell align="center">
                  <TextField id="outlined-basic"  variant="outlined" />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <TextField id="outlined-basic"  variant="outlined" />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  
    )
  
};