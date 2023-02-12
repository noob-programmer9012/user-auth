import { useState } from 'react'

import UserContext from './userContext'

export const UserState = props => {
  const [user, setUser] = useState(null)
  const [firm, setFirm] = useState(null)

  return (
    <UserContext.Provider value={{ user, setUser, firm, setFirm }}>
      {props.children}
    </UserContext.Provider>
  )
}
