# GitHub License Checker

### Avoid legal complications in the open-source world; Check which of your GitHub repositories are missing licenses.

This project consists of a simple web application that goes over the license-specific stats of a GitHub user's repositories. 
I built it to keep track of which repositories of mine are missing licenses in order to avoid legal complications that could arise from a lack of a license in any repository.

This repository also serves as a study of GitHub's UI/UX design and is therefore meant to be inspired by (but not a copy of) the GitHub website's front-end interface.

## Tech Stack
- JavaScript
- React.js
- Vite.js
- GitHub API
- Tailwind CSS

## Limitations
Since this project uses GitHub's public API, it is restricted in some ways. The project permits access to:
- **60 requests per hour:** Only 60 API calls can be made per hour.
- **Public repositories:** The project goes over all public repositories, including forks that have not been modified, but does not have access to private repositories.

This project also uses Tailwind CSS v4, meaning that some styling components are not compatible with older versions of certain browsers (for example: only Safari 16.4+, Chrome 111+, and Firefox 128+ are fully compatible with Tailwind v4).

## Licensing
This repository falls under the MIT License. 
Feel free to fork this repository to build on top of it or use it for your own purposes.
For more information, see the ```LICENSE``` file.

## Installation
### React + Vite
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration
If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. 
Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
