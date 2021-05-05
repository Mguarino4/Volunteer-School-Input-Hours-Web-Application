import React, { useState } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const data = [
  {
    id: uuid(),
    type: '',
    hours: 4,
    name: 'Adam Denisov',
    createdAt: 1554670800000,
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LoggedHours = ({ className, ...rest }) => {
  const classes = useStyles();
  const [student] = useState(data);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Logged Student Hours" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={800}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Student
                </TableCell>
                <TableCell>
                  Date Submitted
                </TableCell>
                <TableCell>
                  Hour Type
                </TableCell>
                <TableCell>
                  Amount of Hours
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student.map((student) => (
                <TableRow
                  hover
                  key={student.id}
                >
                  <TableCell>
                    {student.name}
                  </TableCell>
                  <TableCell>
                    {moment(student.createdAt).format('DD/MM/YYYY')}
                  </TableCell>
                  <TableCell>
                    {student.type}
                  </TableCell>
                  <TableCell>
                    {student.hours}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LoggedHours.propTypes = {
  className: PropTypes.string
};

export default LoggedHours;
