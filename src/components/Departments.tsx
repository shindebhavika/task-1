import React, { useState } from 'react';
import { Box, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import departmentData from "../InterFaces/data.json"



const Departments: React.FC = () => {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const handleToggle = (department: string) => {
    setExpanded(prev => ({ ...prev, [department]: !prev[department] }));
  };

  const handleDepartmentChange = (department: string) => {
    const isChecked = !checked[department];
    const updatedChecked = { ...checked, [department]: isChecked };
    departmentData.forEach(d => {
      if (d.department === department) {
        d.sub_departments.forEach(sub => {
          updatedChecked[sub] = isChecked;
        });
      }
    });
    setChecked(updatedChecked);
  };

  const handleSubDepartmentChange = (sub_department: string, department: string) => {
    const isChecked = !checked[sub_department];
    const updatedChecked = { ...checked, [sub_department]: isChecked };

    const departmentDataItem = departmentData.find(d => d.department === department);
    if (departmentDataItem) {
      const allSubChecked = departmentDataItem.sub_departments.every(sub => updatedChecked[sub]);
      updatedChecked[department] = allSubChecked;
    }

    setChecked(updatedChecked);
  };

  return (
    <Box className="container">
      <h1>Departments</h1>
      {departmentData.map(department => (
        <Box key={department.department} className="department">
          <FormControlLabel
            control={
              <Checkbox
                checked={checked[department.department] || false}
                indeterminate={
                  department.sub_departments.some(sub => checked[sub]) &&
                  !department.sub_departments.every(sub => checked[sub])
                }
                onChange={() => handleDepartmentChange(department.department)}
              />
            }
            label={department.department}
           
          />
          <IconButton onClick={() => handleToggle(department.department)}>
            {expanded[department.department] ? <ExpandLess /> : <ExpandMore />}
          </IconButton> ({department.sub_departments.length})
          {expanded[department.department] && (
            <Box className="sub-departments">
              {department.sub_departments.map(sub_department => (
                <FormControlLabel
                  key={sub_department}
                  control={
                    <Checkbox
                      checked={checked[sub_department] || false}
                      onChange={() => handleSubDepartmentChange(sub_department, department.department)}
                    />
                  }
                  label={sub_department}
                  className="sub-department-label"
                />
              ))}
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default Departments;
