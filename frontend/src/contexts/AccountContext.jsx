import { gql, useLazyQuery, useMutation } from '@apollo/client';
import {
  createContext, useCallback, useContext, useEffect, useMemo, useState,
} from 'react';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom';

const ME_QUERY = gql`
query{
    me{
      _id
      username
      studentID
      firstname
      lastname
      username
      email
      telephone
      year
      role
      degree
      program
      major
    }
  }`;
const LOGIN_MUTATION = gql`
mutation ($username:String!,$password:String!) {
    login(username:$username,password:$password){
    token
    }
}
`;

export const AccountContext = createContext({})

export const AppProvider = ({ children }) => {
  const [user2, setUser] = useState(null)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [loadMe, { data, loading }] = useLazyQuery(ME_QUERY, { fetchPolicy: 'network-only' })
  const [loginMutation] = useMutation(LOGIN_MUTATION)
  const navigate = useNavigate()
  const login = useCallback(
    async (username, password) => {
      const { data: loginData } = await loginMutation({ variables: { username, password } })
      if (loginData?.login?.token) {
        setCookie('token', loginData.login.token, { maxAge: 86400, path: '*' })
        await loadMe()
        navigate('/')
      } else {
        throw new Error(loginData?.login?.message)
      }
    },
    [loadMe, loginMutation, setCookie],
  )
  const logout = useCallback(
    () => {
      removeCookie('token', { maxAge: 86400, path: '*' })
      setUser(null)
      navigate('/login')
    },
    [removeCookie],
  )
  useEffect(
    () => {
      if (data?.me) {
        setUser(data.me ?? null)
      }
    },
    [data],
  )
  useEffect(
    () => {
      const loadData = async () => {
        try {
          await loadMe()
        } catch (err) {
          setUser(null)
          throw err
        }
      }
      if (cookies.token) {
        loadData().catch(console.error)
      }
    },
    [cookies.token, loadMe],
  )
  const value = useMemo(
    () => ({
      loading,
      user2,
      login,
      logout,
      loadMe,
      data
    }),
    [loading, login, logout, user2, loadMe, data],
  )
  return (
    <AccountContext.Provider value={value}>
      {children}
    </AccountContext.Provider>
  )
}
export const useApp = () => useContext(AccountContext)