import React, { useState } from 'react';
import usePersistStorage from 'react-native-use-persist-storage';

export type TPersistContext<T> = {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
  restored: boolean;
};

export const createPersistContext = <T extends {}>({
  defaultData,
  storageKey,
  version = 0,
}: {
  defaultData: T;
  storageKey: string;
  version?: number;
}) => {
  const createDefaultData = () => defaultData;

  const Context = React.createContext<TPersistContext<T>>({
    data: createDefaultData(),
    setData: () => {
      return;
    },
    restored: false,
  });

  const Provider: React.FC<{
    persist?: boolean;
  }> = props => {
    const [data, setData, restored] = usePersistStorage<T>(
      storageKey,
      createDefaultData,
      {
        persist: props.persist,
        version,
      },
    );

    return (
      <Context.Provider value={{ data, setData, restored }}>
        {props.children}
      </Context.Provider>
    );
  };

  const useData = () => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error(
        `Context error: context [${storageKey}] must be used within a Provider`,
      );
    }
    const { data, setData, restored } = context;

    return {
      data,
      setData,
      restored,
    };
  };

  return {
    Provider,
    Context,
    useData,
  };
};

export type TContext<T> = {
  data: T;
  setData: React.Dispatch<React.SetStateAction<T>>;
};

export const createContext = <T extends {}>(defaultData: T) => {
  const createDefaultData = () => defaultData;
  const Context = React.createContext<TContext<T>>({
    data: createDefaultData(),
    setData: () => {
      return;
    },
  });

  const Provider: React.FC = props => {
    const [data, setData] = useState<T>(createDefaultData);

    return (
      <Context.Provider value={{ data, setData }}>
        {props.children}
      </Context.Provider>
    );
  };

  const useData = () => {
    const context = React.useContext(Context);
    if (!context) {
      throw new Error(`Context error: context must be used within a Provider`);
    }
    const { data, setData } = context;

    return {
      data,
      setData,
    };
  };

  return {
    Provider,
    Context,
    useData,
  };
};
