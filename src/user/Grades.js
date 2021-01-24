import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { useFetch } from '../core/fetch';
import { updateWhile } from 'typescript';

const useStyles = makeStyles((theme) => ({
  pageMainContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(5),
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

export const Grades = () => {
  const classes = useStyles();
  const gpaInformation = useFetch({ url: '/api/user/get-gpa-information' });
  const userGPA = gpaInformation.gpa;
  const userInformation = useFetch({ url: '/api/user/get-user-information' });
  const userName = userInformation.name;
  const gradeInformation = useFetch({ url: '/api/user/get-grade-information' });
  const userClass = gradeInformation.grade;
  const marksInformation = useFetch({ url: '/api/user/get-marks-information' });
  function FormRow(){
    return(
      <React.Fragment>
        <Grid item xs={6}>
          <Paper className={classes.paper} value={userName}>Name : {userName}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} >No. of Subjects : 6</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper} value={userClass}>Class : {userClass}</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}  value={userGPA}>Overall GPA : {userGPA}</Paper>
        </Grid>
      </React.Fragment>
    );
  }
  
  return (
    <div className={classes.pageMainContainer}>
      <div className={classes.pageSubContainer}>
        <div className={classes.detailBox}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={2}>
              <FormRow />
            </Grid>
          </Grid>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Subject</StyledTableCell>
              <StyledTableCell align="center">Assignment Title</StyledTableCell>
              <StyledTableCell align="center">Marks</StyledTableCell>
              <StyledTableCell align="center">Graded by</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {marksInformation.map((row) => (
              <StyledTableRow key={row.subject}>
                <StyledTableCell component="th" scope="row" align="center">
                  {row.subject}
                </StyledTableCell>
                <StyledTableCell align="center">{row.title}</StyledTableCell>
                <StyledTableCell align="center">{row.marks}</StyledTableCell>
                <StyledTableCell align="center">{row.teacher_email}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
};