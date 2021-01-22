//Import necessory components and libraries
import Paper from "@material-ui/core/Paper";
import React, { useState, useEffect } from "react";
import { useFetch } from "../core/fetch";
import { Form, FormInput, FormSelect } from "../core/signup";
import { fetch } from "../core/fetch";
import { Alert } from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import upload from "../images/upload.png";
import { makeStyles } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Button } from "@material-ui/core";
import * as Yup from "yup";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import NativeSelect from "@material-ui/core/NativeSelect";

//define styling object component
const useStyles = makeStyles((theme) => ({
  homePageMainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: theme.spacing(3),
  },
  uploadImage: {
    width: "30px",
    margin: "15px",
    height: "10px",
  },
  uploadFilePaper: {
    display: "flex",
    flexDirection: "column",
    padding: "5x 5px 5px 10px",
    alignItems: "center",
    marginBottom: "1px",
    width: "400px",
  },
  grid1: {
    paddingTop: "100px",
  },
  grid2: {
    alignSelf: "flex-start",
    paddingTop: "0px",
    paddingLeft: "90px",
  },
  grid3: {
    alignSelf: "flex-start",
    paddingLeft: "40px",
    direction: "row",
  },

  formContent: {
    width: "400px",
    marginBottom: "15px",
  },
  desc: {
    padding: "10px 0px 10px",
    width: "800px",
    marginBottom: "15px",
  },
  uploadcss: {
    alignSelf: "flex-end",
  },
  selectEmpty: {
    paddingLeft: theme.spacing(3),
  },
  subjectContent: {
    width: "250px",
    marginBottom: "5px",
    paddingLeft: "75px",
  },
  hr: {
    width: "1200px",
    color: "blue",
  },
}));

//main component
export const StudyMaterials = () => {

  //define states of class
  const [subject, setsubject] = useState("");
  const [usersubjects, setUsersubjects] = useState();
  const [files, setFiles] = useState([]);
  const [showAlert, setShowAlert] = useState(false);

  //call style component
  const classes = useStyles();

  //define variable constraints schema to form
  const SigninSchema = Yup.object().shape({
    subject: Yup.string().required("Required"),
    grade: Yup.string().required("Required"),
    description: Yup.string().min(10, "Too Short!").required("Required"),
  });
  //fetch user data from database at begining
  const userInformation = useFetch({ url: "/api/user/get-user-information" });
  const currentUserType = userInformation.type;
  const userSubjectGrade = useFetch({ url: "/api/user/get-user-subject" });
  const userSpecificContents = userSubjectGrade.slice(  0,  userSubjectGrade.length - 1); //for teacher-grades, for student-subjects
  const userSpecificAttribute = userSubjectGrade[userSubjectGrade.length - 1]; //for teacher-subject, gor student-grade
  console.log(userSpecificContents);
  console.log(userSpecificAttribute);

   const changeSubject = (event) => {
     setUsersubjects(event.target.value);
   };

   useEffect(() => {
     //console.log(usersubjects);
   }, [usersubjects]);


  
  const onChangeHandler = (event) => {
    if (event.target.files.length > 0) {
      if (files.length === 0) {
        setFiles([...files, event.target.files[0]]);
      } else {
        let newFile = files.filter(
          (file, index) => file.name !== event.target.files[0].name
        );
        setFiles([...newFile, event.target.files[0]]);
      }
    }
    document.getElementById("upload-file").value = "";
  };

  const removeFile = (name) => {
    let newFile = files.filter((file) => file.name !== name);
    setFiles([...newFile]);
    document.getElementById("upload-file").value = "";
  };

 
  //check current user equal teacher and render relevent component
  if (currentUserType === "teacher") {
    return (
      <div className={classes.homePageMainContainer} id="main_div">
        <Grid className={classes.grid1}>
          <Typography
            style={{ fontWeight: "bolder", color: "Blue" }}
            component="h1"
            variant="h5"
          >
            ADD STUDY MATERIALS
          </Typography>
        </Grid>
        <hr className={classes.hr} />
        <hr className={classes.hr} />
        <Grid className={classes.grid2}>
          <br />
          <Form
            validationSchema={SigninSchema}
            className={classes.form}
            initialValues={{
              subject: "",
              grade: "",
              description: "",
            }}
            onSubmit={async (data) => {
              console.log(userInformation);
              const formData = new FormData();
              formData.append("subject", data.subject);
              formData.append("grade", data.grade);
              formData.append("description", data.description);
              formData.append("fileAmount", files.length);

              for (const file of files) {
                formData.append("file", file);
              }
              const res = await fetch({
                url: "/api/user/studyMat",
                method: "post",
                body: formData,
              });
              console.log(res);
              if (res === "success") {
                alert("success");
              } else if (res === "error") {
                setShowAlert(true);
                setTimeout(() => {
                  setShowAlert(false);
                }, 3000);
              }
            }}
          >
            <FormSelect
              name="subject"
              label="Select Subbject"
              variant="filled"
              className={classes.formContent}
            >
              {userSpecificAttribute.map((subject) => {
                return (
                  <MenuItem name="Grade 6" value={subject.subject_id}>
                    {subject.subject}
                  </MenuItem>
                );
              })}
              
            </FormSelect>
            <br />

            <FormSelect
              name="grade"
              label="Select Grade"
              variant="filled"
              className={classes.formContent}
            >
              {userSpecificContents.map((grade) => {
                return (
                  <MenuItem name="Grade 6" value={grade.grade_id}>
                    {grade.grade}
                  </MenuItem>
                );
              })}

             
            </FormSelect>
            <br />

            <Paper elevation={2} className={classes.uploadFilePaper}>
              <Typography component="h4" variant="h6">
                Upload here
              </Typography>
              <label htmlFor="upload-file">
                <img
                  src={upload}
                  alt="upload image"
                  className={classes.uploadImage}
                />
              </label>
              <Paper className={classes.uploadcss}>
                <input
                  accept=".pdf,.docx"
                  id="upload-file"
                  name="document"
                  type="file"
                  onChange={onChangeHandler}
                />
              </Paper>
            </Paper>
            {files.length > 0
              ? files.map((file) => {
                  return (
                    <h4 key={file.name}>
                      {file.name}{" "}
                      <button
                        style={{ color: "red" }}
                        onClick={() => removeFile(file.name)}
                      >
                        :Remove
                      </button>
                    </h4>
                  );
                })
              : null}
            <br />
            <FormInput
              type="text"
              label="description"
              name="description"
              variant="filled"
              multiline
              rows="9"
              className={classes.desc}
            />
            {/* <FormHelperText>With visually hidden label</FormHelperText> */}
            {showAlert && <Alert severity="error">Upload failed</Alert>}
            <br />
            <Button
              type="submit"
              style={{ width: "400px" }}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ADD
            </Button>
          </Form>
        </Grid>
      </div>
    );
  } 
  
  //check user equal to student and render relevent page to student
  else if (currentUserType === "student") {
    return (
      <div className={classes.homePageMainContainer} id="main_div">
        <Grid className={classes.grid1}>
          <Typography
            style={{ fontWeight: "bolder", color: "Blue" }}
            component="h1"
            variant="h5"
          >
            VIEW STUDY MATERIALS
          </Typography>
        </Grid>
        <br />
        <hr className={classes.hr} style={{ width: "100%" }} />
        <hr className={classes.hr} style={{ width: "100%" }} />
        <br />
        <br />
        <Grid className={classes.grid3}>
          <label
            style={{
              fontWeight: "bolder",
              color: "#080A74",
              fontSize: "25px",
              paddingRight: "10px",
            }}
          >
            Select Subject :
          </label>

          <NativeSelect
            value={usersubjects}
            onChange={changeSubject}
            className={classes.subjectContent}
            variant="filled"
            style={{
              fontWeight: "bolder",
              fontSize: "20px",
            }}
          >
            <option aria-label="None" value="" />
            {userSubjectGrade.map((subject) => {
              return (
                <option value={subject.subject_id}>{subject.subject}</option>
              );
            })}
          </NativeSelect>
          <label
            style={{
              fontWeight: "bolder",
              color: "#080A74",
              fontSize: "25px",
              paddingLeft: "50px",
            }}
          >
            You are in : {userSpecificAttribute.grade}
          </label>
          <br />
          {/* </Form> */}
          <br />
          <br />
        </Grid>
        <hr className={classes.hr} style={{ width: "100%" }} />
        <hr className={classes.hr} style={{ width: "100%" }} />
      </div>
    );
  }
};
