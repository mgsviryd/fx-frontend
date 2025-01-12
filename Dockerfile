#Docker:
#   https://www.youtube.com/watch?v=uLp-zgset00

#    * make sure you set up and logged in docker
#    * change below if different: platform, port

#    to build:   $ docker build -t your-image-name -f Dockerfile . --platform=linux/amd64
#    to run:     $ docker run -p 8081:8081 your-image-name
#    to remove:
#        - image:            $ docker rmi <image-id>
#        - all images:       $ docker rmi $(docker images -a -q)
#        - container:        $ docker rm ID_or_Name
#        - all containters:  $ docker rm $(docker ps -a -f status=exited -q)
#    to stop:
#        - all containers:   $ docker stop $(docker ps -a -q)

FROM node:alpine AS build

COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /dist /usr/share/nginx/html
COPY --from=build nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
