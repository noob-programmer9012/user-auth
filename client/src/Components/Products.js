import { Paper } from '@mui/material'

export default function Products () {
  return (
    <Paper
      sx={{
        flex: 2,
        backgroundColor: 'background.paper',
        height: '100%',
        boxShadow: 15,
        borderRadius: 2,
        overflow: 'hidden'
      }}
    ></Paper>
  )
}
