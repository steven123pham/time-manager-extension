import React, { useEffect } from 'react';
import {
  Table,
  TableBody, 
  TableCell, 
  Box, 
  Typography, 
  TableRow, 
  Paper, 
  Checkbox, 
  LinearProgress,
  Toolbar,
  Button } from '@mui/material' 
import { makeStyles } from '@mui/styles';
import CssBaseline from "@mui/material/CssBaseline";

interface Row {
  type: string;
  description: string;
  date: string;
  selected: boolean;
}

function createData(type: string, description: string, date: string): Row {
  return { type, description, date, selected: false };
}

const useStyles = makeStyles(({
  root: {
    minWidth: '500px',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  linearProgress: {
    borderRadius: 5, 
    height: 10, 
    margin: 10  // Position LinearProgress at the bottom of the table row
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'lightblue',
    borderRadius: '0px 0px 5px 5px',
  },
  title: {
    top: 'auto',
    bottom: 0,
    textAlign: 'center', 
  },
  bottombar: {
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '0px 0px 5px 05px',
  }
}));

function App() {
  const classes = useStyles();

  const [progress, setProgress] = React.useState<number>(0); //progess and setProgess with default of 0
  const [rows, setRows] = React.useState<Row[]>([
    createData('Math', 'Homework 3', '2020-09-10'),
    createData('Reading', 'To Kill a Mocking Bird', '2020-05-21'),
  ]); //rows and setRows with these being the default rows

  useEffect(() => {
    const savedRows = JSON.parse(localStorage.getItem('rows') || '[]');
    const savedProgress = JSON.parse(localStorage.getItem('progress') || '0');

    if (savedRows.length === 0) {
      setRows([
        createData('Math', 'Homework 3', '2020-09-10'),
        createData('Reading', 'To Kill a Mocking Bird', '2020-05-21'),
      ]);
    } else {
      setRows(savedRows);
    }
    
    setProgress(savedProgress);
  }, []); //useEffect which whenever refreshed you will getItems of the progess and rows then set them to the current state from the local storage 

  const handleCheckboxChange = (index: number) => {
    const updatedRows = [...rows];
    updatedRows[index].selected = !updatedRows[index].selected;

    // Save updated rows to localStorage
    localStorage.setItem('rows', JSON.stringify(updatedRows));

    // Calculate and save progress value to localStorage
    const progressValue = calculateProgress(updatedRows);
    localStorage.setItem('progress', JSON.stringify(progressValue));

    setRows(updatedRows);
    setProgress(progressValue); // Update progress state
  };

  const calculateProgress = (rows: Row[]) => {
    return rows.length > 0 ? (rows.filter((r) => r.selected).length / rows.length) * 100 : 0;
  };
  
  return (
    <Paper >
      <CssBaseline/>
      <Paper className={classes.root}>
      <Toolbar variant='dense' className={classes.toolbar}>
        <Typography variant="h6" className={classes.title} sx={{ fontFamily: 'Monospace' }}> BE DESCIPLINED </Typography>
      </Toolbar>
        <Table className={classes.table}>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow
                key={row.type}
              >
                <TableCell>
                  <Checkbox
                    checked={row.selected}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box>
          <LinearProgress
            variant="determinate"
            value={progress}
            className={classes.linearProgress}
          />
          <Box className={classes.bottombar}>
            <Box sx={{ bottom: 'auto', top: 0, textAlign: 'left', margin: '10px'}}>
              <Typography variant="body2" color="text.secondary">{`${Math.round(
                progress
              )}%`}</Typography>
            </Box>
            <Box sx={{ bottom: 'auto', top: 0, textAlign: 'right', margin: '10px' }}>
              <Button variant="contained">Webpage</Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Paper>
  );
}

export default App;
