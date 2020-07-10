---
title: Build Your Own deno-dotenv
date: "2020-06-24T12:14:03.284Z"
description: "In this post we will build a deno-dotenv module which is module inspired from the node dotenv module"
---

Today we are going to build a `deno-dotenv` module inspired from the node dotenv module

**What is the `node dotenv` module ?**

> Dotenv is a zero-dependency module that loads environment variables from a `.env` file into [`process.env`](https://nodejs.org/docs/latest/api/process.html#process_process_env). Storing configuration in the environment separate from code is based on [The Twelve-Factor App](http://12factor.net/config) methodology. 

for more information: check [it's page on npm](https://www.npmjs.com/package/dotenv) and [it's repository on github](https://github.com/motdotla/dotenv).

**what is a .env file ?** 

>`.env` is the file that contains the environment variables you want to load to your application, each line of the .env file has this format `KEY=VALUE`

example:

```
HOST=https://www.example.com
PORT=7700
KEY=J46Sq8r4s5d9
```



that out of the way, let's get started by defining the steps to create this module:

## The main steps

These are the main steps to build this module:

1.  Read the content from the `.env`.
2.  Parse the environment variables from the content.
3.  Set environment variables in [`Deno.env`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.env).



### 1. Read the content from the `.env`:

Let's start by creating the `mod.ts` file and add this function to it

```typescript
const readFileToStrSync = (filePath: string): string => {
    const bytes = Deno.readFileSync(filePath)
    const fileContent = new TextDecoder("utf-8").decode(bytes)
    return fileContent
}
```

*NOTE:* You can name the file however you want, but as a best practice we are going to stick to `mod.ts`



What does this function do is: 

 - Synchronously reads and returns the entire content of a file as an array of bytes. using the [`Deno.readFileSync(filePath)`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.readFileSync) function.
 - Convert the array of bytes to a string using the [`new TextDecoder("utf-8").decode(bytes)`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#TextDecoder) method.
 - return the content of the file a string.



Now that we have the `.env` file content let's parse the environment variables in it.



### 2. Parse the environment variables:

To do that let's add the `parse` function to the `mod.ts` file

```typescript
const LINE_BREAK: RegExp = /\r\n?|\n/

const parse = (envContent: string): string[][] => {
    const envList = envContent.split(LINE_BREAK)
    let parsedContent: string[][] = []
    for ( let i = 0; i < envList.length; i++) {
        parsedContent.push(envList[i].split("="))
    }
    return parsedContent
}
```

what does this code do is: 

-   The `LINE_BREAK` is a regular expression that matches the line break.
-   The `parse` function takes the content of the `.env` file as a parameter of type string ( the string returned from the previous function `readFileStrSync` ), split the content into separate lines ( because each line contain one environment variable with the structure `KEY=VALUE` ) using the `split` function with `LINE_BREAK` RegExp as a parameter, then loop throw all the lines and retrieve the `KEY` and the `VALUE` in a form of an array of strings `[KEY, VALUE]` and push it to the two-dimensional array `parsedContent` which will be returned when the loop is completed.



Now we have the environment variables in a form of a two-dimensional array, all we have left to do is to set it to the [`Deno.env`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.env) so it will be accessible in all the application.



### 3. Set the environment variables in [`Deno.env`](https://doc.deno.land/https/github.com/denoland/deno/releases/latest/download/lib.deno.d.ts#Deno.env):

Now, let's add the `setEnv` function to the `mod.ts` file

```typescript
const setEnv = (parsedEnv: string[][]): void => {
  for (let i = 0; i < parsedEnv.length; i++) {
    Deno.env.set(parsedEnv[i][0], parsedEnv[i][1])
  }
}
```

This function takes the environment variables in a form of a two-dimensional array ( returned from the `parse` function ) and add them to the `Deno.env` object with the `Deno.env.set()` function.



Now we have all the functions we need created, but they are not doing anything yet, they have to collaborate with each other to provide the functionality we are looking for. So let's just create a function to do that let's give a name of `dotenv`

```typescript
const dotenv = (envFilePath?:string) => {
  const filePath: string = envFilePath || ".env"
  const fileContent = readFileToStrSync(filePath)
  const parsedEnv = parse(fileContent)
  setEnv(parsedEnv)
}
```

This function take an optional parameter `envFilePath` which is the path to the `.env` file ( if it's provided the function will use it, if not the function will use '.env' as a path value ), then using this path `filePath` to read the content of the `.env` file synchronously using the `readFileToStrSync(filePath)`, then parse the result using the `parse(fileContent)` function, then uses the parsed result in the `setEnv(parsedEnv)` function to set the environment variables in the `Deno.env` object.

### 4. Finally `export`

Now that we have the functionality create and ready, we need just to export the `dotenv` function so the users can use it in their apps.

```typescript
export default dotenv
```

 

**# Let's test the module**

First create a `.env` file and add some `KEY=VALUE` pairs, something like: 

```
PASSWORD=1234567
KEY=12T1S654Ts6sc5fsd4Q6np9dx2A
```

Then create a typescript file, call it `test.ts` or however you want, import the `dotenv` function from the `dotenv` module we just created, and execute it, so that the environment variables will be available to use from the `Deno.env` object

```typescript
import dotenv from "./mod.ts"
// or you can use import  if from this URL
// import dotenv from "https://raw.githubusercontent.com/AM-77/deno-dotenv/master/mod.ts"
dotenv()
```

now create a snapshot of the environment variables from the `Deno.env` using the `Deno.env.toObject() ` function and just use it:

```typescript
const env = Deno.env.toObject()
console.log("PASSWORD: ", env.PASSWORD)
console.log("KEY: ", env.KEY)
```

Run your `test.ts `using the flags `--allow-read` `--allow-env`

```bash
$ deno run --allow-read --allow-env test.ts
PASSWORD: 1234567
KEY: 12T1S654Ts6sc5fsd4Q6np9dx2A
```

And that's all, we are finished. Thank you.

Here is [the source code](https://github.com/AM-77/deno-dotenv) (I re-factored it a little bit).