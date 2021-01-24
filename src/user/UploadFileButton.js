import React, { useState } from 'react';
import InputIcon from '@material-ui/icons/Input';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { fetch } from '../core/fetch';
import {Button, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
  inputButton: {
    padding: '5px',
  }

}));
export const UploadFileButton = (props) => {
  const classes = useStyles();
  const [file, setFile] = useState('');
  const [alert, setAlert] = useState(false);
  const [filename, setFilename] = useState('Choose File');
  const [message, setMessage] = useState('');

  function getExtension(filename) {
    const i = filename.lastIndexOf('.');
    return i < 0 ? '' : filename.substr(i);
  }
  const handleClose = () => {
    setAlert(false);
  };
  function onChangeHandler(event) {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  }
  const location = `${props.type}/${props.userType}/${props.grade}/${props.userEmail}`

  function onClickHandler() {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', props.type);
    formData.append('userType', props.userType);
    formData.append('grade', props.grade);
    formData.append('subject', props.subject);
    formData.append('userEmail', props.userEmail);
    // fetch({
    //   url: '/api/user/uploadData',
    //   method: 'post',
    //   body: formData,
    // });
    fetch({
      url: '/api/user/upload',
      method: 'post',
      body: formData,
    }).then((res) => {
      const { filePath } = res;
      if (res.status === 'success') {
        setAlert(true);
        setMessage(`File Uploaded: ${filename}`);
      } else {
        setMessage('There was a problem with uploading. Try Again!');
      }
    });
  }
  return (
    <div>
        <Grid container>
            <Grid item xs={6}>
        <input
            className={classes.inputButton}
            accept=".pdf,.docx"
            id="upload-file"
            name="btn-upload"
            type="file"
            onChange={onChangeHandler} />
            </Grid>
        <Snackbar open={alert} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="success" variant="filled">
            {message}
          </Alert>
        </Snackbar>
          <Grid item xs={6}>
        <Button
            variant="contained"
            color="secondary"
            size="medium"
            onClick={onClickHandler}
            component="span" >
          Upload
        </Button>
          </Grid>
          </Grid>
    </div>
  );
}
