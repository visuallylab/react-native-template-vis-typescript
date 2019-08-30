import { StorageKey } from '@/constant';
import { createPersistContext } from '@/utils/context';

export type TUser = {
  id: string;
  email: string;
  name: string;
};

const {
  Context: UserContext,
  Provider: UserProvider,
  useData: useUser,
} = createPersistContext({
  defaultData: {
    id: '',
    email: 'test@test.com',
    name: '',
  },
  storageKey: StorageKey.User,
});

export { UserContext, UserProvider, useUser };
