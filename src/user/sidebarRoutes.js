import React from 'react';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import GradeIcon from '@material-ui/icons/Grade';
import PeopleIcon from '@material-ui/icons/People';
import BallotIcon from '@material-ui/icons/Ballot';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export default {
  student: [
    { to: '/', text: 'Home', Icon: <HomeIcon /> },
    { to: '/assignments', text: 'Assignments', Icon: <AssignmentIcon /> },
    { to: '/studyMaterials', text: 'Study Materials', Icon: <FileCopyIcon /> },
    { to: '/grades', text: 'Grades', Icon: <GradeIcon /> },
    // { to: '/enrollment', text: 'Enrollment', Icon: <AddCircleOutlineIcon /> },
  ],
  teacher: [
    { to: '/assignments', text: 'Assignments', Icon: <AssignmentIcon /> },
    { to: '/studyMaterials', text: 'Study Materials', Icon: <FileCopyIcon /> },
    { to: '/gradeStudents', text: 'Grade Students', Icon: <PeopleIcon /> },
  ],
  admin: [
    { to: '/courseManagement', text: 'Course Management', Icon: <BallotIcon /> },
    // { to: '/enrollment', text: 'Enrollment', Icon: <AddCircleOutlineIcon /> },
  ],
};
