import React, { PropsWithChildren, createContext, useState } from 'react';
import { User, UserContextType } from '../@types/User';
import { Recipe } from '../@types/Recipes';

// @ts-ignore
export const UserContext = createContext<UserContextType>();

function UserProvider({ children }: PropsWithChildren<React.ReactNode>) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [user, setUser] = useState<User>();
  const [currentRecipesPage, setCurrentRecipesPage] = useState(1)
  const [mediaQueryBreakPoint, setMediaQueriBreakPoint] = useState(1)
  const [logginOut, setLogginOut] = useState(false)

  return (
    <UserContext.Provider value={{
      recipes, setRecipes, userRecipes, setUserRecipes, favoriteRecipes, setFavoriteRecipes, user, setUser,
      currentRecipesPage, setCurrentRecipesPage, mediaQueryBreakPoint, setMediaQueriBreakPoint, logginOut, setLogginOut
    }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
