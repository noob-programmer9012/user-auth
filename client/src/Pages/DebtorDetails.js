import { Box, Button, Typography } from '@mui/material'
import FactoryIcon from '@mui/icons-material/Factory'
import LabTabs from '../Components/Tabs'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function DebtorDetails (props) {
  const { debtor, setShowlist, setChecked } = props.data
  return (
    <Box>
      <Box
        sx={{
          height: '50px',
          background: '#FFFFFF',
          boxShadow: '0px 5px 5px #D6D7DA',
          mb: 1,
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          width: '100vw'
        }}
      >
        <Button
          variant='text'
          sx={{
            color: 'black',
            opacity: 0.8,
            '&:hover': { background: 'none' }
          }}
          startIcon={<ChevronLeftIcon />}
          onClick={() => {
            setShowlist(true)
            setChecked(prev => !prev)
          }}
        >
          Back
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            alignItems: 'center'
          }}
        >
          <FactoryIcon fontSize='large' sx={{ opacity: 0.7 }} />
          <Typography variant='h5' mt='7px'>
            {debtor.companyName}
          </Typography>
        </Box>
        <Typography variant='p' sx={{ opacity: 0.7, fontSize: '1.1rem' }}>
          {debtor.address.line3}
        </Typography>
      </Box>
      {debtor && <LabTabs data={{ debtor }} />}
    </Box>
  )
}
