import React, { useState, createContext } from 'react'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [img, setImg] = useState()
  const [host, setHost] = useState()
  const [toastText, setToast] = useState()
  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        img,
        setImg,
        host,
        setHost,
        toastText,
        setToast
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
