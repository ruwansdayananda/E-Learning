import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { Form, FormDate, FormInput, FormSelect } from './core/signup';
import { useFetch, fetch } from './core/fetch';
import { Alert } from '@material-ui/lab';
import { useStyles } from './styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MenuItem from '@material-ui/core/MenuItem';
import * as Yup from 'yup';

export const Signup = () => {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [teachingSubject, setTeachingSubject] = useState('');
  const [, setGrade] = useState('');
  const [, setSignInAs] = useState('');

  function getGrade(event) {
    const grade = event.target.value;
    setGrade(grade);
  }
  function handleChange(event) {
    if (event.target.value === 'teacher') {
      setGrade('');
      setIsTeacher(true);
      setIsStudent(false);
    } else if (event.target.value === 'student') {
      setIsStudent(true);
      setIsTeacher(false);
      setTeachingSubject('');
    } else {
      setIsTeacher(false);
      setIsStudent(false);
      setTeachingSubject('');
      setGrade('');
    }
    setSignInAs(event.target.value);
  }
  function getTeachingSubject(event) {
    const subject = event.target.value;
    setTeachingSubject(subject);
  }
  const SignupSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Too Short!').max(50, 'Too Long!').required('Required'),
    birthday: Yup.date()
      .max('2002-12-31', 'You should be more than 18 years old!')
      .min('1910-12-31', 'Invalid age restriction!'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too Short!').max(20, 'Too Long!').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  const availableGrades = useFetch({ url: '/api/user/get-available-grades' });
  const currentSubjects = useFetch({ url: '/api/user/getSubjects' });
  // const availableSubjects = useFetch({ url: '/api/user/get-available-subjects' });
  const menuItems = [];

  for (const [index, value] of availableGrades.entries()) {
    menuItems.push(
      <MenuItem value={value.grade_id}>
        {value.grade.charAt(0).toUpperCase() + value.grade.slice(1)}
      </MenuItem>,
    );
  }
  return (
    <Grid container component="main" className={classes.root}>
      <Grid item sm={false} md={6} className={classes.loginImage} />
      <Grid item sm={12} md={6} component={Paper} elevation={6} square>
        <div className={classes.loginPaperContainer}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Form
            validationSchema={SignupSchema}
            className={classes.form}
            initialValues={{
              name: '',
              email: '',
              signInAs: '',
              grade_id: '',
              subject_id: '',
              telephone: '',
              birthday: Date.now(),
            }}
            onSubmit={async (data) => {
              console.log(data);
              const res = await fetch({
                url: '/api/user/signup',
                method: 'post',
                body: data,
              });
              if (res.status === 'success') {
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 5000);
                window.location.pathname = '/login';
              }
            }}
          >
            <FormInput name="name" label="Name" className={classes.formContent} />
            <FormDate name="birthday" label="Birthday" className={classes.formContent} />
            <FormSelect
              onChange={handleChange}
              name="signInAs"
              label="Sign In As"
              className={classes.formContent}
            >
              <MenuItem value="student">Student</MenuItem>
              <MenuItem value="teacher">Teacher</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
            </FormSelect>
            {console.log(teachingSubject)}
            {console.log(currentSubjects)}
            {isTeacher && (
              <div>
                <FormSelect
                  name="subject_id"
                  label="Teaching Subject"
                  className={classes.formContent}
                  onChange={getTeachingSubject}
                >
                  {currentSubjects.map((subject) => (
                    <MenuItem value={subject.subject_id}>{subject.subject}</MenuItem>
                  ))}
                </FormSelect>
                <FormInput
                  name="telephone"
                  label="Telephone Number"
                  className={classes.formContent}
                />
              </div>
            )}
            {isStudent && (
              <FormSelect
                name="grade_id"
                label="Grade"
                className={classes.formContent}
                onChange={getGrade}
              >
                {menuItems}
              </FormSelect>
            )}
            <FormInput name="email" label="Email" type="email" className={classes.formContent} />
            <FormInput
              type="password"
              label="Password"
              id="outlined-adornment-password"
              name="password"
              labelWidth={70}
              className={classes.formContent}
            />
            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              labelWidth={70}
              className={classes.formContent}
            />
            {showAlert && <Alert severity="success">This is a success alert — check it out!</Alert>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2"></Link>
              </Grid>
              <Grid item>
                <Link href="/login">{'Already have an account? Sign In'}</Link>
              </Grid>
            </Grid>
          </Form>
        </div>
      </Grid>
    </Grid>
  );
};
