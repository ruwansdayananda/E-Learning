import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Assignments } from './Assignments';
import { StudyMaterials } from './StudyMaterials';
import { Grades } from './Grades';
import { Enrollment } from './Enrollment';
import { GradeStudents } from './GradeStudents';
import { CourseManagement } from './CourseManagement';

function App() {
  return (
    <div>
      <div style={{ marginTop: '1rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/studyMaterials" element={<StudyMaterials />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/enrollment" element={<Enrollment />} />
          <Route path="/gradeStudents" element={<GradeStudents />} />
          <Route path="/courseManagement" element={<CourseManagement />} />
        </Routes>
      </div>
    </div>
  );
}
export default App;
