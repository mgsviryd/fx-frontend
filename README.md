# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite.

Here is SPA application - single index.html loads once and uses vue-router to navigate between pages.

Vite gives quick hot-reload page which important for development.

## Environment
| Name    | Description                                                    |
|---------|----------------------------------------------------------------|
| [nvm](https://github.com/nvm-sh/nvm/)     | manager to install and control versions of `Node.js` and `npm` |
| [Node.js](https://nodejs.org/en/)  | JavaScript runtime                                             |
| [npm](https://www.npmjs.com/)      | package manager for JavaScript                                 |

## Setup

### Setup packages

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Compile and Minify and push dist folder to gh-pages

```sh
npm run deploy
```

### Build docker image

```sh
docker build -t your-image-name -f Dockerfile .
```

### Build docker container and run on port your port (here: 8081)

```sh
docker run -p 8081:8081 your-image-namе
```

## Packages
| Name           | Short description                                                                                                             |
|----------------|-------------------------------------------------------------------------------------------------------------------------------|
| [vite](https://vite.dev/guide/)           | quick build Node.js modules (min 10 times compared Webpack), hot-reload for development                                       |
| [vue](https://vuejs.org/)              | split html on .vue components consisting with template, script, style sections                                                |
| [vue-router](https://router.vuejs.org/)     | map url to .vue components (we put it in `view` folder)                                                                       |
| [vuex](https://vuex.vuejs.org/)           | save data between reload page and share it between components                                                                 |
| [vue-i18n](https://vue-i18n.intlify.dev/)       | update page messages without reload page by setting lang                                                                      |
| [jquery](https://jquery.com/ )         | lightweight library for: HTML/DOM manipulation, CSS manipulation, HTML event methods, Effects and animations, AJAX, Utilities |
| [axios](https://axios-rest.com/)          | rest request to servers                                                                                                       |
| [bootstrap-vue-next](https://bootstrap-vue-next.github.io/bootstrap-vue-next/) | write html components in a simple and readable way applying Bootstrap                                                         |
| [fortawesome](https://fontawesome.com/)    | add icons on your site                                                                                                        |
| [chart.js](https://www.chartjs.org/)       | chart visualization  (e.g. line chart)                                                                                        |
| [highcharts](https://www.highcharts.com/)     | graphic visualization (e.g. stock chart)                                                                                      |

> [!NOTE]  
> It is a version for study. You can save memory space by deleting next folders from Git history:
> - screenshot
> - task
> - template
> 
> How to check git memory space:
>> $ git count-objects -vH
>
> How to delete:
> - Remove DIRECTORY from all commits, then remove the refs to the old commits
    (repeat these two commands for as many directories that you want to remove):
>> $ git filter-branch --index-filter 'git rm -rf --cached --ignore-unmatch DIRECTORY/' --prune-empty --tag-name-filter cat -- --all
>
>> $ git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d
> - Ensure all old refs are fully removed
>> $ rm -Rf .git/logs .git/refs/original
>
> - Perform a garbage collection to remove commits with no refs
>> $ git gc --prune=all --aggressive