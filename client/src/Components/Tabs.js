import * as React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Box from '@mui/material/Box'
import { Card, Typography } from '@mui/material'

export default function ColorTabs (props) {
  const [value, setValue] = React.useState('one')
  const { debtor } = props.data

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor='main'
        indicatorColor='primary'
        aria-label='secondary tabs example'
      >
        <Tab value='one' label='Billing & Contact' />
        <Tab value='two' label='Item Two' />
        <Tab value='three' label='Item Three' />
      </Tabs>
      {value === 'one' && (
        <Card variant='outlined' sx={{ mt: 2, p: 2 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              variant='h6'
              sx={{ fontWeight: 600, mb: 2, color: 'text.main' }}
            >
              Billing Address
            </Typography>
            <Typography
              variant='p'
              sx={{ fontSize: '0.9rem', opacity: '0.9', color: 'text.main' }}
            >
              {debtor.address.line1}
            </Typography>
            <Typography
              variant='p'
              sx={{ fontSize: '0.9rem', opacity: '0.9', color: 'text.main' }}
            >
              {debtor.address.line2}
            </Typography>
            <Typography
              variant='p'
              sx={{ fontSize: '0.9rem', opacity: '0.9', color: 'text.main' }}
            >
              {debtor.address.line3}
            </Typography>
          </Box>
        </Card>
      )}
    </Box>
  )
}
