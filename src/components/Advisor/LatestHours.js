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
    hours: 10.5,
    name: 'Ekaterina Tankova',
    createdAt: 1555016400000,
    status: 'Pending'
  },
  {
    id: uuid(),
    type: '',
    hours: 8.75,
    name: 'Anje Keizer',
    createdAt: 1554757200000,
    status: 'Pending'
  },
  {
    id: uuid(),
    type: '',
    hours: 4,
    name: 'Adam Denisov',
    createdAt: 1554670800000,
    status: 'Approved'
  }
];

const useStyles = makeStyles(() => ({
  root: {},
  actions: {
    justifyContent: 'flex-end'
  }
}));

const LatestHours = ({ className, ...rest }) => {
  const classes = useStyles();
  const [student] = useState(data);

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader title="Recently Submitted Hours" />
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
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Status
                    </TableSortLabel>
                  </Tooltip>
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
                  <TableCell>
                    <Chip
                      color="primary"
                      label={student.status}
                      size="small"
                    />
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

LatestHours.propTypes = {
  className: PropTypes.string
};

export default LatestHours;
