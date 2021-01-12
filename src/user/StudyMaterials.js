import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import upload from "../images/upload.png";
import {UploadFileButton} from "./UploadFileButton";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    homePageMainContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: theme.spacing(3),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '50vw',
        padding: '20px 5vw 10vh',
    },
    uploadImage: {
        width: '10vw',
        margin: '20px',
    },
    uploadFilePaper: {
        display: 'flex',
        flexDirection: 'column',
        padding: '5%',
        alignItems: 'center',
        marginBottom: '20px',
    },
}));

export const StudyMaterials = () => {
  const classes = useStyles();
  return (
    <div className={classes.homePageMainContainer}>
      <Paper elevation={10} className={classes.paper}>
        <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
          What would you like to translate ?
        </Typography>
        <Paper elevation={3} className={classes.uploadFilePaper}>
          <label htmlFor="upload-file">
            <img src={upload} alt="upload image" className={classes.uploadImage} />
          </label>
         <UploadFileButton/>
        </Paper>
      </Paper>
    </div>
  );
};
