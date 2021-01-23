import React, { useState, Fragment } from 'react';
import { Alert } from '@material-ui/lab';
import { Form, FormInput, FormDate } from '../core/signup';
import { Button, makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { useFetch } from '../core/fetch';
import { fetch } from '../core/fetch';
import * as Yup from "yup";
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';


const useStyles = makeStyles((theme) => ({
  homePageMainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(10),
    paddingBottom: theme.spacing(3),
  },

  button: {
    margin: '5%',
  },
  formControl: {
    
    minWidth: 120,
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5)
  },

  formContent:{
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(5)
  }
}));

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}



export const Assignments = () => {

  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const userInformation = useFetch({ url: '/api/user/get-user-information' });

  // Assignment upload code /////

  const [file, setFile] = useState('');
  const [fileName, setFileName] = useState('Choose File');
  const [uploadFile, setUploadFile] = useState({})
  const [grade_id, setGradeId] = useState('')


  const currentUserType = userInformation.type;


  const subjetInformation = useFetch({ url: '/api/user/get-teacher-subjects' });
  const availableGrades = useFetch({ url: '/api/user/get-available-grades' });
  //console.log(availableGrades)
  //console.log(subjetInformation)




  if (currentUserType === 'teacher') {
    var dt = new Date();
    dt.setDate(dt.getDate() - 1);

    //////////////// taking available grade ids ///////////////////////

    var availableGradeIds = [];
    availableGrades.forEach(element => {
      availableGradeIds.push(element.grade_id)
    });

    //console.log(availableGradeIds);

    const AssignmentSchema = Yup.object().shape({

      due_date: Yup.date('This is not a valid date!').min(dt, 'Minimum due date is today !').required('Required'),
      title: Yup.string().min(8, 'Too Short!').max(30, 'Too Long!').required('Required'),
      description: Yup.string().min(8, 'Too Short!').max(150, 'Too Long!').required('Required'),


    });



    const onChange = e => {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }



    const handleChange = (event) => {
      setGradeId(event.target.value);

    };

    var menuItems = []

    for (const [index, value] of availableGrades.entries()) {

      menuItems.push(<MenuItem value={value.grade_id}>{value.grade}</MenuItem>)
    }

    return (



      <div className={classes.homePageMainContainer}>
        <Grid item container elevation={6} square >

          <Form
            id="form_assignment"
            validationSchema={AssignmentSchema}
            className={classes.form}
            initialValues={{
              title: '',
              description: '',
              due_date: new Date(),

            }}
            onSubmit={async (data) => {


              data['assignment_id'] = create_UUID();

              data['user_email'] = userInformation.email;
              data['subject_id'] = subjetInformation.subject_id;
              data['grade_id'] = grade_id;
              data['upload_date'] = new Date();


              if (file != '') {

                data['file_type'] = fileName.split('.').pop();
                data['file_size'] = file.size;
                data['upload_id'] = create_UUID();
                data['file_name'] = data['upload_id'] + '.' + data['file_type'];
                data['location'] = 'server/uploads/';
                data['mimetype'] = file.type;
              } else {
                data['file_name'] = '';
                data['file_type'] = '';
                data['file_size'] = '';
                data['upload_id'] = '';
                data['location'] = '';
                data['mimetype'] = ''
              }
              console.log(data)
              const res = await fetch({
                url: '/api/user/assingmentsubmit',
                method: 'post',
                body: data,
              });
              console.log(res);

              if (res.status === 'success') {

                if (file != '') {

                  const formData = new FormData();

                  formData.append('file', file, data['file_name'])


                  try {

                    const res = await fetch({
                      url: '/api/user/upload',
                      method: 'post',
                      body: formData,
                    });

                    //const { fileName, filePath } = res.data;

                    // setUploadFile({ fileName, filePath })

                    // window.location.pathname = '/';

                  } catch (err) {
                    if (err.response.status === 500) {
                      console.log('There is a problem with the server')
                    } else {
                      console.log(err.response.data.msg)
                    }
                  }

                }

              } else if (res.status === 'error') {
                console.log('errrrrrrrrrrror')
              }



            }

            }

          >

            <FormInput name="title" label="Title" className={classes.formContent} />

            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="demo-simple-select-outlined-label">Grade</InputLabel>
              <Select labelId="demo-simple-select-outlined-label" id="demo-simple-select-outlined" value={grade_id} onChange={handleChange}>
                {menuItems}
              </Select>
            </FormControl>

            <TextField label="Subject" variant="outlined" className={classes.formContent} InputProps={{ readOnly: true, defaultValue: subjetInformation.subject, }} />
            <FormDate name="due_date" label="Due date" className={classes.formContent} />
            
            <FormInput type="file" className="form-control-file" id="file" onChange={onChange} />
            <label for="file" className={classes.formContent} >{fileName}</label>
            <FormInput name="description" label="Description" multiline className={classes.formContent} />





            {showAlert && <Alert severity="error">Invalid Details</Alert>}
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

};
