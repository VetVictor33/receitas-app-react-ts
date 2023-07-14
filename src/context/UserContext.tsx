import React, { createContext, useState,  } from 'react';
import { User, UserContextType } from '../types/User';
import { Recipe } from '../types/Recipes';

export const UserContext = createContext<UserContextType | null>(null);

function UserProvider({ children }: React.PropsWithChildren<React.ReactNode>) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [user, setUser] = useState<User | undefined>();

  return (
    <UserContext.Provider value={{ recipes, setRecipes, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
