import { Box, Button, Typography } from '@mui/material'
import FactoryIcon from '@mui/icons-material/Factory'
import LabTabs from '../Components/Tabs'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'

export default function DebtorDetails(props) {
  const { debtor, setShowlist, setChecked } = props.data
  return (
    <Box>
      <Box
        sx={{
          height: '50px',
          backgroundColor: 'background.paper',
          boxShadow: 5,
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
            color: 'text.main',
            opacity: 0.8,
            '&:hover': { backgroundColor: 'none' }
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
          <Typography variant='h5' mt='7px' color='text.main'>
            {debtor.companyName}
          </Typography>
        </Box>
        <Typography variant='p' sx={{ opacity: 0.7, fontSize: '1.1rem' }}>
          {debtor.address.line3}
        </Typography>
      </Box>
      <Box sx={{ width: { xs: "100vw", md: "100%" }, overflow: 'auto' }}>{debtor && <LabTabs data={{ debtor }} />}</Box>
    </Box>
  )
}
