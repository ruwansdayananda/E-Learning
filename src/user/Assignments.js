import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import user1 from '../images/user1.jpg';
import { fetch, useFetch } from '../core/fetch';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios, { post } from 'axios';
import React, { useState, Fragment } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Form, FormInput, FormDate, FormDateAssignment } from '../core/signup';
import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import * as Yup from 'yup';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import dayjs from 'dayjs';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Fab from '@material-ui/core/Fab';
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone';
import NoteAddTwoToneIcon from '@material-ui/icons/NoteAddTwoTone';

//Used for styling
const useStyles = makeStyles((theme) => ({
  homePageMainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: '#005662',
    overflowY: 'auto',
    overflowX: 'hidden',
    height: '100vh',
    margin: 0,
  },
  homePageMainContainer2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(10),
    paddingBottom: theme.spacing(3),
  },
  mainImage: {
    padding: '100px 5% 0',
    alignContent: 'center',

    // backgroundImage: `url(${user1})`,
    backgroundSize: 'stretched',
    backgroundPosition: 'center',
  },
  mainHeading: {
    textShadow: '2px 2px 4px #000000',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  root: {
    width: '50rem',
    background: 'white',
    borderRadius: '30',
  },
  uploadButton: {
    backgroundColor: '#00838e',
    color: 'white',
  },

  submitButton: {
    backgroundColor: '#4fb3be',
    color: 'white',
  },

  toggleGroup: {
    backgroundColor: 'white',
    position: 'relative',
    right: '-75px',
  },

  toggleIcon: {
    color: '#005662',
  },

  cardSubjectTitle: {
    color: '#005662',
    fontWeight: 500,
  },

  cardAssignmentDesc: {
    color: '#002f6c',
  },

  backImage: {
    background: `url(${user1})`,
    backgroundSize: '400%',
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },

  //The main component of the file (Other components are rendered by this)

  button: {
    margin: '5%',
  },
  formControl: {
    minWidth: 120,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  description: {
    minWidth: 500,
    boxSizing: 200,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },

  formContent: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  submit: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    height: 50,
    fontSize: 20,
    letterSpacing: 20,
    fontWeight: 999,
  },
  root: {
    marginTop: theme.spacing(2),
    width: '38rem',
    background: 'white',
    borderRadius: '30',
  },
  maincard: {
    marginTop: theme.spacing(5),
    width: '43rem',
    background: 'gray',
    borderRadius: '30',
  },
  uploadButton: {
    backgroundColor: '#00838e',
    color: 'white',
  },

  submitButton: {
    backgroundColor: '#4fb3be',
    color: 'white',
  },
  cardSubjectTitle: {
    color: '#005662',
    fontWeight: 500,
  },
  cardPreviewTitle: {
    color: '#C70039',
    fontWeight: 500,
  },
  mainTitle: {
    marginTop: theme.spacing(2),
    fontFamily: `cursive`,
    fontSize: 30,
    fontWeight: 999,
    letterSpacing: 6,
    color: '#005662',
    fontSpace: 5,
  },

  cardAssignmentDesc: {
    color: '#002f6c',
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function create_UUID() {
  let dt = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
}

export const Assignments = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [ShowAlert_date, setShowAlert_date] = useState(false);
  const userInformation = useFetch({ url: '/api/user/get-user-information' });

  // Assignment upload code /////

  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadFile, setUploadFile] = useState({});
  const [grade_id, setGradeId] = useState('');

  //// teacher states ////////////
  const [title_, setTitle] = useState('Title of the assignment');
  const [description_, setDescription] = useState('Description of the assignment');
  const [date_, setDate_] = useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [submitted, setSubmitted] = useState(false);
  const currentUserType = userInformation.type;

  const [alignment, setAlignment] = React.useState('due');
  const [disableController, setDisableController] = React.useState(true);
  const classes = useStyles();
  const handleAlignment = (event, newAlignment) => {
    if (alignment != newAlignment) {
      console.log(newAlignment);
      setAlignment(newAlignment);
      setDisableController(!disableController);
    }
  };
  // const subjetInformation ={}
  // const availableGrades = {}

  if (currentUserType === 'teacher') {
    const teacherInfo = GetInfoTeacher();

    const subjetInformation = teacherInfo.subjetInformation;
    const availableGrades = teacherInfo.availableGrades;

    const dt = new Date();
    dt.setDate(dt.getDate() - 1);

    //////////////// taking available grade ids ///////////////////////

    const availableGradeIds = [];
    availableGrades.forEach((element) => {
      availableGradeIds.push(element.grade_id);
    });

    //console.log(availableGradeIds);

    const AssignmentSchema = Yup.object().shape({
      title: Yup.string().min(8, 'Too Short!').max(100, 'Too Long!').required('Required'),
      description: Yup.string().min(8, 'Too Short!').max(500, 'Too Long!').required('Required'),
    });

    const onChange = (e) => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    };

    const handleChange = (event) => {
      setShowAlert(false);
      setGradeId(event.target.value);
    };

    const changeDescription = (event) => {
      if (event.target.value != '') {
        setDescription(event.target.value);
      } else {
        setDescription('Description of the assignment');
      }
    };

    const changeDate = (date) => {
      //console.log(dayjs(date).format('YYYY-MM-DD'))
      if (dayjs(new Date()).format('YYYY-MM-DD') <= dayjs(date).format('YYYY-MM-DD')) {
        setShowAlert_date(false);
      }
      setDate_(dayjs(date).format('YYYY-MM-DD'));
    };

    const changeText = (event) => {
      if (event.target.value != '') {
        setTitle(event.target.value);
      } else {
        setTitle('Title of the assignment');
      }
    };

    const menuItems = [];

    for (const [index, value] of availableGrades.entries()) {
      menuItems.push(<MenuItem value={value.grade_id}>{value.grade}</MenuItem>);
    }

    return (
      <div className={classes.homePageMainContainer2}>
        <Grid item container elevation={6} square>
          <Form
            id="form_assignment"
            validationSchema={AssignmentSchema}
            className={classes.form}
            initialValues={{
              title: '',
              description: '',
            }}
            onSubmit={async (data) => {
              if (grade_id != '' && dayjs(new Date()).format('YYYY-MM-DD') <= date_) {
                data['assignment_id'] = create_UUID();
                data['due_date'] = date_;
                data['user_email'] = userInformation.email;
                data['subject_id'] = subjetInformation.subject_id;
                data['grade_id'] = grade_id;
                data['upload_date'] = new Date();

                if (file != '') {
                  data['file_type'] = fileName.split('.').pop();
                  data['file_size'] = file.size;
                  data['upload_id'] = create_UUID();
                  data['file_name'] = `${data['upload_id']}.${data['file_type']}`;
                  data['location'] = 'server/uploads/';
                  data['mimetype'] = file.type;
                } else {
                  data['file_name'] = '';
                  data['file_type'] = '';
                  data['file_size'] = '';
                  data['upload_id'] = '';
                  data['location'] = '';
                  data['mimetype'] = '';
                }
                console.log(data);
                const res = await fetch({
                  url: '/api/user/assingmentsubmit',
                  method: 'post',
                  body: data,
                });
                console.log(res);

                if (res.status === 'success') {
                  if (file != '') {
                    const formData = new FormData();

                    formData.append('file', file, data['file_name']);

                    try {
                      const res = await fetch({
                        url: '/api/user/upload',
                        method: 'post',
                        body: formData,
                      });

                      //const { fileName, filePath } = res.data;

                      // setUploadFile({ fileName, filePath })

                      // window.location.pathname = '/';
                      setSubmitted(true);
                    } catch (err) {
                      if (err.response.status === 500) {
                        console.log('There is a problem with the server');
                      } else {
                        console.log(err.response.data.msg);
                      }
                    }
                  } else {
                    setSubmitted(true);
                  }
                } else if (res.status === 'error') {
                  console.log('eror');
                }

                return false;
              } else if (grade_id === '') {
                setShowAlert(true);
                return false;
              } else {
                setShowAlert_date(true);
                return false;
              }
            }}
          >
            <Typography variant="h6" gutterBottom component="h6" className={classes.mainTitle}>
              Upload Assignments
            </Typography>

            <FormInput
              name="title"
              label="Title"
              onChange={changeText}
              className={classes.formContent}
            />

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Grade</InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                value={grade_id}
                onChange={handleChange}
              >
                {menuItems}
              </Select>
            </FormControl>

            <TextField
              label="Subject"
              variant="outlined"
              className={classes.formContent}
              InputProps={{ readOnly: true, defaultValue: subjetInformation.subject }}
            />
            <KeyboardDatePicker
              name="due_date"
              margin="normal"
              value={date_}
              id="date-picker-dialog"
              label="Due date"
              format="YYYY-MM-DD"
              variant="inline"
              onChange={changeDate}
              className={classes.formContent}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <FormInput
              name="description"
              label="Description"
              onChange={changeDescription}
              multiline
              className={classes.description}
            />
            <input type="file" className={classes.formContent} id="file" onChange={onChange} />

            {showAlert && (
              <Alert className={classes.formContent} severity="error">
                <AlertTitle>Invalid Grade !</AlertTitle>
                <strong>Please add a valid grade ..</strong>
              </Alert>
            )}
            {ShowAlert_date && (
              <Alert className={classes.formContent} severity="error">
                <AlertTitle>Invalid Due date !</AlertTitle>
                <strong>Please add a valid due date ..</strong>
              </Alert>
            )}

            {submitted && (
              <div>
                <Alert className={classes.formContent} severity="success">
                  <AlertTitle>Submission Successful !</AlertTitle>
                  <strong>Add another or go home ..</strong>
                </Alert>
                <Fab
                  variant="extended"
                  className={classes.formContent}
                  onClick={() => {
                    window.location.pathname = '/';
                  }}
                >
                  {' '}
                  <HomeTwoToneIcon className={classes.extendedIcon} /> Home{' '}
                </Fab>
                <Fab
                  variant="extended"
                  className={classes.formContent}
                  onClick={() => {
                    window.location.reload(false);
                  }}
                >
                  {' '}
                  <NoteAddTwoToneIcon className={classes.extendedIcon} /> Add another
                </Fab>
              </div>
            )}

            <Card className={classes.maincard}>
              <CardContent>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="h2"
                  className={classes.cardPreviewTitle}
                >
                  Preview of your upload
                </Typography>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography
                      variant="h5"
                      gutterBottom
                      component="h2"
                      className={classes.cardSubjectTitle}
                    >
                      {title_}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                      {subjetInformation.subject.charAt(0).toUpperCase() +
                        subjetInformation.subject.slice(1)}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                      className={classes.cardAssignmentDesc}
                    >
                      {description_}
                    </Typography>
                    <Box m={0.5} />
                    <Alert severity="error">This assignment will be due on {date_}.</Alert>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      component="label"
                      color="primary"
                      className={classes.uploadButton}
                    >
                      Download Assignment
                    </Button>
                    <Button
                      variant="contained"
                      component="label"
                      color="primary"
                      className={classes.uploadButton}
                    >
                      Upload File
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      component="label"
                      className={classes.submitButton}
                    >
                      Submit
                    </Button>
                  </CardActions>
                </Card>
              </CardContent>
            </Card>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Submit
            </Button>
          </Form>
        </Grid>
      </div>
    );
  }
  if (currentUserType === 'student') {
    console.log('Hi');
    return (
      <div>
        <div className={classes.backImage}></div>
        <div className={classes.homePageMainContainer}>
          <Grid container spacing={3} className={classes.mainImage}>
            <Grid item xs={4}>
              <></>
            </Grid>
            <Grid xs={4}></Grid>
            <Grid xs={4}>
              <ToggleButtonGroup
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
                className={classes.toggleGroup}
              >
                <ToggleButton
                  selected
                  value="due"
                  aria-label="dueAssignments"
                  className={classes.toggleIcon}
                  disabled={disableController}
                >
                  <ErrorIcon />
                </ToggleButton>
                <ToggleButton
                  value="complete"
                  aria-label="completedAssignments"
                  className={classes.toggleIcon}
                  disabled={!disableController}
                >
                  <CheckCircleIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>
          {AssignmentToggleController(alignment)}
        </div>
      </div>
    );
  }
};

const DueAssignments = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={4}></Grid>
        <Grid xs={4}>
          <Typography variant="h3" gutterBottom className={classes.mainHeading}>
            Due Assignments
          </Typography>
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>
      {DueAssignmentCards()}
    </div>
  );
};

const CompleteAssignments = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <></>
        </Grid>
        <Grid xs={4}>
          <Typography variant="h3" gutterBottom className={classes.mainHeading}>
            Completed Assignments
          </Typography>
        </Grid>
        <Grid xs={4}></Grid>
      </Grid>
      {CompletedAssignmentCards()}
    </div>
  );
};

const AssignmentToggleController = (alignment) => {
  if (alignment == 'due') {
    return DueAssignments();
  }
  if (alignment == 'complete') {
    return CompleteAssignments();
  }
};

const DueAssignmentCards = () => {
  const assignments = useFetch({ url: '/api/user/assignments' });
  console.log(assignments[0]);
  const classes = useStyles();
  const list = [];

  for (const assignment of assignments) {
    const values = {
      isNoFile: true,
    };
    if (assignment.upload_id != null) {
      values.isNoFile = false;
    }
    list.push(
      <>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              component="h2"
              className={classes.cardSubjectTitle}
            >
              {assignment.subject.charAt(0).toUpperCase() + assignment.subject.slice(1)}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              {assignment.title}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              className={classes.cardAssignmentDesc}
            >
              {assignment.description}
            </Typography>
            <Box m={0.5} />
            <Alert severity="error">This assignment will be due on {assignment.due_date}.</Alert>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              component="label"
              color="primary"
              className={classes.uploadButton}
              onClick={() => {
                DownloadAssignment(assignment.upload_id);
              }}
              hidden={values.isNoFile}
            >
              Download Assignment
            </Button>
            <Button
              variant="contained"
              component="label"
              color="primary"
              className={classes.uploadButton}
            >
              Upload File
              <input
                type="file"
                hidden
                onChange={(e) => {
                  onChange(e);
                }}
              />
            </Button>
            <Button
              variant="contained"
              color="primary"
              component="label"
              className={classes.submitButton}
              onClick={() => {
                OnClick(assignment);
              }}
            >
              Submit
            </Button>
          </CardActions>
        </Card>
        <Box m={2} />
      </>,
    );
  }

  return <div>{list}</div>;
};

let temp_files;
const onChange = async (e) => {
  const files = e.target.files;
  temp_files = files;
};

const OnClick = async (assignment) => {
  if (temp_files != undefined) {
    const files = temp_files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('assignment', JSON.stringify(assignment));

    await axios.post('/api/user/upload-file', data).then((res) => {
      console.log(res);
    });
    alert('Submission Successful ! ');
    window.location.reload(false);
  } else {
    alert('Upload A File To Submit ! ');
  }
};
const GetInfoTeacher = () => {
  const list = [];
  const subjetInformation = useFetch({ url: '/api/user/get-teacher-subjects' });
  const availableGrades = useFetch({ url: '/api/user/get-available-grades' });
  return {
    subjetInformation: subjetInformation,
    availableGrades: availableGrades,
  };
};
const CompletedAssignmentCards = () => {
  const assignments = useFetch({ url: '/api/user/completed-assignments' });
  console.log(assignments);
  const classes = useStyles();
  const list = [];
  for (const assignment of assignments) {
    list.push(
      <>
        <Card className={classes.root}>
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              component="h2"
              className={classes.cardSubjectTitle}
            >
              {assignment.subject.charAt(0).toUpperCase() + assignment.subject.slice(1)}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              {assignment.title}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              component="p"
              className={classes.cardAssignmentDesc}
            >
              {assignment.description}
            </Typography>
            <Box m={0.5} />

            <Alert severity="success">Assignment has been submitted.</Alert>
          </CardContent>
        </Card>
        <Box m={2} />
      </>,
    );
  }

  return <div>{list}</div>;
};

const DownloadAssignment = async (upload_id) => {
  //  const res = await fetch({
  //  url: '/api/user/filelocation',
  //  method: 'post',
  //  body: {upload_id:upload_id},
  //   });
  //   const file_name = res.file_name;

  openInNewTab(`http://localhost:8000/api/user/getFile2/${upload_id}`);
};

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
  if (newWindow) newWindow.opener = null;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////

//console.log(availableGrades)
//console.log(subjetInformation)
