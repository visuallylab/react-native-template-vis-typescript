import React, { createContext, FunctionComponent } from 'react';
import usePersistStorage from 'react-native-use-persist-storage';
import { StorageKey } from '@/constant';

export type TUser = {
  id: string;
  email: string;
  name: string;
};

export type TUserContext = {
  user: TUser;
  updateUser: React.Dispatch<React.SetStateAction<TUser>>;
  restored: boolean;
};

export const createDefaultUser: () => TUser = () => ({
  id: '',
  email: 'test@test.com',
  name: '',
});

export const UserContext = createContext<TUserContext>({
  user: createDefaultUser(),
  updateUser: () => {
    return;
  },
  restored: false,
});

type TProps = { persist?: boolean };

export const UserProvider: FunctionComponent<TProps> = props => {
  const [user, setUser, restored] = usePersistStorage<TUser>(
    StorageKey.User,
    createDefaultUser,
    {
      persist: props.persist,
      version: 0,
    },
  );

  return (
    <UserContext.Provider value={{ user, updateUser: setUser, restored }}>
      {props.children}
    </UserContext.Provider>
  );
};
