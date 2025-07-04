import { useContext, useState, useCallback } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import download from "downloadjs";

import UserContext from "../Context/UserContext";
import { CircularProgress, Grid, useMediaQuery } from "@mui/material";
import ChallanData from "./ChllanData";
import { useTheme } from "@emotion/react";
import ChallanModal from "./AddChallanModal";
import EditChallanModal from "./EditChallanModal";
import DeleteChallanModal from "./DeleteChallanModal";

export default function ChallanDataGrid() {
  const [challanData, setChallanData] = useState(null);
  // const [pdf, setPdf] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [_delete, setDelete] = useState(false);
  const [changed, setChanged] = useState(false);
  const [selectedChallan, setSelectedChallan] = useState(undefined);
  const { serverUrl } = useContext(UserContext);
  const token = localStorage.getItem("authToken");

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const editChallan = useCallback(
    (params) => async () => {
      const challanId = params.row.challanId;
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
        const url = `${serverUrl}/api/ledgers/challanDetail/${challanId}`;
        const challan = await axios.get(url, config);
        setSelectedChallan(challan.data.challan);
        setEdit(true);
      } catch (error) {
        console.log(error);
      }
    }, [serverUrl, token]
  )

  const deleteChallan = useCallback(
    (params) => async () => {
      setDelete(true);
      setSelectedChallan(params.row.challanId);
    }, []
  )

  const getPDF = useCallback(
    (params) => async () => {
      const challanId = params.row.challanId;
      const challanNumber = params.row.challanNumber;
      const name = params.row.clientName.split(" ").map(word => word[0]).join("");
      const fileName = `${name}-${challanNumber}.pdf`
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        };
        const url = `${serverUrl}/api/ledgers/getChallanDetails/${challanId}`;
        const data = await axios.get(url, config);
        const blob = new Blob([data.data], { type: 'application/pdf' });
        download(blob, `${fileName}`, "application/pdf");
        // setPdf(URL.createObjectURL(data.data));
        // window.open(URL.createObjectURL(data.data), "_blank"); // open url here
      } catch (error) {
        console.log(error);
      }
    },
    [serverUrl, token]
    // alert(params.row.challanId);
  );

  const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    // { field: "challanId", headerName: "challanId", width: 90 },
    {
      field: "challanNumber",
      headerName: "Challan No",
      type: "number",
      flex: 1,
      editable: false,
      width: 5,
    },
    {
      field: "date",
      headerName: "Date",
      // type: "date",
      flex: 2,
      editable: false,
    },
    {
      field: "clientName",
      headerName: "Client name",
      flex: 1,
      editable: false,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 2,
      // width: 120,
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
          label="PDF"
          onClick={getPDF(params)}
        />,
        <GridActionsCellItem
          icon={
            <AddCircleIcon
              sx={{
                color: "primary.dark",
                cursor: "pointer",
              }}
            />
          }
          label="Add Challan"
          onClick={() => setOpen(true)}
        />,
        <GridActionsCellItem
          icon={
            <EditIcon
              sx={{
                color: "#FF9800",
                cursor: "pointer",
              }}
            />
          }
          label="Edit Challan"
          onClick={editChallan(params)}
        />,
        <GridActionsCellItem
          icon={
            <DeleteIcon
              sx={{
                color: "#ff000080",
                cursor: "pointer",
              }}
            />
          }
          label="Delete Challan"
          onClick={deleteChallan(params)}
        />,

      ],
      flex: 3,
      editable: false,
    },
  ];

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

  const noColoumns = [
    {
      field: "actions",
      type: "actions",
      headerName: "ADD CHALLAN",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={
            <AddCircleIcon
              sx={{
                color: "#30619F",
                cursor: "pointer",
                width: "75px",
                height: "75px",
              }}
            />
          }
          label="Add Challan"
          onClick={() => setOpen(true)}
        />,
      ],
      flex: 3,
      editable: false,
    },
  ];
  const norows = [
    {
      id: "",
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        height: { xs: "calc(100vh - 55px)", sm: "calc(100vh - 64px)" },
        justifyContent: "center",
        alignItems: "center",
        p: { xs: 0, sm: 2 },
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        {rowss ? (
          rowss.length > 0 ? (
            <DataGrid
              rows={rowss}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10, 15]}
              // checkboxSelection
              disableRowSelectionOnClick
            />
          ) : (
            <DataGrid
              rows={norows}
              columns={noColoumns}
              // paginationModel={paginationModel}
              // onPaginationModelChange={setPaginationModel}
              // pageSizeOptions={[5, 10, 15]}
              rowHeight={500}
              disableRowSelectionOnClick
            />
          )
        ) : (
          <CircularProgress />
        )}
        {/* <iframe src={pdf} title="new"></iframe> */}
      </Box>

      <Grid item xs={12}>
        <ChallanData
          data={{ challanData, setChallanData, changed, setChanged }}
        />
        <ChallanModal
          data={{ open, setOpen, fullScreen, setChanged, setChallanData }}
        />
        <EditChallanModal data={{ edit, setEdit, fullScreen, setChanged, setChallanData, selectedChallan }} />
        <DeleteChallanModal data={{ _delete, setDelete, fullScreen, setChanged, selectedChallan }} />
      </Grid>
    </Box>
  );
}
