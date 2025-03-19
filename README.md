# GitHub License Checker
This repository contains a simple web application that checks the license of a user's GitHub repository. 
I built it to keep track of which repositories of mine are missing licenses.

## Limitations
Since this project uses GitHub's public API, it is limited to 60 requests per hour.
- only 60 requests per hour
- only public repositories

## Licensing
This repository falls under the MIT License. 
Feel free to fork this repository to build on top of it or use it for your own purposes.
For more information, see the ```LICENSE``` file.

## React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. 
Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
