# weaken-it

[![minzipped](https://badgen.net/bundlephobia/minzip/weaken-it?color=blue)](https://bundlephobia.com/package/weaken-it) [![typescript](https://badgen.net/npm/types/weaken-it)](https://www.npmjs.com/package/weaken-it)

Lightweight tree-shakeable WeakMap utility functions and related patterns, with typescript support.

> Every weakness contains within itself a strength
> [Shūsaku Endō](https://it.wikipedia.org/wiki/Shūsaku_Endō)

![Dandelion by Herbert Goetsch](https://images.unsplash.com/photo-1544954412-78da2cfa1a0c?&auto=format&fit=crop&h=400&w=800&q=80)
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

// store to context
wit(SomeReference, ContextNamespace, AnyValue)

// retrieve
wit(SomeReference, ContextNamespace)

</script>
```

## :wrench: How it works

At its core it's just a temporary namespaced key-value store built **on top of native js WeakMap and Map**, using a set of personal conventions enforced by `weakenIt()` function. Both WeakMap and Map were chosen over plain objects for their advantages in terms of **r/w speed** and **key flexibility**.

* Creates a WeakMap, `wStore`
* WeakMap ensures that each instance is stored once and its associated context expires with it
* `weakenIt` ensures that each Map context is stored / recreated only once and always reused
* Then `weakenIt`, or even shorter `wit`, stores / gets any key-value from the related context
* When reference is lost or `wStore.prototype.deleted || wDel`, its context gets garbage-collected

## :thinking: Why

I was very excited about [WeakRef](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef#avoid_where_possible) and [FinalizationRegistry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry#avoid_where_possible) coming to javascript but both their behaviours are not yet guaranteed, making them [very  hard to reason about](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_management#weakrefs_and_finalizationregistry), at least for me.

:ring_buoy: **WeakMap** and WeakSet to the rescue!

* They ensure **stored data will expire after** the bound instance, or will always be available as long the associated reference exists
* They enable patterns I reach for when I need to **extend libraries, js natives, work with dom, store temporary data** or when I'm generally concerned about **potential memory leaks**
* It can safely **bridge context data** inside [closures](https://blog.logrocket.com/escape-memory-leaks-javascript/) or where unreachable
* They're fast, native, memory-efficient by nature, [fully supported](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap#browser_compatibility) and reliable
* They give me peace of mind :relieved:

## :muscle: Usage

For more examples, please refer to [tests](https://github.com/giandomenicodisalvatore/weaken-it/tree/main/tests) folder.

```js
import { weakenIt } from 'weaken-it'

// augment an external library or native
class Example extends SomeLibraryOrNative {

  constructor(extraData, ...libraryRequired) {
    super(...libraryRequired)

    // extraData never outlives the instance
    weakenIt(this, 'temp', extraData + 'Example constructor')
  }

  overridden(...methodArgs) {
    // bridged inside
    const extraData = weakenIt(this, 'temp')    
    doSomethingWith(temp)

    // still works without modifying the original implementation
    return SomeLibraryOrNative.prototype.overridden.apply(this, methodArgs)
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

## :toolbox: Available exports

### Core

* **weakenIt**, core function to interact with contexts
* **wStore**, stores all contexts

### Shortcuts

* **wit**, alias to weakenIt
* **wDel**, hard **reset** context
* **wCtx**, gets the entire context
* **wCast**, casts a **copy** of the context as object
* **wSure**, upsert if stored is nullish
* **wMap**, new Map(), dirt-cheap **iterable** WeakMap
* **wSet**, new Set(), dirt-cheap **iterable** WeakSet
* **wKV**, creates a Object.create(null)
* **wArr**, creates []
* **wObj**, creates {}

### Utils

* **wMemo**, memoized fn
* **wCount**, global counter

## :ballot_box_with_check: TODO

[x] Import and standardize other patterns
[x] Randomize tests
[x] Documentation

## Disclaimer

This library is **very opinionated**, mainly bult for reusability between personal projects. It encapsulates and summarizes some of my most recurring personal approaches involving native WeakMap, which I really :heart:
