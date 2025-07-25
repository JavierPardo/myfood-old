# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# build environment
FROM node:12.19.0 as builder
RUN mkdir /app
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
RUN npm ci
RUN npm install react-scripts@3.4.1 -g --silent
COPY . /app
RUN npm run build

# production environment
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# nginx configuration file
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
# ssl certificates
#ADD nginx/certs /etc/nginx/certs
COPY nginx/certs/dev-admin.crt /etc/ssl/certs/dev-admin.crt
COPY nginx/certs/dev-admin.key /etc/ssl/private/dev-admin.key

EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]