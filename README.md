# Vue 3 + Vite 🚀

This template should help get you started developing with Vue 3 in Vite.

Here is SPA application - single index.html loads once and uses vue-router to navigate between pages.

Vite gives quick hot-reload page which important for development.

---

## Live Demo
 

You can view the live demo of this project here:

[🚀 Live Demo](https://mgsviryd.github.io/fx-frontend)

Project deployed using [Github Pages](https://pages.github.com/). How to do that search commit with key `gh-pages`.

Type sub-urls to navigate:
 - ```/``` - route to main page (check count, sync count on different pages, without reload checkout language)
 - ```/chart``` - route to stock chart based on Highchart JS
 - ```/nbrb``` - route to BYN exchange chart

---

## Environment

> ### [**nvm**](https://github.com/nvm-sh/nvm/)  
> Manager to install and control versions of `Node.js` and `npm`
```shell
 curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh 
 ``` 

> ### [**Node.js**](https://nodejs.org/en/)  
> JavaScript runtime
```shell
nvm install 18
```
```shell
nvm ls
```
```shell
nvm use 18
```
```shell
node -v
```
> ### [**npm**](https://www.npmjs.com/)  
> Package manager for JavaScript
```shell
npm -v
```     
> ### [**Docker**](https://www.docker.com/)
> Platform designed to help developers build, share, and run container applications
#### Mac OS
| Name                                                | Description                                                                                                                                                                    |
|-----------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [brew](https://brew.sh/)                            | Manager to install and control versions of packages, e.g. `jdk` and `maven`<br/> ```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"``` |
| [docker](https://www.docker.com/)                   | Platform designed to help developers build, share, and run container applications<br/>```brew install docker```                                                              |

#### PC
| Name                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
|------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| [chocolatey](https://chocolatey.org/)                | Manager to install and control versions of packages, e.g. `jdk` and `maven`<br/>```/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"<br/>Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))``` |
| [docker](https://www.docker.com/)                    | Platform designed to help developers build, share, and run container applications<br/>```choco install docker-desktop```                                                                                                                                                                                                                                                                                                                                           |

---

## Pre-setup

### Clone git repository
```shell
git clone https://github.com/mgsviryd/fx-frontend.git    
```

### Check your ports
By default, we use next ports:
- 8081 - for frontend (must be close), you can choose another one
```shell
nc -zv localhost 8081
```
**Status:** 🚫 Refused

---

## Setup (via command-line)
⚠️ first complete [Pre-setup](#pre-setup)

### Setup packages
```shell
npm install
```

### Compile and Hot-Reload for Development
```shell
npm run dev
```

### Compile and Minify for Production
```shell
npm run build
```

### Compile and Minify and push dist folder to gh-pages
```shell
npm run deploy
```

## Setup (via Docker)
⚠️ do [Pre-setup](##pre-setup) first

### Start docker daemon
On a typical installation the Docker daemon is started by a system utility. For more information see [here](https://docs.docker.com/engine/daemon/start/).

### Build docker image
```shell
docker build -t your-image-name -f Dockerfile .
```

### Run docker container (to expose port 8081)
```shell
docker run --name your-container-name -p 8081:8081 your-image-name
```

### Done
[http://localhost:8081](http://localhost:8081)
### Stop docker container
```shell
docker stop your-container-namе
```

### Remove docker container
```shell
docker rm your-container-namе
```
### Remove docker image
```shell
docker rmi your-image-namе
```

---

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

---

## Git
> ⚠️
> It is a version for study. You can save memory space by deleting next folders from Git history:
> - screenshot
> - task
> - template

### Check git memory space
```shell
git count-objects -vH
```

### How to remove (`screenshot` folder)
> Remove from all commits, then remove the refs to the old commits
(repeat these two commands for as many directories that you want to remove):
```shell
git filter-branch --index-filter 'git rm -rf --cached --ignore-unmatch screenshot/' --prune-empty --tag-name-filter cat -- --all
git for-each-ref --format="%(refname)" refs/original/ | xargs -n 1 git update-ref -d
```
> Ensure all old refs are fully removed:
```shell
rm -Rf .git/logs .git/refs/original
```
> Perform a garbage collection to remove commits with no refs:
```shell
git gc --prune=all --aggressive
```