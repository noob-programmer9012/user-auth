import * as React from "react";
import Dialog from "@mui/material/Dialog";

import { Box } from "@mui/material";
import EditChallan from "../Forms/EditChallan";

export default function EditChallanModal(props) {
  const { edit, setEdit, fullScreen, setChanged, selectedChallan } = props.data;

  function handleClose() {
    setEdit(false);
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={edit}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box sx={{ p: 5 }}>
          <EditChallan data={{ handleClose, edit, setChanged, selectedChallan }} />
        </Box>
      </Dialog>
    </div>
  );
}
