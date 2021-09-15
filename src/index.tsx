import React, { ReactNode, useContext, useMemo } from 'react';

type RegistryType = Record<string, React.ComponentType<any>>;

const DiContext = React.createContext<RegistryType>({});

interface DiProviderProps<R extends object> {
  children?: ReactNode;
  registry: R;
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
