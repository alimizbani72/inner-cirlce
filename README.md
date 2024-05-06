# Chainmind

Chainmind is a sophisticated project built using Next.js and TypeScript, offering a robust framework for rapid development of scalable applications. This project leverages a range of modern development tools and practices to ensure high quality and maintainability.

## Description

This project integrates various technologies including Next.js, TypeScript, Material UI, React Query, and many others, to create a powerful application foundation.

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone git@github.com:Chainmind-AG/inner-circle.git
cd inner-circle
```

2. **Install dependencies:**

    Using Bun:
```bash
bun install
```
3. **Set up environment variables:**
    
    Copy the .env.example file to .env and fill in the necessary details.
```bash
cp .env.example .env
```
## Available Scripts
In the project directory, you can run:

```bash
bun run dev
```
Runs the app in the development mode.
Open http://localhost:7500 to view it in your browser.

The page will reload when you make changes.
You may also see any lint errors in the console.
```bash
bun run build
```
Builds the app for production to the .next folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
```bash
bun run start
```
Runs the built app in production mode.
Ensure that you have run bun run build first.
```bash
bun run lint
```
Runs the linter on the project files in the src directory.
```bash
bun run lint:fix
```
Runs the linter and fixes fixable issues in the project files in the src directory.
```bash
bun run format
```
Formats the project files in the src directory.
```bash
bun run codegen
```
Generates API service hooks based on OpenAPI specs, formats, and lints the generated code.
```bash
bun run clear-all
```
Removes node_modules, build folders, and other generated files to clean up the project directory.
```bash
bun run re-start
```
Cleans up the project directory and restarts the development server.
```bash
bun run re-build
```
Cleans up the project directory and rebuilds the app.

## Husky
This project is configured with Husky to ensure that every commit passes linting and tests. Make sure that Husky is properly installed and initialized after cloning the repository.