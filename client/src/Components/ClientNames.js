import { Box, Divider, LinearProgress, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react'

import colors from '../utils/colors'
import UserContext from '../Context/UserContext'

export default function ClientNames (props) {
  const navigate = useNavigate()
  const { firm, serverUrl } = useContext(UserContext)
  const [names, setNames] = useState(null)
  const { listChanged, setListChanged, setDebtor, setShowlist, setChecked } =
    props.data

  setListChanged(false)
  useEffect(() => {
    async function getClients () {
      const token = localStorage.getItem('authToken')
      const { _id } = JSON.parse(firm)
      try {
        const data = await axios.get(
          `${serverUrl}/api/ledgers/getdebtors/${_id}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        )
        setNames(JSON.stringify(data.data.data))
      } catch (error) {
        navigate('/login')
      }
    }
    getClients()
  }, [firm, navigate, listChanged, serverUrl])

  return (
    <>
      <Box
        sx={{
          overflowY: 'auto',
          mt: 1.2
        }}
      >
        {names ? (
          [JSON.parse(names)].map(x =>
            x.map(name => (
              <React.Fragment key={name._id}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    gap: 2,
                    cursor: 'pointer'
                  }}
                  id='id'
                  onClick={() => {
                    setDebtor(name)
                    setShowlist(false)
                    setChecked(true)
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      background:
                        colors[Math.floor(Math.random() * colors.length)],
                      border: 0,
                      ml: 2,
                      mt: -1.7,
                      color: 'white',
                      fontSize: '1.2rem',
                      fontWeight: 600,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {name.companyName[0]}
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 2,
                      mb: 1
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 400,
                        color: '#234875'
                      }}
                      className='company'
                    >
                      {name.companyName}
                    </Typography>
                    <Typography
                      variant='p'
                      sx={{
                        fontSize: '0.9rem',
                        fontWeight: 400,
                        color: '#234875'
                      }}
                    >
                      {name.address ? name.address.line3 : 'Not given'}
                    </Typography>
                    <Divider
                      sx={{
                        borderColor: '1px solid #E0E1E5',
                        mt: 1.5,
                        width: '100%',
                        alignSelf: 'flex-start'
                      }}
                    />
                  </Box>
                </Box>
              </React.Fragment>
            ))
          )
        ) : (
          <LinearProgress />
        )}
      </Box>
    </>
  )
}
