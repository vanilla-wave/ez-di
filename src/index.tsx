import React, { useContext, useMemo } from 'react';

type RegistryDefaultType = Record<string, any>;
type DiContextType<RegistryType = RegistryDefaultType> = React.Context<
  RegistryType
>;

const DiContext: DiContextType = React.createContext<RegistryDefaultType>({});

export const DiProvider: React.FC<{ registry: RegistryDefaultType }> = ({
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

export const diBlock = (name: string) => <P extends object>(
  Component: React.ComponentType<P>
) => (props: P) => {
  const registry = useContext(DiContext);
  const ComponentFromRegistry = registry[name];

  if (ComponentFromRegistry) {
    return <ComponentFromRegistry {...props} />;
  }

  return <Component {...props} />;
};
