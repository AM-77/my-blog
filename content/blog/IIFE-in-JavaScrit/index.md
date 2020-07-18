---
title: IIFE in JavaScrit
date: "2020-07-18T13:50:13.284Z"
description: "What is an IIFE in JavaScript and why you would want to use it?"
---

## What is an IIFE?

`IIFE` or `Immediately Invoked Function Expression` is 

>   A JavaScript function that runs as soon as it is defined. - [MDN web docs](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)

as simple as that `IIFE` is an anonymous function that get executed immediately after it's declaration.



**NOTE:** some developers prefer calling it a `self-executing anonymous function` or `self-invoked anonymous function`, but yeah it's just different names for the same thing.



#### Example:

This is how to create an `IIFE`:

```javascript
(function() {
    // write the code you want it to be executed immediately.
  	console.log('Whatever World!');
})();
```

**NOTE:** You can use the arrow functions syntax `(() => { ... })()`.



So, what's going on here ?

Here, we declared an anonymous function `function() { ... }`, then we wrapped it in parenthesis `(function() { ... })` to turn it into a function expression, finally we executed that function expression using parenthesis `(function() { ... })()`.

it is fairly simple, right? Now the question is why would anyone use IIFEs?



## Why use IIFE?

The main reason is to avoid polluting the global namespace, all the variables used inside the IIFE (like in any other function) are not accessible outside its scope, and that because of the surrounding parenthesis, which gives the IIFE its own scope.



## Some notes

-   There is some alternate ways to create an IIFE:

```javascript
void function() { console.log('Whatever World!'); }()
```

Do you see that `void` keyword at the beginning ? that's my friend what _enforces_ JavaScript to treat that anonymous function an expression. ( notice that we've removed the wrapping parenthesis )

Instead of the `void` you can use `!`, `~`, `-`... or any unary operator.



-   You can set parameters to the IIFE:

```javascript
(function(foo, bar) { console.log(foo + ' ' + bar); })('Whatever', 'World!')
```



-   You can return a value from the IIFE:

```javascript
const foo = (function() { return 'Whatever World!'; })()
```



-   You will _often_ see IIFE used in JavaScript libraries or frameworks, you may already noticed this if you have dug into the jQuery source code, or one of it's plugins.