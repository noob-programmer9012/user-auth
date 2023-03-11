import { useState } from 'react'
import {
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  Paper,
  useMediaQuery,
  useTheme
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddCircleIcon from '@mui/icons-material/AddCircle'

import Modal from '../Components/AddTransporterModal'
import TransporterData from '../Components/TransporterData'

export default function TransporterPage () {
  const [open, setOpen] = useState(false)
  const [changed, setChanged] = useState(false)
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'))

  function CustomizedInputBase () {
    function handleSearch (e) {
      const transporters = document.getElementsByClassName('transporters')
      for (let transporter of transporters) {
        if (
          transporter.id.toUpperCase().indexOf(e.target.value.toUpperCase()) !==
          -1
        ) {
          transporter.style.display = ''
        } else {
          transporter.style.display = 'none'
        }
      }
    }

    return (
      <Paper
        component='form'
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          maxHeight: '48px',
          alignSelf: 'center',
          flex: 2
        }}
      >
        <IconButton sx={{ p: '10px' }} aria-label='menu'>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder='Search Transporters'
          inputProps={{ 'aria-label': 'search transporters' }}
          onChange={handleSearch}
          endAdornment={
            <InputAdornment position='end'>
              <IconButton
                aria-label='Add Transporter'
                edge='end'
                sx={{
                  p: 2,
                  borderRadius: 0,
                  borderLeft: '1px solid #30619F',
                  height: '100%',
                  '&:hover': { background: 'none' }
                }}
              >
                <AddCircleIcon
                  fontSize='large'
                  sx={{ ml: -1 }}
                  color='primary'
                  onClick={() => setOpen(true)}
                />
              </IconButton>
            </InputAdornment>
          }
        />
      </Paper>
    )
  }
  return (
    <Grid container sx={{ pt: 1, display: 'flex', justifyContent: 'center' }}>
      <Grid item xs={11} sx={{ pb: 1, display: 'flex', alignItems: 'center' }}>
        <CustomizedInputBase />
      </Grid>
      <Grid item xs={11}>
        <TransporterData data={{ changed, setChanged }} />
        <Modal data={{ open, setOpen, fullScreen, setChanged }} />
      </Grid>
    </Grid>
  )
}
