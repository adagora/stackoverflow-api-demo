# Demo stackoverflow api

tag browser UI provided by the StackOverflow API (https://api.stackexchange.com/docs).

It includes:

- pagginated table,
- selector component based on MUI
- filtering
- fetching by tanstack query
- basic storybook

# Setup Instructions

1. Clone the Repository

```
git clone
```

2. Navigate to the Project Directory:

```
cd project-name
```

3. Install Dependencies:

```
npm install
```

4. Run the Project:

```
npm run dev
```

5. Open the Application:
   Visit http://localhost:3000 in your web browser to view the application.

6. Run test

```
npm run test
```

7. Run storybook

```
npm run storybook
```

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname
  }
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
