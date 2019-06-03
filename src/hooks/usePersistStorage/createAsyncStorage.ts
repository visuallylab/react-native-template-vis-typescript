import asyncStorage from '@react-native-community/async-storage';
import { StorageKey } from '@/constant';

type TValue = string | null;

type TCallback = (err: any, data: TValue | any[]) => void;

const noop: TCallback = () => null;

const createAsyncStorage = () => {
  return {
    async getItem(key: StorageKey, callback = noop) {
      try {
        const result: TValue = await asyncStorage.getItem(key);

        callback(null, result);

        return result;
      } catch (error) {
        callback(error, null);
        throw error;
      }
    },

    async setItem(key: StorageKey, value: string, callback = noop) {
      try {
        await asyncStorage.setItem(key, value);
        callback(null, value);
      } catch (error) {
        callback(error, null);
        throw error;
      }
    },

    async removeItem(key: StorageKey, callback = noop) {
      try {
        await asyncStorage.removeItem(key);
        callback(null, null);
      } catch (error) {
        callback(error, null);
        throw error;
      }
    },
  }
};

export default createAsyncStorage;
