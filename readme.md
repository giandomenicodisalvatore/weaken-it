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

### Npm

```bash
npm i weaken-it
```

### CDN

```html
<script type="module">
const { wit } = await import("https://cdn.jsdelivr.net/npm/weaken-it@latest")
</script>
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

* **wit**, alias to weakenIt
* **wDel**, hard reset context
* **wCtx**, gets the entire context
* **wCast**, casts the context as dictionary
* **wSure**, upsert if stored is nullish
* **wMap**, new Map(), dirt-cheap **iterable** WeakMap
* **wSet**, new Set(), dirt-cheap **iterable** WeakSet
* **wKV**, creates a Object.create(null)
* **wArr**, creates []
* **wObj**, creates {}

### Utils

Some of my most recurring related patterns

* **wMemo**, memoized fn
* **wCount**, global counter

## TODO

* Import and standardize other patterns
* Randomized and beter-type tests
* Documentation

## Disclaimer

This library is **very opinionated**, it encapsulates and standardizes some recurring code patterns I usually reach for.
