import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import { Paper, useMediaQuery, useTheme } from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UserContext from "../Context/UserContext";

import AddCreditModal from "../Components/AddCreditModal";
import DatePickerX from "./DatePicker";
import dayjs from "dayjs";
import { DataGrid } from "@mui/x-data-grid";

const StatementTab = ({ debtor }) => {
  const navigate = useNavigate();
  const { firm, serverUrl } = React.useContext(UserContext)
  const firmId = JSON.parse(firm)._id;
  const debtorId = debtor._id;
  const token = localStorage.getItem("authToken");

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [entries, setEntries] = useState("");
  const [open, setOpen] = useState(false);
  const [changed, setChanged] = useState(false);
  const [to, setTo] = useState(dayjs(new Date()));
  const [from, setFrom] = useState(dayjs(new Date()))
  const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // useEffect(() => {
  //   // console.log(entries);
  //   // console.log(rows)
  // }, [entries])

  useEffect(() => {
    console.log(changed);
    if (!token) navigate("/login");

    const getDebitEntries = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const url = `${serverUrl}/api/ledgers/statement/${firmId}/${debtorId}?from=${from}&to=${to}`;
        const data = await axios.get(url, config);
        // console.log(data.data.statement);
        const stringData = JSON.stringify(data.data.statement);
        setEntries(stringData);
      } catch (error) {
        console.log(error)
        if (
          error.response.data.message === "Not authorized to access this route"
        ) {
          return navigate("/login");
        }
      }
    };

    getDebitEntries();
  }, [changed, debtorId, firmId, from, to, navigate, serverUrl, token])

  const columns = [
    { field: 'id', headerName: "ID", width: 90 },
    { field: 'cno', headerName: 'Challan Number', width: 250, editable: false },
    {
      field: 'date',
      headerName: 'Date',
      editable: false,
    },
    {
      field: 'debit',
      headerName: 'Debit',
      editable: false,
    },
    {
      field: 'credit',
      headerName: "Credit",
      editable: false
    }
  ];

  let entriesData = entries && JSON.parse(entries)
  let rows = entriesData && entriesData.map((entry, index) => (
    { id: index + 1, cno: entry.challanNumber ? entry.challanNumber : "--", date: entry.challanDate ? new Date(entry.challanDate).toLocaleDateString() : new Date(entry.date).toLocaleDateString(), debit: entry.challanNumber ? entry.amount : '--', credit: entry.challanNumber ? "--" : entry.amount }
  ))

  useEffect(() => {
    entriesData = entries && JSON.parse(entries);
    rows = entriesData && entriesData.map((entry, index) => (
      { id: index + 1, cno: entry.challanNumber ? entry.challanNumber : "--", date: entry.challanDate ? new Date(entry.challanDate).toLocaleDateString() : new Date(entry.date).toLocaleDateString(), debit: entry.challanNumber ? entry.amount : '--', credit: entry.challanNumber ? "--" : entry.amount }
    ))
  }, [entries, changed])

  return (
    <Paper sx={{ mt: 2, p: 1 }} >
      <AddCreditModal data={{ open, setOpen, fullScreen, setChanged, debtor }} />
      {entries &&
        < Box className="outer" sx={{ display: "flex", flexDirection: "column", gap: "1rem", overflow: "auto", width: '100%', height: '100%' }}>
          <Box sx={{ p: 1, display: "flex", gap: "1rem", justifyContent: "center", alignItems: "center" }}>
            <DatePickerX label="From" value={from} setValue={setFrom} />
            <DatePickerX label="To" value={to} setValue={setTo} />
            <AddCircleIcon onClick={handleOpen} fontSize="large" sx={{ color: "#346CB0" }} />
          </Box>
          <Box sx={{ width: '100%', maxHeight: '500px', overflow: "auto" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              paginationModel={paginationModel}
              onPaginationModelChange={setPaginationModel}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              disableRowSelectionOnClick
            />
          </Box>
        </Box>
      }
    </Paper >
  )
}

export default StatementTab
