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
import { Select, MenuItem,FormControl,InputLabel, Box } from '@material-ui/core';
import { useFetch,fetch } from "../core/fetch";
import {UploadFileButton} from "./UploadFileButton";
import { render } from 'react-dom';
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




export const GradeStudents = () => {
  const [submission, setSubmission] = useState([]);
  const classes = useStyles();
  const [value, setValue] = useState("");
  const userInformation = useFetch({ url: "/api/user/get-user-information" });
  const currentUserEmail = userInformation.email;
  const submissions=[{name:"Supun Surath",email:"Supun@uom.lk",upload_id:"abad4578-05da-4b63-9cd6-a90cf4338cd2"}]
  const getAssignmentSubmission =async (assignment_id,grade_id)=>{
    const data111 = {
      grade_id: grade_id,
      assignment_id: assignment_id,
    };
    const res = await fetch({
    url: "/api/user/getAssignmentSubmission",
    method: "post",
    body: data111,
    });
    console.log(res);
    setSubmission(res);
    return res;
  }
  //  const subs = getAssignmentSubmission("479d96f9-9f3a-4b06-b97a-69b368914746","4");
  //  console.log(subs);
  //  useEffect()
  


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

  const changeAssignmentID =async (event) =>{
    setAssignmentID(event.target.value)
    const assignment_id=event.target.value;
    const res = await fetch({
      url: "/api/user/getAssignmentSubmission",
      method: "post",
      body: assignment_id,
      });
      console.log(res);
      setSubmission(res);
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
      <Button variant="contained" color="primary" disableElevation onClick={(e)=>{getAssignmentSubmission(assignment_id,grade_id)}}>Show Student Submissions</Button>
      {CustomizedTables(submission)}
     
    </div>
  
    )
  
};

function createData(name, email, upload_id,grade_value,comment_value) {
  return { name, email, upload_id,grade_value,comment_value };
}




const CustomizedTables = (submission) => {
  console.log(submission);
  /////////////////////////////////////////////////////////////////////////////
  const rows = submission;
  //  [
  //   {name:"Supun Surath", email:"Supun@uom.lk", upload_id:"742ef695-4d3b-4ba7-b152-0c93a7f14f3a",grade:'',comment:''},
  //   {name:'Wimukthi Indeewara', email:"180424d@uom.lk", upload_id:"cd51c4bd-5624-43d7-b077-82c596ba3857",grade:'',comment:''},
  // ];
  const setGrade=(row,value)=>{
    row.grade = value;
  }

  const setComment=(row,value)=>{
    row.comment = value;
  }
  const submitGrading= async (email,upload_id,grade,comment)=>{
    console.log(email,upload_id,grade,comment);
    const res = await fetch({
      url: '/api/user/submitGrading',
      method: 'post',
      body:{
        email:email,
        upload_id:upload_id,
        grade:grade,
        comment:comment
      },
    });
    window.location.reload(false);
  }

  const DownloadSubmission=async (upload_id)=>{
    //  const res = await fetch({
    //  url: '/api/user/filelocation',
    //  method: 'post',
    //  body: {upload_id:upload_id},
    //   });
    //   const file_name = res.file_name;
  
    
      openInNewTab("http://localhost:8000/api/user/getFile2/"+upload_id);
  
  }
  
  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
  

  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name of Student</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Student's Submission</StyledTableCell>
            <StyledTableCell align="right">Grade</StyledTableCell>
            <StyledTableCell align="right">Feedback Comments</StyledTableCell>
            <StyledTableCell align="right"> Submit Grade</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.email}</StyledTableCell>
              <StyledTableCell align="center">
              <Button variant="contained" color="primary" disableElevation onClick={(e) => DownloadSubmission(row.upload_id)}>Download Submission</Button>
              </StyledTableCell>
              <StyledTableCell align="center"><TextField id="standard-search" label="Grade" type="number" variant="outlined"  onChange={(e) => setGrade(row,e.target.value)}/></StyledTableCell>
              <StyledTableCell align="center"><TextField id="standard-search" label="Comment" type="search" variant="outlined" onChange={(e) => setComment(row,e.target.value)}/></StyledTableCell>
              <StyledTableCell align="center">
              <Button variant="contained" color="primary" disableElevation onClick={(e) => submitGrading(row.email,row.upload_id,row.grade,row.comment)}>Submit Grading</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    
  );


}

      

         
 






