# EZ-DI
Proof of concept tiny dependency injection React library.
- Small (< 0.5 Kb)
- Easy to use
```typescript
// some components in project
const ButtonBase = () => <button className="base"></button>
const RedButton = () => <button className="red"></button>

// 1. in target component. Make component swapable
const Button = diBlock('Button')(ButtonBase)

// 2. Wrap in proveder and set desired component in registry
const  App = () => (
  <DiProvider registry={{ Button: RedButton }}>
    <Button />
  </DiProvider>
)

// result
// <button class="red"></button>
```

### Guide
in progress

### TODO
- Better types(remove any + simple usage with TS).
- Guide.
- Registry control. Dynamucly add/remove/swap components.
- Better docs with examples.

Created using [TSDX](https://github.com/formium/tsdx)