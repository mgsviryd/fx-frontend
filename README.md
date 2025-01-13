# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

> [!NOTE]  
> It is demo version for study. You can save memory while use this code in your project if delete next folders:
> - screenshot
> - task
> - template

## Environment
| Name    | Description                                                    | Source |
|---------|----------------------------------------------------------------|--------|
| nvm     | manager to install and control versions of `Node.js` and `npm` | https://github.com/nvm-sh/nvm  |
| Node.js | JavaScript runtime                                             | https://nodejs.org/en|
| npm     | package manager for JavaScript                                 | https://www.npmjs.com/|

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
| Name           | Short description                                                                                                             | Source                  |
|----------------|-------------------------------------------------------------------------------------------------------------------------------|-------------------------|
| vite           | quick build Node.js modules (min 10 times compared Webpack), hot-reload for development                                       | https://vite.dev/guide/ |
| vue            | split html on .vue components consisting with template, script, style sections                                                | https://vuejs.org/                  |
| vue-router     | map url to .vue components (we put it in `view` folder)                                                                       | https://router.vuejs.org/                 |
| vuex           | save data between reload page and share it between components                                                                 | https://vuex.vuejs.org/                  |
| vue-i18n       | update page messages without reload page by setting lang                                                                      | https://vue-i18n.intlify.dev/                    |
| jquery         | lightweight library for: HTML/DOM manipulation, CSS manipulation, HTML event methods, Effects and animations, AJAX, Utilities | https://jquery.com/                 |
| axios          | http request to servers                                                                                                       | https://axios-http.com/                    |
| bootstrap-vue-next | write html components in a simple and readable way applying Bootstrap                                                         | https://bootstrap-vue-next.github.io/bootstrap-vue-next/                |
| fortawesome    | add icons on your site                                                                                                        | https://fontawesome.com/                    |
| chart.js       | chart visualization  (e.g. line chart)                                                                                        | https://www.chartjs.org/                    |
| highcharts     | graphic visualization (e.g. stock chart)                                                                                      | https://www.highcharts.com/                    |

