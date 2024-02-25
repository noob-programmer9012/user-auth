import * as React from "react";
import axios from "axios";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { Alert, Box, Button, Collapse, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

export default function DeleteTransporter(props) {
  const { handleClose, rm, setChanged, currentTransporter } = props.data;
  const [show, setShow] = React.useState(false);
  const [error] = React.useState(null);
  const { serverUrl } = React.useContext(UserContext);

  const navigate = useNavigate();

  const token = localStorage.getItem("authToken");
  if (!token) {
    return navigate("/login");
  }

  async function handleDelete() {
    try {
      const config = {
        headers: {
          "Content-Type": "application/JSON",
          Authorization: `Bearer ${token}`,
        },
      };
      const url = `${serverUrl}/api/transporter/delete/${currentTransporter[1]}`;
      const data = await axios.delete(url, config);
      console.log(data);
      setChanged(true);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Box open={rm} onClose={handleClose}>
      {setShow && (
        <Grid item xs={12} sx={{ mb: 2 }}>
          <Collapse in={show}>
            <Alert onClose={() => setShow(false)} severity="error">
              {error}
            </Alert>
          </Collapse>
        </Grid>
      )}
      <Grid
        container
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography fullWidth variant="h6" fontWeight={600} gutterBottom>
          Delete {currentTransporter[0]} ?
        </Typography>
        <IconButton>
          <CloseIcon onClick={() => handleClose()} fontSize="medium" />
        </IconButton>
      </Grid>
      <Grid container spacing={2} mt={1}>
        <Grid container justifyContent="flex-end" marginTop={2} gap={1}>
          <Button
            variant="contained"
            endIcon={<CloseIcon />}
            onClick={() => handleClose()}
            color="warning"
          >
            NO
          </Button>
          <Button
            variant="contained"
            endIcon={<DeleteIcon />}
            onClick={() => handleDelete()}
            color="error"
          >
            YES
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
