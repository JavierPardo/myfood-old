FROM nginx:stable-alpine
# nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
# copy ssl certificates
COPY certs/myfoodapp.com.bo_bundle.crt /etc/ssl/certs/myfoodapp.com.bo_bundle.crt
COPY certs/myfoodapp.com.bo.key /etc/ssl/private/myfoodapp.com.bo.key