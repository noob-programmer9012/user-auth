import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Button } from '@mui/base';

import UserContext from "../Context/UserContext";
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function YearEndDialog({ yearEndDialog, setYearEndDialog }) {
  const [confirm, setConfirm] = React.useState(false);

  const { firm, serverUrl } = React.useContext(UserContext);
  const yearStart = firm ? new Date(JSON.parse(firm).fYearStart).toLocaleDateString('en-IN') : undefined;
  const yearEnd = firm ? new Date(JSON.parse(firm).fYearEnd).toLocaleDateString('en-IN') : undefined;

  const handleClose = () => {
    setYearEndDialog(false);
    setConfirm(false);
  };

  const handleYearEnd = async () => {
    setConfirm(true);
    const token = localStorage.getItem("authToken");
    const firmid = firm ? JSON.parse(firm)._id : undefined;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      const url = `${serverUrl}/api/firm/yearend/${firmid}`;
      const res = await axios.put(url, {}, config);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={yearEndDialog}
        onClose={handleClose}
        slots={{
          transition: Transition,
        }}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              disabled={confirm ? true : false}
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: 'flex', gap: '1rem', flexDirection: 'column', p: 2 }}>
          <Typography variant="h4">Are you sure, you want to clear accounts for financial year, {yearStart} - {yearEnd}?</Typography>
          <Box sx={{ display: 'flex', gap: '1rem', alignSelf: 'center' }}>
            <Button onClick={handleYearEnd}>Confirm</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
