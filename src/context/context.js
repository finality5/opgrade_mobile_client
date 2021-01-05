import React, { useState, createContext } from 'react'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [displayName, setDisplayName] = useState()

  return (
    <AppContext.Provider
      value={{
        displayName,
        setDisplayName,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
