import React, { PropsWithChildren, createContext, useState } from 'react';
import { User, UserContextType } from '../@types/User';
import { Recipe } from '../@types/Recipes';
import { getItem } from '../storage';

// @ts-ignore
export const UserContext = createContext<UserContextType>();

function UserProvider({ children }: PropsWithChildren<React.ReactNode>) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [user, setUser] = useState<User>();
  const [currentRecipesPage, setCurrentRecipesPage] = useState(1)
  const [mediaQueryBreakPoint, setMediaQueriBreakPoint] = useState(1)
  const [loginOut, setLoginOut] = useState(false)

  function isLogged() {
    const token = getItem('token')
    if (token) return true
    return false
  }

  return (
    <UserContext.Provider value={{
      recipes, setRecipes, userRecipes, setUserRecipes, favoriteRecipes, setFavoriteRecipes, user, setUser,
      currentRecipesPage, setCurrentRecipesPage, mediaQueryBreakPoint, setMediaQueriBreakPoint,
      loginOut, setLoginOut, isLogged
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
