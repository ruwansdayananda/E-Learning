import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import upload from "../images/upload.png";
import {UploadFileButton} from "./UploadFileButton";
import {makeStyles} from "@material-ui/core";
import {useFetch} from "../core/fetch";
import { Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
}));

export const StudyMaterials = () => {
  // const classes = useStyles();
  // const type = 'assignment';
  // const userType = 'student';
  // const data = useFetch({ url: `/api/user/getFileInfo/?type=${type}&userType=${userType}&other=''` });
  return (
      <div></div>
    // <div style={{marginTop: '100px'}}>
    //      <UploadFileButton type="assignments" userType='student' subject='Science' grade='Grade 5' userEmail='180424d@uom.lk'/>
    //      data.map((item,index)){
    //          <a href={`http://localhost:8000/api/user/getFile/${item.upload_id}`}>Download</a>
    //     }
    // </div>
  );

};
