# weaken-it

Lightweight tree-shakeable js WeakMap utilities and related patterns

> \
> Every weakness contains within itself a strength
> [Shūsaku Endō](https://it.wikipedia.org/wiki/Shūsaku_Endō)
> \
> ![Dandelion by Herbert Goetsch](https://images.unsplash.com/photo-1544954412-78da2cfa1a0c?&auto=format&fit=crop&h=400&w=800&q=80)
*Photo by [Herbert Goetsch](https://unsplash.com/photos/SGKQh9wNgAk/) on [Unsplash](https://unsplash.com/photos/SGKQh9wNgAk)*

---

## :man_technologist: Installation

Enjoy tree-shaking Using any bundler

```bash
npm i weaken-it
```

## :wrench: How it works

It's a temporary namespaced store guaranteed to be available as long as the referenced instance.

* Creates a WeakMap
* Ensures any instance is stored once
* Saves a new Map once for each object
* Re-uses it as a namespace store
* Sets / gets any key-value for you
* When reference is lost everything is gc'ed
* Freeing you from memory management

## :thinking: Why

I was very excited about [WeakRef](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef#avoid_where_possible) and [FinalizationRegistry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry#avoid_where_possible) coming to javascript, but both their behaviours are not guaranteed and **[very  hard to reason about](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management#weakrefs_and_finalizationregistry)**, at least for me.

:ring_buoy: **WeakMap** and WeakSet to the rescue!

* They ensure **stored data will expire after** the bound instance
* They enable patterns I reach for when I need to **extend libraries or natives**
* It can safely **bridge context data** inside [closures](https://blog.logrocket.com/escape-memory-leaks-javascript/) or where unreachable
* They're fast, native, memory-efficient by nature, [fully supported](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#browser_compatibility) and reliable
* They give me peace of mind :relieved:

## :muscle: Usage

```js
import { weakenIt } from 'weaken-it'

// augment an external library or native
class Example extends SomeLibraryOrNative {

  constructor(extraData, ...libraryRequired) {
    super(...libraryRequired)

    // extraData never outlives the instance
    weakenIt(this, 'temp', extraData + 'Example constructor')
  }

  overridden() {
    // bridged inside
    const extraData = weakenIt(this, 'temp')    
    doSomethingWith(temp)

    // still works without modifying the original implementation
    return SomeLibraryOrNative.prototype.overridden.apply(this)
  }
}

let exampleInstance = new Example(
  'extra data from: ',
  'library needed data'
)

function useExtraData() {
  console.log(weakenIt(example, 'temp'))
}

useExtraData()
// extra data from: Example constructor

example = null 
useExtraData()
// undefined (gc'ed)
```

## Available exports

### Core

Source of all the weakness

* wStore, stores all contexts
* weakenIt, core function to access contexts

### Shortcuts

To save a few key-strokes

* **wMap**, new Map(), iterable instead of new WeakMap
* **wSet**, new Set(), iterable instead of new WeakSet
* **wKV**, Object.create(null)
* **wArr**, []
* **wObj**, {}

### Utils

Some of my most recurring related patterns

* **wMemo**, memoized fn
* **wCount**, global counter

## TODO

* Import and consolidate other patterns from my projects
* Write jsdocs for each export

## Disclaimer

This library is very opinionated, initially it was built for myself, in order to encapsulate, standardize and reuse some recurring code patterns I reach for when I am concerned about memory-leaks.
