FROM resin/rpi-raspbian

ENV NGINX_VERSION 1.10.*

RUN apt-get update \
	&& apt-get install -y ca-certificates nginx=${NGINX_VERSION} \
	&& rm -rf /var/lib/apt/lists/*

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
	&& ln -sf /dev/stderr /var/log/nginx/error.log

# COPY NGINX conf
COPY nginx.conf /etc/nginx/nginx.conf

# COPY content after build-prod
COPY dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
