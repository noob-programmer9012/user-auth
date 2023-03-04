import { Box, Typography } from '@mui/material'
import FactoryIcon from '@mui/icons-material/Factory'
import LabTabs from '../Components/Tabs'

export default function DebtorDetails (props) {
  const { debtor } = props.data
  //   console.log(debtor)
  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
