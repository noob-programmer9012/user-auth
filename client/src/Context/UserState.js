import { useState } from 'react'

import UserContext from './UserContext'

const UserState = props => {
  const [user, setUser] = useState(null)
  const [component, setComponent] = useState(<h1>Hello, World</h1>)
  const serverUrl = 'https://api.the-erp.in'

  return (
    <UserContext.Provider
      value={{ user, setUser, component, setComponent, serverUrl }}
    >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserState
