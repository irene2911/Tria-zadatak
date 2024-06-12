# Tria zadatak

This project is a modern web application built with Next.js, incorporating several carefully chosen libraries to enhance functionality and user experience. The application has been deployed to Vercel and can be accessed [here](https://tria-zadatak.vercel.app/). This README will guide you through setting up the project locally and provide explanations for the chosen libraries.
Prerequisites:

- Node.js (18.17 or later) or
- npm or
- yarn or
- bun

## Installation

&nbsp;1. install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

&nbsp;2. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

## Library Choices and Justifications

### Next.js:

#### Reason:

- Due to CORS issues Next.js was selected as it provides an excellent way to handle these problems efficiently. Additionally, React recommends Next.js as the best framework for building React applications due to its optimized performance and developer experience.

#### Benefits:

- Solves CORS errors efficiently.
- Enhances SEO and performance through server-side rendering (SSR) and static site generation (SSG).
- Provides a seamless development experience with features like API routes and incremental static regeneration.

### date-fns:

#### Reason:

- date-fns is a modern JavaScript date utility library that provides a comprehensive yet simple way to handle dates in JavaScript.

#### Benefits:

- Lightweight and modular, allowing you to import only what you need.
- Provides a consistent and easy-to-use API for common date operations.

### shadcn/ui:

#### Reason:

- shadcn/ui is used for its intuitive and flexible UI components, which are essential for building modern and interactive user interfaces.

#### Benefits:

- Simplifies the creation of complex UI elements like tables.
- Enhances the overall user experience with pre-designed, customizable components.

### clsx:

#### Reason:

- clsx is a tiny utility for constructing className strings conditionally.
- It helps in managing dynamic class names effectively.

#### Benefits:

- Lightweight and minimalistic, keeping the bundle size small.
- Improves code readability and maintainability when dealing with conditional class names.

### react-day-picker:

#### Reason:

- react-day-picker is used for creating interactive and customizable date pickers, which are essential for user interactions involving date selection.

#### Benefits:

- Highly customizable and easy to use.
- Provides a range of features out-of-the-box, including localization and accessibility support.

## How to run tests:

- Start development server
- open new terminal
- run bunx playwright test or npx playwright test
