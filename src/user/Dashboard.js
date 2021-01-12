import Typography from '@material-ui/core/Typography';
import {Button, makeStyles} from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { useFetch } from '../core/fetch';
import user1 from "../images/user1.jpg";

const useStyles = makeStyles((theme) => ({
  homePageMainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(3),
  },
  mainImage: {
    display: 'flex',
    flexDirection: 'column',
    padding: '150px 5% 0',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${user1})`,
    backgroundSize: 'stretched',
    backgroundPosition: 'center',
  },
  homeHeading: {
    fontSize: '80px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mainHeading: {
    textShadow: '2px 2px 4px #000000',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainParagraph: {
    color: 'white',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  button: {
    margin: '5%',
  },
}));
export const Dashboard = () => {
  const classes = useStyles();
  const userInformation = useFetch({ url: '/api/user/get-user-information' });
  const currentUserType = userInformation.type;
  if (currentUserType === 'student') {
    return (
      <div className={classes.homePageMainContainer}>
        <Grid item container elevation={6} square className={classes.mainImage}>
          <Typography variant="h1" gutterBottom className={classes.mainHeading}>
            Welcome to E-Learning Management System
          </Typography>
          <Typography variant="h6" gutterBottom className={classes.mainParagraph}>
            <AssignmentTurnedInIcon className={classes.homeContentIcon} />
            Manage Your School Study Material From Home
            <br />
            <AssignmentTurnedInIcon className={classes.homeContentIcon} />
            Manage Your Home Work Effectively
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={<InputIcon />}
            href="#"
          >
            Explore More
          </Button>
        </Grid>
      </div>
    );
  } else {
    return (
      <div className={classes.homePageMainContainer}>
        <Grid item container elevation={6} square className={classes.mainImage}>
          <Typography variant="h1" gutterBottom className={classes.homeHeading}>
            Welcome to E-Learning Management System
          </Typography>
          <Typography variant="h6" gutterBottom className={classes.homeParagraph}>
            <AssignmentTurnedInIcon className={classes.homeContentIcon} />
            Manage Your School Study Material From Home
            <br />
            <AssignmentTurnedInIcon className={classes.homeContentIcon} />
            Manage Your Home Work Effectively
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={<InputIcon />}
            href="#"
          >
            Explore More
          </Button>
        </Grid>
      </div>
    );
  }
};
