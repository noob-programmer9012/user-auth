import * as React from 'react'
import Axios from 'axios'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'

import UserContext from '../Context/UserContext'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    backgroundColor: theme.palette.common.white,
    boxShadow: '5px 5px 10px #c2c2c2'
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

export default function TransporterData () {
  const { serverUrl, firm } = React.useContext(UserContext)
  const [transporters, setTransporters] = React.useState(null)
  const firmId = JSON.parse(firm)._id
  React.useEffect(() => {
    const transporters = async () => {
      let token = localStorage.getItem('authToken')
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
      try {
        const data = await Axios.get(
          `${serverUrl}/api/transporter/gettransporters/${firmId}`,
          config
        )
        setTransporters(JSON.stringify(data.data.data))
      } catch (error) {
        console.log(error)
      }
    }
    transporters()
  })

  transporters && console.log(transporters)

  const rows = [
    createData(1, 'Maruti Motor', '24AQQPN6533K1ZC'),
    createData(2, 'Janvi Logistics', '24DAQPS2504L1ZC'),
    createData(3, 'Pavan goods freight carrier', '24ACVPS7030F1ZC')
  ]

  return (
    <TableContainer>
      <Table aria-label='customized table'>
        <TableHead sx={{ p: 1 }}>
          <TableRow sx={{ p: 1 }}>
            <StyledTableCell sx={{ p: 1 }}>ID</StyledTableCell>
            <StyledTableCell sx={{ p: 1 }}>Transporter Name</StyledTableCell>
            <StyledTableCell sx={{ p: 1 }}>GST Number&nbsp;</StyledTableCell>
            <StyledTableCell sx={{ p: 1 }}>Actions&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ p: 1 }}>
          {rows.map(row => (
            <StyledTableRow
              key={row.id}
              id={row.transporterName}
              sx={{ p: 1 }}
              className='transporters'
            >
              <StyledTableCell component='th' scope='row' sx={{ p: 1 }}>
                {row.id}
              </StyledTableCell>
              <StyledTableCell sx={{ p: 1 }}>
                {row.transporterName}
              </StyledTableCell>
              <StyledTableCell sx={{ p: 1 }}>{row.gstNumber}</StyledTableCell>
              <StyledTableCell
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: -2,
                  p: 1,
                  m: 0
                }}
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
