import React, { ReactNode, useContext, useMemo } from 'react';

type RegistryType = Record<string, React.ComponentType<any>>;

const DiContext = React.createContext<RegistryType>({});

interface DiProviderProps<R extends object> {
  children?: ReactNode;
  registry: R;
}

type Store<I> = {
  [key in keyof I]: I[key] 
}
export class Registry<S extends Record<string, unknown>> {
  constructor(private store: S = {} as S) {}

  get<K extends keyof S>(key: K): S[K] {
    return this.store[key] as unknown as S[K];
  }

  extend<I extends Record<string, unknown>>(instances: I): Registry<S & I> {
    this.store = {
      ...this.store,
      ...instances
    }

    return this as Registry<S & I>;
  }
}

export const DiProvider = <R extends object>({
  children,
  registry,
}: DiProviderProps<R>) => {
  const outerRegistry = useContext(DiContext);

  const mergedRegistry = useMemo(
    () => ({
      ...outerRegistry,
      ...registry,
    }),
    [outerRegistry, registry]
  );

  return (
    <DiContext.Provider value={mergedRegistry}>{children}</DiContext.Provider>
  );
};

export const diBlock = <R extends object>(name: keyof R) => <P extends object>(
  Component: React.ComponentType<P>
) => (props: P) => {
  const registry = useContext(DiContext) as R;
  const ComponentFromRegistry = (registry[
    name
  ] as unknown) as React.ComponentType<P>;

  if (ComponentFromRegistry) {
    return <ComponentFromRegistry {...props} />;
  }

  return <Component {...props} />;
};
