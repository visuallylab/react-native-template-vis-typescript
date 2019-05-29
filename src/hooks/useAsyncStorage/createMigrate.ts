import { TLocalstorageValue } from './useAsyncStorage';

export type TMigration = {
  [version: number]: (state: any) => any;
};

export type TMigrationFuncParams = {
  key: string;
  state: TLocalstorageValue<any>;
  version: number;
};

export type TCreateMigrateConfig = {
  debug?: boolean;
};

const createMigrate = <AfterValue>(
  migrations: TMigration,
  configs: TCreateMigrateConfig = { debug: false },
) => {
  return ({
    key,
    state,
    version,
  }: TMigrationFuncParams): TLocalstorageValue<AfterValue> => {
    const { debug } = configs;
    if (!state.value) {
      if (debug) {
        console.debug(`[${key}]: no inbound value, skipping migration`);
      }
      return state;
    }
    if (state._currentVersion === version) {
      if (debug) {
        console.debug(`[${key}]: version match, no migration`);
      }
      return state;
    }
    if (state._currentVersion > version) {
      console.error(`[${key}]: downgrading version is not supported`);
      return state;
    }

    const migrationKeys = Object.keys(migrations)
      .map(v => parseInt(v, 10))
      .filter(ver => version >= ver && ver > state._currentVersion)
      .sort((a, b) => a - b);

    if (debug) {
      console.debug(`[${key}]: migration keys`, migrationKeys);
    }
    const migrated = migrationKeys.reduce(({ value }, versionKey) => {
      if (debug) {
        console.debug(`[${key}]: running migration ${versionKey}`);
      }
      return {
        _currentVersion: versionKey,
        value: migrations[versionKey](value),
      };
    }, state);

    return migrated;
  };
};

export default createMigrate;
