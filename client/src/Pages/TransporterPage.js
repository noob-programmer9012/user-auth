import { Grid, IconButton, InputBase, Paper } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

import TransporterData from '../Components/TransporterData'

export default function TransporterPage () {
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
          alignSelf: 'center'
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
        />
      </Paper>
    )
  }
  return (
    <Grid container sx={{ pl: 1, pr: 1, pt: 2 }}>
      <Grid item xs={12} sx={{ pb: 1 }}>
        <CustomizedInputBase />
      </Grid>
      <Grid item xs={12}>
        <TransporterData />
      </Grid>
    </Grid>
  )
}
