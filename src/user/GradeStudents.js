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
import { Select, MenuItem,FormControl,InputLabel, Box } from '@material-ui/core';
import { useFetch,fetch } from "../core/fetch";
import {UploadFileButton} from "./UploadFileButton";
import { render } from 'react-dom';
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



// function createData(grade, a_id, submissions,s_email,email, marks, comment) {
//   return { grade, a_id, submissions,s_email,email, marks, comment};
// }





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
  

  
  return (
    <div className={classes.pageMainContainer}>
      <Button onClick={(e)=>{getAssignmentSubmission("479d96f9-9f3a-4b06-b97a-69b368914746","4")}}>Hello</Button>





      {CustomizedTables(submission)}
      {/* <FormControl className={classes.formControl}>
        
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
      </TableContainer> */}
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