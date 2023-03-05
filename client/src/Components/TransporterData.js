import * as React from 'react'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}))

function createData (id, transporterName, gstNumber) {
  return { id, transporterName, gstNumber }
}

const rows = [
  createData(1, 'Maruti Motor', '24AQQPN6533K1ZC'),
  createData(2, 'Janvi Logistics', '24DAQPS2504L1ZC'),
  createData(3, 'Pavan goods freight carrier', '24ACVPS7030F1ZC')
]

export default function TransporterData () {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '300px' }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>Transporter Name</StyledTableCell>
            <StyledTableCell>GST Number&nbsp;</StyledTableCell>
            <StyledTableCell>Actions&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component='th' scope='row'>
                {row.id}
              </StyledTableCell>
              <StyledTableCell>{row.transporterName}</StyledTableCell>
              <StyledTableCell>{row.gstNumber}</StyledTableCell>
              <StyledTableCell
                sx={{ display: 'flex', alignItems: 'center', ml: -2 }}
              >
                <IconButton aria-label='delete' size='large'>
                  <DeleteIcon sx={{ color: '#D32F2F' }} />
                </IconButton>
                <IconButton aria-label='edit' size='large'>
                  <EditIcon sx={{ color: '#FF9800' }} />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
