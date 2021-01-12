import React, { useState } from 'react';
import InputIcon from '@material-ui/icons/Input';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { fetch } from '../core/fetch';
import {Button, makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: '5%',
  },
}));
export const UploadFileButton = () => {
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

  function onClickHandler() {
    const formData = new FormData();
    formData.append('file', file);
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
      <input
        accept=".pdf,.docx"
        id="upload-file"
        type="file"
        onChange={onChangeHandler}
      />
      <Snackbar open={alert} autoHideDuration={2000} onClose={handleClose}>
        <Alert severity="success" variant="filled">
          {message}
        </Alert>
      </Snackbar>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        className={classes.button}
        startIcon={<InputIcon />}
        onClick={onClickHandler}
        >
        Upload File
    </Button>
    </div>
  );
}
