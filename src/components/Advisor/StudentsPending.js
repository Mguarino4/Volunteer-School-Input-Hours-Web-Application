import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const StudentsPending = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              STUDENTS PENDING APPROVAL
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              2
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

StudentsPending.propTypes = {
  className: PropTypes.string
};

export default StudentsPending;
