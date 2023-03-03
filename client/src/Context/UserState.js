import { useState } from 'react'

import UserContext from './UserContext'
import DashboardData from '../Pages/DashboardData'

const UserState = props => {
  const [user, setUser] = useState(null)
  const [firm, setFirm] = useState(null)
  const [component, setComponent] = useState(<DashboardData />)
  const [active, setActive] = useState('Dashboard')
  const serverUrl = 'https://api.the-erp.in'

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        firm,
        setFirm,
        component,
        setComponent,
        serverUrl,
        active,
        setActive
      }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
