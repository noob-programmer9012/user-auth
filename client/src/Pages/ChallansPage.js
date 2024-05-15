import { Box } from "@mui/material";
import ChallanDataGrid from "../Components/ChallanDataGrid";

const ChallansPage = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flex: 1,
          height: {
            xs: "calc(100vh - 55px)",
            sm: "calc(100vh - 64px)",
          },
          justifyContent: "center",
          alignItems: "center",
          p: { xs: 0, sm: 2 },
          // gap: 2,
          overflow: "auto",
        }}
      >
        <ChallanDataGrid />
      </Box>
    </>
  );
};

export default ChallansPage;
