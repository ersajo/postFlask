import React, { createContext, useState, useEffect } from 'react'
import decode from 'jwt-decode'

export const AuthContext = createContext()

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState('')
  const [isAuth, setIsAuth] = useState(false)

  const logIn = (newToken) => {
    localStorage.setItem('auth-token', newToken)
    const decoded = decode(newToken)
    setUser(decoded)
    setIsAuth(true)
  }
  
  const logOut = () => {
    localStorage.removeItem('auth-token')
    setUser({})
    setIsAuth(false)
  }
  
    useEffect(() => {
      const localToken = localStorage.getItem('auth-token')
    if (localToken) {
      const decoded = decode(localToken)
      setUser(decoded)
      setIsAuth(true)
    }
  }, [])
  console.log(isAuth, 'context')
  return (
    <AuthContext.Provider value={{
      isAuth, user, logIn, logOut
  }}>
      { props.children }
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
