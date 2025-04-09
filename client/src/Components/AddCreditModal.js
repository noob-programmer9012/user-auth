import * as React from "react";
import Dialog from "@mui/material/Dialog";

import { Box } from "@mui/material";
import AddCreditEntry from "../Forms/AddCreditEntry";

export default function AddCreditModal(props) {
  const { open, setOpen, fullScreen, setChanged, debtor, setTo } = props.data;

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box sx={{ p: 5 }}>
          <AddCreditEntry data={{ handleClose, open, setChanged, debtor, setTo }} />
        </Box>
      </Dialog>
    </div>
  );
}
