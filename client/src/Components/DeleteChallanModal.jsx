import * as React from "react";
import Dialog from "@mui/material/Dialog";
import axios from "axios";
import { Box, Typography, TextField, Button } from "@mui/material";

import UserContext from "../Context/UserContext";

export default function DeleteChallanModal(props) {
  const { _delete, setDelete, fullScreen, setChanged, selectedChallan } = props.data;
  const { serverUrl } = React.useContext(UserContext);

  const [text, setText] = React.useState(undefined);

  function handleClose() {
    setDelete(false);
    setText(undefined);
  }

  const deleteChallan = async () => {
    if (text === "delete") {
      setChanged(false);
      const token = localStorage.getItem("authToken");
      const challanId = selectedChallan;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
        const url = `${serverUrl}/api/ledgers/deleteChallan/${challanId}`;
        const res = await axios.delete(url, config);
        console.log(res);
        setChanged(true);
        handleClose();
      } catch (error) {
        alert(error);
      }
    } else {
      alert("Please write 'delete' to delete");
    }

  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={_delete}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >

        <Box sx={{ p: 4, display: "flex", flexDirection: "column" }}>
          <Typography variant="p" sx={{ fontSize: 24, mb: 2 }}>Confirm</Typography>
          <Typography variant="p" sx={{ fontSize: 18 }}>Type "delete" to delete the challan</Typography>
          <TextField id="standard-basic" variant="standard" onChange={e => setText(e.target.value)} />
          <Box sx={{ display: "flex", gap: "0.5rem", mt: 2, alignSelf: "flex-end" }}>
            <Button sx={{ fontWeight: "bold" }} onClick={handleClose}>Cancel</Button>
            <Button sx={{ fontWeight: "bold" }} onClick={deleteChallan}>Delete</Button>
          </Box>
        </Box>
      </Dialog>
    </div>
  );
}
