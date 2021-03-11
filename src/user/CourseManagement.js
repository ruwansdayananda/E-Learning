import React, { useState } from 'react';
import { Button, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { fetch, useFetch } from '../core/fetch';
import { Form, FormInput } from '../core/signup';
import { Alert } from '@material-ui/lab';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const useStyles = makeStyles((theme) => ({
  formContent: {
    width: '40vw',
    marginBottom: '15px',
  },
  submit: {
    margin: '20px auto',
  },
  add: {
    margin: '10px 0',
  },
}));
export const CourseManagement = () => {
  const currentSubjects = useFetch({ url: '/api/user/getSubjects' });
  const currentGrades = useFetch({ url: '/api/user/getGrades' });
  const gradeSubjectDetails = useFetch({ url: '/api/user/getGradeSubjects' });
  const classes = useStyles();
  const [addSubject, setAddSubject] = useState([]);
  const [subject, setSubject] = useState('');
  const [selectedGrade, setSelectedGrade] = useState({ grade_id: '1', grade: 'grade 6' });
  const [selectedSubject, setSelectedSubject] = useState({ subject_id: '', subject: '' });
  const [addSubjectGrade, setAddSubjectGrade] = useState([]);
  const [showSubjectAlert, setShowSubjectAlert] = useState(false);
  const [showGradeSubjectAlert, setShowGradeSubjectAlert] = useState(false);

  const gradeHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSelectedGrade({ grade_id: value, grade: name });
  };
  const subjectHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setSelectedSubject({ subject_id: value, subject: name });
  };
  return (
    <div style={{ margin: '100px' }}>
      <Divider style={{ margin: '30px 0' }} />
      <Typography variant="h4"> Add Subjects</Typography>
      <Divider style={{ margin: '30px 0' }} />
      <Form
        className={classes.form}
        initialValues={{ addSubject: '' }}
        onSubmit={async () => {
          const res = await fetch({
            url: '/api/user/addSubject',
            method: 'post',
            body: addSubject,
          });
          if (res.status === 'success') {
            setShowSubjectAlert(true);
            setTimeout(() => {
              setShowSubjectAlert(false);
            }, 3000);
            window.location.pathname = '/login';
          }
        }}
      >
        <Grid container>
          <Grid item xs={7}>
            <FormInput
              name="addSubject"
              label="Type new subject"
              type="text"
              className={classes.formContent}
              fullWidth
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.add}
              onClick={() => {
                setAddSubject([...addSubject, subject]);
              }}
            >
              Add
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className={classes.submit}>
              Submit Changes
            </Button>
          </Grid>
          {showSubjectAlert && <Alert severity="success">Subjects added successfully</Alert>}
          <Grid container>
            <Grid item xs={6} style={{ padding: '0 50px' }}>
              <Typography variant="h5"> Current Subjects</Typography>
              <Divider style={{ margin: '30px 0' }} />
              {currentSubjects.map((sub) => (
                <Card style={{ margin: '10px', padding: '10px' }} variant="outlined">
                  <Typography variant="h6"> {sub.subject}</Typography>
                </Card>
              ))}
            </Grid>
            <Grid item xs={6} style={{ padding: '0 50px' }}>
              <Typography variant="h5">Subjects to be added</Typography>
              <Divider style={{ margin: '30px 0' }} />
              {addSubject.map((sub) => (
                <Card style={{ margin: '10px', padding: '10px' }} variant="outlined">
                  <Typography variant="h6"> {sub}</Typography>
                </Card>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Form>
      <Divider style={{ margin: '30px 0' }} />
      <Typography variant="h4"> Add Subjects to Grades</Typography>
      <Divider style={{ margin: '30px 0' }} />
      <FormControl variant="outlined" className={classes.formControl} style={{ margin: '20px 0' }}>
        <InputLabel htmlFor="outlined-age-native-simple">Grade</InputLabel>
        <Select
          native
          value={selectedGrade.grade_id}
          onChange={gradeHandleChange}
          label="Select Grade"
        >
          {currentGrades.map((g) => (
            <option value={g.grade_id}>{g.grade}</option>
          ))}
        </Select>
      </FormControl>
      <Form
        className={classes.form}
        initialValues={{ addSelectedSubject: '' }}
        onSubmit={async () => {
          const res = await fetch({
            url: '/api/user/addGradeSubjects',
            method: 'post',
            body: addSubjectGrade,
          });
          if (res.status === 'success') {
            setShowGradeSubjectAlert(true);
            setTimeout(() => {
              setShowGradeSubjectAlert(false);
            }, 3000);
            window.location.pathname = '/login';
          }
        }}
      >
        <Grid container>
          <Grid item xs={7}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="outlined-age-native-simple">Subject</InputLabel>
              <Select
                native
                value={selectedSubject.subject_id}
                onChange={subjectHandleChange}
                label="Select Subject"
              >
                {currentSubjects.map((s) => (
                  <option value={s.subject_id}>{s.subject}</option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <Button
              type="button"
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.add}
              onClick={() => {
                setAddSubjectGrade([
                  ...addSubjectGrade,
                  { grade_id: selectedGrade.grade_id, subject_id: selectedSubject.subject_id },
                ]);
              }}
            >
              Add
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" className={classes.submit}>
              Submit Changes
            </Button>
          </Grid>
          {showGradeSubjectAlert && (
            <Alert severity="success">Subjects added to the grades successfully</Alert>
          )}
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h5">Subjects to be added to the selected grade</Typography>
              <Divider style={{ margin: '30px 0' }} />
              {currentGrades.map(
                (val) =>
                  val.grade_id == selectedGrade.grade_id && (
                    <Typography variant="h6">{val.grade}</Typography>
                  ),
              )}
              <Divider style={{ margin: '30px 0' }} />
              {addSubjectGrade.map((item) => (
                <Card style={{ margin: '10px', padding: '10px' }} variant="outlined">
                  {currentSubjects.map(
                    (val) =>
                      val.subject_id == item.subject_id && (
                        <Typography variant="h6">{val.subject}</Typography>
                      ),
                  )}
                </Card>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Form>
    </div>
  );
};
