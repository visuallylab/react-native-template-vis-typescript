import { Platform } from 'react-native';
import sensitiveInfo, { RNSensitiveInfoOptions } from 'react-native-sensitive-info';

import { StorageKey } from '@/constant';

type TValue = string | null;

type TCallback = (err: any, data: TValue | any[]) => void;

// react-native-sensitive-info returns different a different structure on iOS
// than it does on Android.
//
// iOS:
// [
//   [
//     { service: 'app', key: 'foo', value: 'bar' },
//     { service: 'app', key: 'baz', value: 'quux' }
//   ]
// ]
//
// Android:
// {
//   foo: 'bar',
//   baz: 'quux'
// }
//
// See https://github.com/mCodex/react-native-sensitive-info/issues/8
//
// `extractKeys` adapts for the different structure to return the list of keys.
const extractKeys = Platform.select({
  ios: (items: [any[]]) => items[0].map(item => item.key),
  android: Object.keys,
});

const noop: TCallback = () => null;

/**
 * Please use carefully, and store only secure information.
 * If you want to open TouchID or FaceID, please refer https://github.com/mCodex/react-native-sensitive-info#methods
 * @param options react-native-info options
 */
const createSensitiveStorage = (options: RNSensitiveInfoOptions = {}) => {
  return {
    async getItem(key: StorageKey, callback = noop) {
      try {
        // getItem() returns `null` on Android and `undefined` on iOS;
        // explicitly return `null` here as `undefined` causes an exception
        // upstream.
        let result: TValue = await sensitiveInfo.getItem(key, options);

        if (typeof result === 'undefined') {
          result = null;
        }

        callback(null, result);

        return result;
      } catch (error) {
        callback(error, null);
        throw error;
      }
    },

    async setItem(key: StorageKey, value: string, callback = noop) {
      try {
        await sensitiveInfo.setItem(key, value, options);
        callback(null, value);
      } catch (error) {
        callback(error, null);
        throw error;
      }
    },

    async removeItem(key: StorageKey, callback = noop) {
      try {
        await sensitiveInfo.deleteItem(key, options);
        callback(null, null);
      } catch (error) {
        callback(error, null);
        throw error;
      }
    },

    async getAllKeys(callback = noop) {
      try {
        const values = (await sensitiveInfo.getAllItems(options)) as any;
        const result = extractKeys(values);

        callback(null, result);

        return result;
      } catch (error) {
        callback(error, null);
        throw error;
      }
    },
  };
};

export default createSensitiveStorage;
