# Translator

## 技术栈 (Technology Stack)
整个项目由 Javascript（Typescript，Typescript 是强类型的 Javascript 版本）实现，没有使用其它语言。

### Frontend Framework
- **React.js**
- **Next.js**

这两样东西提供了一种比直接写 HTML+JS 更易懂并且更容易管理代码的方式。

### UI Component
- **Material UI**

提供 UI 组件，以及页面布局能力。例如按钮更漂亮，页面布局不会挤到一起等。

### Third Party Lib
- **OpenAI**

提供 OpenAI API 的访问能力。

## 程序结构

### 前端
主要前端代码集中在 `app/page.tsx` 文件中，在浏览器中运行。

### 后端
除了页面外，对 OpenAI 的访问，放在后端的 Route Handler 中：`/api/translator/route.ts`。
后端代码在服务器上运行。

### 通信
前端通过一个 URL 访问后端：
- URL：`http://localhost:3000/api/translator`
- HTTP POST method（为了可以传递 JSON，也就是待翻译内容）

这两个源程序，是几乎全部的代码。其余文件均为 Next.js 自动生成。文件的目录组织形式按照 Next.js 的 App Route 要求，由 `create-next-app` 生成。

## 如何启动程序

1. 在 terminal 中，进入项目目录，运行：`npm run dev`
2. 在浏览器中，打开 URL：[http://localhost:3000](http://localhost:3000)

## 如何调试程序  

### 调试前端代码（`page.tsx`）

1. 在 terminal 中，进入项目目录，运行：`npm run dev`
2. 在 `page.tsx` 中，设置断点。
3. 在 VS Code 中，选择 debug 菜单，运行：`debug client-side`。

### 调试后端代码（`route.ts`）

由于 Next.js 的 Route Handler 难以直接在 VS Code 中设置断点，所以采用了打印输出调试信息的方式。

1. 在 terminal 中，进入项目目录，运行：`npm run dev`
2. 在浏览器中打开 URL：[http://localhost:3000](http://localhost:3000)
3. 修改 `route.ts` 代码，通过 `console.log` 打印运行时刻的程序状态，例如运行到了哪一行等。
4. 在 terminal 中检查打印输出。

## 如何修改 OpenAI API Key

OpenAI API Key 目前是保存在一个后端的环境变量中，环境变量在 `.env.local` 文件中设置。

## 如何修改翻译的目标语言

1. 在 `page.tsx` 页面中增加一个语言选择列表  
   参考：[Material UI - React Select](https://mui.com/material-ui/react-select/)

2. 在 Layout（`page.tsx` 的 `return` 中）增加语言选择列表。

3. 在 `Home` 函数中，增加一个新的 `useState()`，用来保存用户选择的语言。

4. 在 `Home` 函数中，增加一个 handler，用来在用户做了选择后，正确的设置用户选择的语言。

5. 修改前后端通信协议：  
   目前前后端通信使用 HTTP POST 协议，协议 body 是一个 JSON，JSON 只有一个 key：`toBeTranslated`，内容为待翻译的内容。  
   需要增加一个语言的选择，将用户的语言选择，作为 JSON 中的另一个 key 从前端传递给后端，该 key 的值为用户选择的语言。

6. 修改 OpenAI API 调用的 prompt  
   后端在调用 OpenAI API 时，需要根据语言修改 prompt。
