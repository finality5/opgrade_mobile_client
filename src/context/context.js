import React, { useState, createContext } from 'react'

export const AppContext = createContext({})

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [img, setImg] = useState()
  const [host, setHost] = useState()
  const [toastText, setToast] = useState()
  const [answer, setAnswer] = useState()
  const [ticker, setTicker] = useState(false)
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
        setToast,
        answer,
        setAnswer,
        ticker,
        setTicker,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
