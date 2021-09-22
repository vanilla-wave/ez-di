# EZ-DI

## ALPHA VERSION. NOT FOR PRODUCTION USAGE

Proof of concept tiny dependency injection React library.

- Small (< 0.5 Kb)
- Easy to use

```typescript
// some components in project
const ButtonBase = () => <button className="base"></button>
const RedButton = () => <button className="red"></button>

// import diBlock and DiProvider
import { DiProvider, diBlock } from '@vanilla-wave/ez-di';

// 1. in target component. Make component swapable
const Button = diBlock('Button')(ButtonBase)

// 2. Wrap in provider and set desired component in registry
const  App = () => (
  <DiProvider registry={{ Button: RedButton }}>
    <Button />
  </DiProvider>
)

// result
// <button class="red"></button>
```

## Install

```bash
npm i @vanilla-wave/ez-di
```

## How it works

Main idea - give opportunity to swap components in app tree  without writting code.

Wrapping component into `diBlock('ComponentName', Component)` creates slot. In place of component `<Button />` appears slot with name `SubmitButton`. There are no changes in render, because default slot value - component itself.

```typescript
const ButtonComponent = (...) => (...)
const Button = diBlock('SubmitButton', ButtonComponent)

const App = () =>  (
  <form className="some-form">
    {'...'}
    {/* inside Button there are slot with name 'SubmitButton' */}
    <Button />
  </form>
)
```

You can set component for slot in registry `<DiProvider registry={...}>`

When you set in registry component with name `SubmitButton`, it will be render in place of `<Button />`.

```typescript
const ButtonComponent = (...) => (...)
const Button = diBlock('SubmitButton', ButtonComponent)

const RedButton = () => (/* Another Button */)

const App = () =>  (
  <DiProvider registry={{ SubmitButton: RedButton }}>
    <form className="some-form">
      {'...'}
      {/* here RedButton will be rendered */}
      <Button />
    </form>
  </DiProvider>
)
```

You can nest DiProvider. Registry value will be merged. It useful, when you need  another override for part of application.

## How to start

1. Find replacable part in your app. Wrap them in diBlock and specify name. You will use it later to swap component.
Also you can use explicit typing `diBlock<RegistryType>` to prevent type errors.

```typescript
interface RegistryType {
  Button: React.ComponentType<ButtonPropsType>;
}

const ButtonBase: FC<ButtonPropsType> = ({ label }) => (
  <button className="base">{label}</button>
);
const Button = diBlock<RegistryType>('Button')(ButtonBase);
```

0. Wrap your app in DiRegistry. Optional – you can use registry type here `<DiProvider<RegistryType> ... >` 

```typescript
interface RegistryType {
  Button: React.ComponentType<ButtonPropsType>;
}

const OverrideButton: FC<{ label: number }> = ({ label }) => (
  <button className="override">{label}</button>
);

const App = () => (
  <div>
    {/* @ts-expect-error */}
    <DiProvider<RegistryType> registry={{ Button: OverrideButton }}>
      <Button label="123" />
    </DiProvider>
  </div>
);
```

2. Create components for slots. When you set component in registry it will render instead of default component(wrapped in diBlock)

**Important** – override component should have same props as base components.

```typescript
const RedButton: FC<ButtonPropsType> = ({ label }) => (
  <button className="override">{label}</button>
);
```

3. Now you can manage slots content with registry value. For example:

- set another components for mobile device
- set another component if user in experiment
- etc

Falsy value will be ignored, and default component will be rendered.

```typescript
const registry = {
  Button: isUserInExperiment ? RedButton :  undefined,
}

const App = () => (
  <DiProvider registry={{ Button: OverrideButton }}>
    <Button label="123" />
  </DiProvider>
);
```

## PROJECT TODO

- Registry control. Dynamicly add/remove/swap components.
- library parts description in README

Created using [TSDX](https://github.com/formium/tsdx)
