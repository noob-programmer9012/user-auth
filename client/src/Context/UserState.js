import { useState } from 'react'

import UserContext from './UserContext'

const UserState = props => {
  const [user, setUser] = useState(null)
  const serverUrl = 'https://api.the-erp.in'

  return (
    <UserContext.Provider value={{ user, setUser, serverUrl }}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
