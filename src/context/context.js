import React, { useState, createContext } from 'react'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [img, setImg] = useState()
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        img,
        setImg
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
