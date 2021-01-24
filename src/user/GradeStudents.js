import React, { useState, useEffect } from 'react';
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
import { Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';
import { useFetch } from "../core/fetch";
import { UploadFileButton } from "./UploadFileButton";
import { set } from 'date-fns';
import { Form, FormInput} from '../core/signup';
import * as Yup from "yup";
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



function createData(grade, a_id, submissions, s_email, email, marks, comment) {
  return { grade, a_id, submissions, s_email, email, marks, comment };
}

const rows = [
  createData('Grade 6', 1, 'Assignment 1'),

];


export const GradeStudents = () => {
  const classes = useStyles();
  const [value, setValue] = useState("");
  const userInformation = useFetch({ url: "/api/user/get-user-information" });
  const currentUserEmail = userInformation.email;

  const subjetInformation = useFetch({ url: '/api/user/get-teacher-subjects' });
  const availableGrades = useFetch({ url: '/api/user/get-available-grades' });
  const teacherAssignments = useFetch({ url: '/api/user/get-teacher-assignmets' });
  console.log(teacherAssignments)
  console.log(availableGrades)
  const [grade_id, setGradeId] = useState('')
  const [assignment_id, setAssignmentID] = useState('')
  const [grade_assignments, setGrade_assignments] = useState([<MenuItem value="null"> </MenuItem>])
 

  var menuItems = []

  for (const [index, value] of availableGrades.entries()) {

    menuItems.push(<MenuItem value={value.grade_id}>{value.grade.charAt(0).toUpperCase() + value.grade.slice(1)}</MenuItem>)
  }

  const changeAssignmentID = (event) =>{
    setAssignmentID(event.target.value)
    console.log(event.target.value)
  }


  const handleChange = (event) => {

    setGradeId(event.target.value);
    console.log(event.target.value)
    var assignmentItems = []

    for (const [index, value] of teacherAssignments.entries()) {
      if(value.grade_id === event.target.value) {
        assignmentItems.push(<MenuItem value={value.assignment_id}>{value.title}</MenuItem>)
      }
    }
    
    if(assignmentItems.length > 0){
      setGrade_assignments(assignmentItems)
    }else{
      
      setGrade_assignments(<MenuItem value="null"> </MenuItem>)
    }

  };
  

  return (
    <div className={classes.pageMainContainer}>

      <FormControl className={classes.formControl}>

        <InputLabel>Grades</InputLabel>
        <Select value={grade_id} onChange={handleChange}>
          {menuItems}
        </Select>
      </FormControl>

      <FormControl className={classes.formControl}>

        <InputLabel>Assignments</InputLabel>
        <Select value={assignment_id} onChange={changeAssignmentID}>
          {grade_assignments}
        </Select>
      </FormControl>
 <TableContainer >
        <Table className={classes.table} aria-label="customized table" >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Student Email</StyledTableCell>
              <StyledTableCell align="center">Student Name</StyledTableCell>
              <StyledTableCell align="center">Submission</StyledTableCell>
              <StyledTableCell align="center">Grade</StyledTableCell>
              <StyledTableCell align="center">Feedback Comments</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.grade_of_class}>
                <StyledTableCell component="th" scope="row" align="center"></StyledTableCell>
                <StyledTableCell align="center">{row.a_id}</StyledTableCell>
                <StyledTableCell align="center">{row.submissions}</StyledTableCell>
                <StyledTableCell align="center"><TextField id="outlined-basic" variant="outlined" /></StyledTableCell>
                <StyledTableCell align="center"><TextField id="outlined-basic" variant="outlined" /></StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      

         
    </div>



  )

};