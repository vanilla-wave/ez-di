import React, { useContext, useMemo } from 'react';

type Registry = Record<string, any>;
const DiContext = React.createContext<Registry>({});

export const DiProvider: React.FC<{ registry: Registry }> = ({
  children,
  registry,
}) => {
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

export const diBlock = (name: string) => (Component: any) => (props: any) => {
  const registry = useContext(DiContext);
  const ComponentFromRegistry = registry[name];

  if (ComponentFromRegistry) {
    return <ComponentFromRegistry {...props} />;
  }

  return <Component {...props} />;
};
