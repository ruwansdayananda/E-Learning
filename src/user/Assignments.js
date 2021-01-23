import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import user1 from "../images/user1.jpg";
import { fetch,useFetch } from '../core/fetch';
import Alert from '@material-ui/lab/Alert';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ErrorIcon from '@material-ui/icons/Error';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import axios,{post} from 'axios';


//Used for styling
const useStyles = makeStyles((theme) => ({
  homePageMainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background:'#005662',
    overflowY:'auto',
    overflowX:'hidden',
    height:'100vh',
    margin:0,
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
    width:"50rem",
    background:"white",
    borderRadius:"30",
  },
  uploadButton:{
    backgroundColor:'#00838e',
    color:'white',
  },

  submitButton:{
    backgroundColor:'#4fb3be',
    color:'white',
  },

  toggleGroup:{
    backgroundColor:'white',
    position:'relative',
    right:'-75px',
  },

  toggleIcon:{
    color:'#005662',
  },

  cardSubjectTitle:{
    color:'#005662',
    fontWeight:500,
  },

  cardAssignmentDesc:{
    color:'#002f6c',
  },
  
  backImage:{
    background: `url(${user1})`,
    backgroundSize:'400%',
  },
  alert: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },


}));


//The main component of the file (Other components are rendered by this)
export const Assignments = () => {


  const [alignment, setAlignment] = React.useState('due');
  const [disableController,setDisableController]= React.useState(true);
  const classes = useStyles();
  const handleAlignment = (event, newAlignment) => {
    if(alignment!=newAlignment){
    console.log(newAlignment);
    setAlignment(newAlignment);
    setDisableController(!disableController);

  }

  


  };
  
  const userInformation = useFetch({ url: '/api/user/get-user-information' });
  const currentUserType = userInformation.type;
  if (currentUserType === 'student'){
    return(<div><div className={classes.backImage}></div><div className={classes.homePageMainContainer}>
      <Grid container spacing={3} className={classes.mainImage}>
      <Grid item xs={4} >
        <></>                                                                                              
      </Grid>
      <Grid xs={4}>
           </Grid>
        <Grid xs={4} ><ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
          className={classes.toggleGroup}
        >
          <ToggleButton selected value="due" aria-label="dueAssignments" className={classes.toggleIcon} disabled={disableController}>
            <ErrorIcon />
          </ToggleButton>
          <ToggleButton value="complete" aria-label="completedAssignments" className={classes.toggleIcon} disabled={!disableController}>
            <CheckCircleIcon />
          </ToggleButton>
        </ToggleButtonGroup></Grid>
          </Grid>
          {AssignmentToggleController(alignment)} 
        </div></div>);

  
  }}


const DueAssignments = ()=>{

  const classes = useStyles();
    return (
      <div>
        <Grid container alignItems="center">
        <Grid item xs={4} >                                                                                     
        </Grid>
        <Grid xs={4}>
        <Typography variant="h3" gutterBottom className={classes.mainHeading}>
              Due Assignments
            </Typography>  
        </Grid>
        <Grid xs={4} ></Grid>
          </Grid>
          {DueAssignmentCards()} 
        </div>
      );

}

const CompleteAssignments = ()=>{
  const classes = useStyles();
    return (
      <div>
        <Grid container alignItems="center">
        <Grid item xs={4} >
          <></>                                                                                              
        </Grid>
        <Grid xs={4}>
        <Typography variant="h3" gutterBottom className={classes.mainHeading}>
              Completed Assignments
            </Typography>  
        </Grid>
        <Grid xs={4} ></Grid>
          </Grid>
          {CompletedAssignmentCards()} 
        </div>
      );
}

const AssignmentToggleController = (alignment)=>{
  if(alignment=='due'){
    return(DueAssignments());
  }
  if(alignment=='complete'){
    return(CompleteAssignments());
  }
}


const DueAssignmentCards = ()=>{
  const assignments=useFetch({ url: '/api/user/assignments' });
  console.log(assignments[0]);
  const classes = useStyles();
  const list = [];

  for(const assignment of assignments){
    const values={
      isNoFile:true,
    }
    if(assignment.upload_id!=null){
      values.isNoFile = false;
    }
    list.push(<>
    <Card className={classes.root}>
        <CardContent>
          <Typography   variant="h4" gutterBottom component="h2" className={classes.cardSubjectTitle}>
            {assignment.subject.charAt(0).toUpperCase()+assignment.subject.slice(1)}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2" >
            {assignment.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.cardAssignmentDesc}>
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
  className = {classes.uploadButton}
  onClick={ ()=>{DownloadAssignment(assignment.upload_id)}}
  hidden={values.isNoFile}
>
  Download Assignment
</Button>
      <Button
  variant="contained"
  component="label"
  color="primary"
  className = {classes.uploadButton}
>
  Upload File
  <input
    type="file"
    hidden
    onChange = {(e)=>{onChange(e)}}
    
  />
</Button>
        <Button   variant="contained"
        color = "primary"
  component="label" className={classes.submitButton}
  onClick={()=>{OnClick(assignment)}}
  >
          Submit
        </Button>
      </CardActions>
    </Card><Box m={2} /></>)
  }
  
  return(<div>{list}</div>);


}



let temp_files;
const onChange =async (e)=>{
  let files = e.target.files;
  temp_files = files;
}



const OnClick =async (assignment)=>{
  if(temp_files!=undefined){
  let files = temp_files;
  let data = new FormData();
  data.append('file',files[0],);
  data.append('assignment',JSON.stringify(assignment))
 
  await axios.post('/api/user/upload-file',data).then(res=>{console.log(res)});
  alert("Submission Successful ! ");
  window.location.reload(false);}
  else{
    alert("Upload A File To Submit ! ");
  }
  

}

const CompletedAssignmentCards = ()=>{
  const assignments= useFetch({ url: '/api/user/completed-assignments' });
  console.log(assignments);
  const classes = useStyles();
  const list = [];
  for(const assignment of assignments){
    list.push(<>
    <Card className={classes.root}>
        <CardContent>
          <Typography   variant="h4" gutterBottom component="h2" className={classes.cardSubjectTitle}>
            {assignment.subject.charAt(0).toUpperCase()+assignment.subject.slice(1)}
          </Typography>
          <Typography gutterBottom variant="h6" component="h2" >
            {assignment.title}
          </Typography>
          <Typography variant="body1" color="textSecondary" component="p" className={classes.cardAssignmentDesc}>
           {assignment.description}
          </Typography>
          <Box m={0.5} />

          <Alert severity="success">Assignment has been submitted.</Alert>
        </CardContent>
    </Card><Box m={2} /></>)
  }
  
  return(<div>{list}</div>);

}

const DownloadAssignment=async (upload_id)=>{
  //  const res = await fetch({
  //  url: '/api/user/filelocation',
  //  method: 'post',
  //  body: {upload_id:upload_id},
  //   });
  //   const file_name = res.file_name;

  
    openInNewTab("http://localhost:8000/api/user/getFile/"+upload_id);

}

const openInNewTab = (url) => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////


