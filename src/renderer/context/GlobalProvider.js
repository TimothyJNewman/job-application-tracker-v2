import React, { useState } from 'react'
import { GlobalContext } from './GlobalContext'

const GlobalProvider = (props) => {
  const [appsData, setAppsData] = useState([])
  const [notification, setNotification] = useState({
    severity: 'low',
    text: '',
  })
  return (
    <GlobalContext.Provider
      value={{
        appsDataState: [appsData, setAppsData],
        notificationState: [notification, setNotification],
      }}>
      {props.children}
    </GlobalContext.Provider>
  )
}

export default GlobalProvider
