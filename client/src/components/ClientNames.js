import { Box, Divider, Typography } from '@mui/material'

export default function ClientNames () {
  const colors = [
    '#0179A8',
    '#346CB0',
    '#5F4B8B',
    '#B76BA3',
    '#EA6759',
    '#EC935E',
    '#F7C46C',
    '#A7C796',
    '#00A28A',
    '#3686A0',
    '#0179A8',
    '#346CB0'
  ]
  const names = ['Zathunicon', 'Faxquote', 'Opentech', 'Codehow']
  // const randomNumber = Math.floor(Math.random() * colors.length)

  // const randomColor = colors[randomNumber]
  return (
    <Box
      sx={{
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        mt: 1
      }}
    >
      {names.map(name => (
        <>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              gap: 2,
              cursor: 'pointer'
            }}
            onClick={e => alert(e.target.id)}
            key={names.indexOf(name)}
          >
            <Box
              sx={{
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                background: colors[Math.floor(Math.random() * colors.length)],
                border: 0,
                ml: 2,
                color: 'white',
                fontSize: '1.2rem',
                fontWeight: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {name[0]}
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontWeight: 400, color: '#234875' }}>
                {name}
              </Typography>
              <Typography
                variant='p'
                sx={{ fontSize: '0.9rem', fontWeight: 400, color: '#234875' }}
              >
                San Francisco, United States
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={{
              background: '1px solid #E0E1E5',
              mt: 1.5,
              width: '80%',
              alignSelf: 'flex-end'
            }}
          />
        </>
      ))}
    </Box>
  )
}
