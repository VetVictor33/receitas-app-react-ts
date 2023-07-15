import React, { createContext, useState,  } from 'react';
import { User, UserContextType } from '../types/User';
import { Recipe } from '../types/Recipes';

export const UserContext = createContext<UserContextType>();

function UserProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>([]);
  const [user, setUser] = useState<User>();

  return (
    <UserContext.Provider value={{ recipes, setRecipes, userRecipes, setUserRecipes, favoriteRecipes, setFavoriteRecipes,  user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
