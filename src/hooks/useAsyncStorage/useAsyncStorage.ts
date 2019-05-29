import { useState, useEffect, useRef } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { TMigrationFuncParams } from './createMigrate';

export type TLocalstorageValue<Value> = {
  _currentVersion: number;
  value: Value;
};

export type TUseAsyncStorageOptions<Value = any> = {
  persist?: boolean;
  version?: number;
  migrate?:
    | ((params: TMigrationFuncParams) => TLocalstorageValue<Value>)
    | null;
};

const defaultOptions = {
  version: 0,
  persist: true,
  migrate: null,
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
    version = defaultOptions.version,
    persist = defaultOptions.persist,
    migrate = defaultOptions.migrate,
  }: TUseAsyncStorageOptions<Value> = defaultOptions,
): [Value, React.Dispatch<React.SetStateAction<Value>>, boolean] => {
  const isMounted = useRef<boolean>(false);
  const currentVersion = useRef<number>(version);
  const [state, setState] = useState<Value>(initialValue);
  const [restored, setRestored] = useState<boolean>(false);

  useEffect(() => {
    if (persist) {
      const setStateToAsyncStorage = async (
        forceValue?: TLocalstorageValue<Value>,
      ) => {
        const value = forceValue || {
          _currentVersion: currentVersion.current,
          value: state,
        };
        try {
          const serializedValue = JSON.stringify(value);
          await AsyncStorage.setItem(key, serializedValue);
          console.debug(`[AsyncStorage]: set ${key}: `, value);
        } catch (err) {
          console.error(err);
        }
      };

      const restoreStateFromAsyncStorage = async () => {
        try {
          const localStorageValue = await AsyncStorage.getItem(key);
          if (localStorageValue) {
            let parsedValue = JSON.parse(localStorageValue || 'null');
            if (parsedValue && parsedValue._currentVersion === undefined) {
              parsedValue = {
                _currentVersion: 0,
                value: parsedValue,
              };
            }

            if (migrate) {
              parsedValue = migrate({
                key,
                state: parsedValue,
                version: currentVersion.current,
              });
              await setStateToAsyncStorage(parsedValue);
              currentVersion.current = parsedValue._currentVersion;
            }
            setState(parsedValue.value);
            console.debug(`[AsyncStorage]: restore ${key}: `, parsedValue);
          } else {
            // If localStorage has no value, set initial value to storage
            setStateToAsyncStorage();
          }
        } catch (err) {
          console.error(err);
        }
        setRestored(true);
      };

      if (!isMounted.current) {
        // Restore from localStorage when first mount.
        restoreStateFromAsyncStorage();
        isMounted.current = true;
      } else {
        // Be consistent with localStorage when update.
        setStateToAsyncStorage();
      }
    } else {
      // If disable persist,
      // remove localStorageValue when mounted.
      AsyncStorage.removeItem(key);
      console.debug(`[AsyncStorage]: remove ${key}`);
      setRestored(true);
    }
  }, [state]);

  return [state, setState, restored];
};

export default useAsyncStorage;
