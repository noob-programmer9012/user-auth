import * as React from "react";
import Dialog from "@mui/material/Dialog";

import { Box } from "@mui/material";
import DeleteTransporter from "../Forms/DeleteTransporter";

export default function deleteTransporter(props) {
  const { rm, setRm, fullScreen, setChanged, currentTransporter } = props.data;

  function handleClose() {
    setRm(false);
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={rm}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box sx={{ p: 5 }}>
          <DeleteTransporter
            data={{ handleClose, rm, setChanged, currentTransporter }}
          />
        </Box>
      </Dialog>
    </div>
  );
}
