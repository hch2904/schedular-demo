import React, { useReducer } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { ACTIONS, scheduleReducer } from '../reducer';
import { useSnackbar } from 'notistack';
import { Grid } from '@material-ui/core';

const daysArr = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
const shiftArr = ["MORNING_UP_STAIRS", "MORNING_DOWN_STAIRS", "MORNING_PARKING_LOT", "LUNCH_A", "LUNCH_B", "LUNCH_C", "LUNCH_D", "AFTERNOON_UP_STAIRS", "AFTERNOON_DOWN_STAIRS", "AFTERNOON_PARKING_LOT"]

const LUNCH_SHIFTS = ["LUNCH_A", "LUNCH_B", "LUNCH_C", "LUNCH_D"];

const getTblRows = (schedule, createSchedule) => {
  const tableRows = [];
  shiftArr.forEach((shift) => {
    const tblCell = [];
    daysArr.forEach((day, index) => {
      const scheduleFound = schedule.find((sch) => sch.day === day && sch.shift === shift);
      const name = scheduleFound ? scheduleFound.name : "";
      tblCell.push((
        <>
          <TableCell key={`${name}#${index}`}>
            <Selector
              name={name}
              day={day}
              shift={shift}
              key={`${name}#${index}`}
              createSchedule={createSchedule}
            />
          </TableCell>
        </>));
    });
    tableRows.push(<TableRow key={shift}>
      <TableCell key={`${shift}`}>{shift}</TableCell>
      {tblCell}
    </TableRow>)
  });
  return tableRows;
}

const staffMembers = ["X1", "X2", "X3", "X4", "X5", "X6", "X7"];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 640,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Selector = ({ name, day, shift, createSchedule }) => {
  const classes = useStyles();
  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-simple-select-label">Staff Name</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={name}
        onChange={(event, selected) => createSchedule(event.target.value, day, shift)}
      >
        {staffMembers.map((staffMember) => <MenuItem value={staffMember}>{staffMember}</MenuItem>)}
      </Select>
    </FormControl>
  );
};

const columns = [
  { id: 'shift', label: "Shift" },
  { id: 'monday', label: 'Monday' },
  { id: 'tuesday', label: 'Tuesday' },
  { id: 'wednesday', label: 'Wednesday' },
  { id: 'thursday', label: 'Thursday' },
  { id: 'friday', label: 'Friday' }
];



function EmployeeLoad() {

  const initState = [
    {
      _id: "some-uuid",
      name: "X1",
      shift: "MORNING_UP_STAIRS",
      day: "MONDAY"
    },
  ];

  const [schedule, dispatch] = useReducer(scheduleReducer, initState);
  const { enqueueSnackbar } = useSnackbar();

  const classes = useStyles();

  const createSchedule = (name, day, shift) => {
    const shiftsInADay = schedule.filter((shift) => shift.name === name && shift.day === day);
    const shiftsInAWeek = schedule.filter((shift) => shift.name === name);
    if (shiftsInADay.length > 2 || shiftsInAWeek.length > 7) return enqueueSnackbar(`Shift Quota for ${name} exceeded`, { variant: "warning" });

    // lunch validation
    const lunchShifts = shiftsInADay.filter((shift) => LUNCH_SHIFTS.includes(shift.shift));
    if (lunchShifts.length === 2) return enqueueSnackbar("Cannot schedule consecutive lunch shifts", { variant: "warning" });
    if (lunchShifts.length) {
      const lunchShiftIndex = LUNCH_SHIFTS.findIndex((lunchShift) => lunchShifts[0].shift === lunchShift);
      const nextShiftIndex = LUNCH_SHIFTS.findIndex((lunchShift) => shift === lunchShift);
      if (Math.abs(nextShiftIndex - lunchShiftIndex) === 1) return enqueueSnackbar("Cannot schedule consecutive lunch shifts", { variant: "warning" });
    }
    dispatch({ type: ACTIONS.CREATE_SCHEDULE, payload: { name, day, shift } });
    return true;
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={1}>
        <Grid item md={12}>
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {getTblRows(schedule, createSchedule)}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EmployeeLoad;