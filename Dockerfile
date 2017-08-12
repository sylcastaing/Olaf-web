FROM akkerman/rpi-nginx

# COPY NGINX conf
COPY nginx.conf /etc/nginx/nginx.conf

# COPY content after build-prod
COPY dist /usr/share/nginx/hml