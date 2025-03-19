import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Box from "@mui/material/Box";
import { Paper, Card, Typography } from "@mui/material";

import UserContext from "../Context/UserContext";
import DataGridX from "./DataGrid";

const StatementTab = ({ debtor }) => {
  const navigate = useNavigate();
  const { firm, serverUrl } = React.useContext(UserContext)
  const firmId = JSON.parse(firm)._id;
  const debtorId = debtor._id;
  const token = localStorage.getItem("authToken");

  const [entries, setEntries] = useState([]);

  // useEffect(() => {
  //   // console.log(entries);
  //   // console.log(rows)
  // }, [entries])

  useEffect(() => {
    if (!token) navigate("/login");

    const getDebitEntries = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const url = `${serverUrl}/api/ledgers/getdebitentry/${firmId}/${debtorId}`;
        const data = await axios.get(url, config);
        setEntries(data.data.entries);
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
  }, [])

  const columns = [
    { field: 'id', headerName: "ID", width: 90 },
    { field: 'cno', headerName: 'Challan Number', width: 250, editable: false },
    {
      field: 'cdate',
      headerName: 'Challan Date',
      editable: false,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      editable: false,
    },
  ];

  const rows = entries.map((entry, index) => {
    return { id: index + 1, cno: entry.challanNumber, cdate: new Date(entry.challanDate).toLocaleDateString(), amount: entry.amount }
  })

  return (
    <Paper sx={{ mt: 2, p: 1 }} >
      <Box className="outer" sx={{ display: "flex", flexDirection: "column", gap: "1rem", overflow: "auto", width: '100%', height: '100%' }}>
        <Box sx={{ p: 1, backgroundColor: "#330080" }}><Typography variant="h6">Menu</Typography></Box>
        <Box sx={{ width: '100%', height: '100%', overflow: "auto" }}><DataGridX columns={columns} rows={rows} /></Box>
      </Box>
    </Paper>
  )
}

export default StatementTab
