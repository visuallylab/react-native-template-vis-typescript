import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export type TUseAsyncStorageOptions = {
  persist?: boolean;
};

const defaultOptions = {
  persist: true,
};

/**
 * UseAsyncStorage will return state that'll be consistent with localStorage.
 * @param key the key stored in localStorage
 * @param initialValue defaultValue
 * @param options
 */
const useAsyncStorage = <Value>(
  key: string,
  initialValue: Value | (() => Value),
  {
    persist = defaultOptions.persist,
  }: TUseAsyncStorageOptions = defaultOptions,
): [Value, React.Dispatch<React.SetStateAction<Value>>] => {
  const [state, setState] = useState<Value>(initialValue);

  useEffect(() => {
    if (persist) {
      const restoreStateFromAsyncStorage = async () => {
        try {
          const localStorageValue = await AsyncStorage.getItem(key);
          if (localStorageValue) {
            const parsedValue =
              typeof initialValue === 'string'
                ? localStorageValue
                : JSON.parse(localStorageValue || 'null');
            setState(parsedValue);
            console.debug(`[AsyncStorage]: restore ${key}: `, parsedValue);
          }
        } catch (err) {
          console.error(err);
        }
      };

      // Restore from localStorage when mounted.
      restoreStateFromAsyncStorage();
    } else {
      // If disable persist,
      // remove localStorageValue when mounted.
      AsyncStorage.removeItem(key);
      console.debug(`[AsyncStorage]: remove ${key}`);
    }
  }, []);

  useEffect(() => {
    if (persist) {
      const setStateToAsyncStorage = async () => {
        try {
          const serializedValue =
            typeof state === 'string' ? state : JSON.stringify(state);
          await AsyncStorage.setItem(key, serializedValue);
          console.debug(`[AsyncStorage]: set ${key}: `, state);
        } catch (err) {
          console.error(err);
        }
      };

      // Be consistent with localStorage when update.
      setStateToAsyncStorage();
    }
  }, [state]);

  return [state, setState];
};

export default useAsyncStorage;
