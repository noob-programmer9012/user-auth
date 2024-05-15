// import fs from "fs";
import { useContext, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import UserContext from "../Context/UserContext";
import { CircularProgress } from "@mui/material";

export default function ChallanDataGrid() {
  const [challanData, setChallanData] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const navigate = useNavigate();
  const { serverUrl, firm } = useContext(UserContext);
  const token = localStorage.getItem("authToken");

  const getPDF = useCallback(
    (params) => async () => {
      const challanId = params.row.challanId;
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        };
        const url = `${serverUrl}/api/ledgers/getChallanDetails/${challanId}`;
        const data = await axios.get(url, config);
        return window.open(URL.createObjectURL(data.data), "_blank"); // open url here
      } catch (error) {
        console.log(error);
      }
    },
    [serverUrl, token]
  );

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    // { field: "challanId", headerName: "challanId", width: 90 },
    {
      field: "challanNumber",
      headerName: "Challan Number",
      type: "number",
      flex: 1,
      editable: false,
      width: 10,
    },
    {
      field: "date",
      headerName: "Date",
      // type: "date",
      flex: 3,
      editable: false,
    },
    {
      field: "clientName",
      headerName: "Client name",
      flex: 3,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <PictureAsPdfIcon
              sx={{
                color: "#FF9800",
                cursor: "pointer",
              }}
            />
          }
          label="Delete"
          onClick={getPDF(params)}
        />,
        <GridActionsCellItem
          icon={
            <AddCircleIcon
              sx={{
                color: "#0505AA",
                cursor: "pointer",
              }}
            />
          }
          label="Delete"
          onClick={() => {
            // const challanID = params.row.challanId;
            // return challanID;
          }}
        />,
      ],
      flex: 3,
      editable: false,
    },
  ];

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    const getProducts = async () => {
      const firmId = JSON.parse(firm)._id;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const url = `${serverUrl}/api/ledgers/getAllChallans/${firmId}`;
        const data = await axios.get(url, config);
        setChallanData(JSON.stringify(data.data.data));

        // setProductsListUpdated(false);
      } catch (error) {
        console.log(error);
        if (
          error.response.data.message === "Not authorized to access this route"
        ) {
          return navigate("/login");
        }
      }
    };
    getProducts();
  }, [challanData, firm, serverUrl, token, navigate]);

  const challans = challanData && JSON.parse(challanData);

  const rowss =
    challans &&
    challans.map((challan, index) => ({
      id: index + 1,
      challanId: challan._id,
      challanNumber: challan.challanNumber,
      date: new Date(challan.challanDate).toLocaleDateString(),
      clientName: challan.clientId.companyName,
    }));

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      {rowss ? (
        <DataGrid
          rows={rowss}
          columns={columns}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[5, 10, 15]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      ) : (
        <Box sx={{ position: "absolute", left: "50%", top: "50%" }}>
          <CircularProgress />
        </Box>
      )}
      {/* <iframe src={urll} title="new"></iframe> */}
    </Box>
  );
}
