import React, { createContext, FunctionComponent } from 'react';
import useAsyncStorage, {
  TUseAsyncStorageOptions,
} from '@/hooks/useAsyncStorage';
import { AsyncStorageKey } from '@/constant';

export type TUser = {
  id: string;
  email: string;
  name: string;
  avatar?: string;
};

export type TUserContext = {
  user: TUser;
  updateUser: React.Dispatch<React.SetStateAction<TUser>>;
};

const createDefaultUser = () => ({
  id: '0',
  email: 'test@example.com',
  name: 'user',
});

export const UserContext = createContext<TUserContext>({
  user: createDefaultUser(),
  updateUser: () => {
    return;
  },
});

type TProps = {} & TUseAsyncStorageOptions;

export const UserProvider: FunctionComponent<TProps> = props => {
  const [user, setUser] = useAsyncStorage<TUser>(
    AsyncStorageKey.User,
    createDefaultUser,
    props,
  );

  return (
    <UserContext.Provider value={{ user, updateUser: setUser }}>
      {props.children}
    </UserContext.Provider>
  );
};
