import * as React from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import UserContext from "../Context/UserContext";
import EditTranspoter from "./EditTransporterModal";
import DeleteTransporter from "./DeleteTransporterModal";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.text.main,
    backgroundColor: theme.palette.background.paper,
    borderBottom: "4px solid #30619F",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(id, transporterName, gstNumber) {
  return { id, transporterName, gstNumber };
}

export default function TransporterData(props) {
  const [open, setOpen] = React.useState(false);
  const [rm, setRm] = React.useState(false);
  const { changed, setChanged } = props.data;
  const { serverUrl, firm } = React.useContext(UserContext);
  const [transporters, setTransporters] = React.useState(null);
  const firmId = JSON.parse(firm)._id;
  const [currentTransporter, setCurrentTransporter] = React.useState([]);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();

  React.useEffect(() => {
    let token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
    }
    const transporters = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const data = await Axios.get(
          `${serverUrl}/api/transporter/gettransporters/${firmId}`,
          config
        );
        setTransporters(JSON.stringify(data.data.data));
        setChanged(false);
      } catch (error) {
        navigate("/login");
      }
    };
    transporters();
  }, [
    setTransporters,
    transporters,
    firmId,
    serverUrl,
    navigate,
    setChanged,
    changed,
  ]);

  const rows = [];

  transporters &&
    JSON.parse(transporters).map((transporter) =>
      rows.push(
        createData(
          `${transporter._id}`,
          `${transporter.transporterName}`,
          `${transporter.gst_no}`
        )
      )
    );

  return transporters ? (
    <TableContainer>
      <Table aria-label="customized table" sx={{ p: 0 }}>
        <TableHead>
          <TableRow>
            <StyledTableCell sx={{ p: 1 }}>ID</StyledTableCell>
            <StyledTableCell sx={{ p: 1 }}>Transporter Name</StyledTableCell>
            <StyledTableCell sx={{ p: 1 }}>GST Number&nbsp;</StyledTableCell>
            <StyledTableCell sx={{ p: 1 }}>Actions&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ p: 0 }}>
          {rows.map((row, index) => (
            <StyledTableRow
              key={row.id}
              id={row.transporterName}
              className="transporters"
              sx={{ p: 1 }}
            >
              <StyledTableCell component="th" scope="row" sx={{ p: 1 }}>
                {index + 1}
              </StyledTableCell>
              <StyledTableCell sx={{ p: 1 }}>
                {row.transporterName}
              </StyledTableCell>
              <StyledTableCell sx={{ p: 1 }}>{row.gstNumber}</StyledTableCell>
              <StyledTableCell>
                <IconButton
                  sx={{ p: 0.5 }}
                  onClick={() => {
                    setCurrentTransporter([
                      `${row.transporterName}`,
                      `${row.id}`,
                    ]);
                    setRm(true);
                  }}
                  size="medium"
                >
                  <DeleteIcon
                    sx={{
                      color: "#D32F2F",
                      cursor: "pointer",
                    }}
                  />
                </IconButton>
                <IconButton
                  sx={{ p: 0.5 }}
                  onClick={() => {
                    setCurrentTransporter([
                      `${row.transporterName}`,
                      `${row.gstNumber}`,
                      `${row.id}`,
                    ]);
                    setOpen(true);
                  }}
                >
                  <EditIcon
                    sx={{ color: "#FF9800", cursor: "pointer" }}
                    size="medium"
                  />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <EditTranspoter
        data={{ open, setOpen, setChanged, currentTransporter, fullScreen }}
      />
      <DeleteTransporter
        data={{ rm, setRm, setChanged, currentTransporter, fullScreen }}
      />
    </TableContainer>
  ) : (
    <CircularProgress
      size={40}
      sx={{
        color: "primary.main",
        position: "absolute",
        left: "50%",
      }}
    />
  );
}
