import { createContext } from 'react';
import UserState from '../states/UserState';


export const UserContext = createContext({})

export function UserProvider({ children }: {children: React.ReactNode}) {
  const state = UserState()
  return <UserContext.Provider value={state}>
    {children}
  </UserContext.Provider>
}