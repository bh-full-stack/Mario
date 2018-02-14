FROM ubuntu

ARG APP_HOST

ENV APP_HOST ${APP_HOST}

ARG API_HOST

ENV API_HOST ${API_HOST}

ARG API_OUTER_PORT

ENV API_OUTER_PORT ${API_OUTER_PORT}

RUN apt-get update -y &&  \
    apt-get install -y nginx npm

ADD entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

WORKDIR /var/www/html

ADD ./etc /etc

RUN ln -s /etc/nginx/sites-available/mario /etc/nginx/sites-enabled/mario

RUN sed -i -e "s/server_name \[servername\];/server_name ${APP_HOST};/g" /etc/nginx/sites-available/mario

EXPOSE 80

ENTRYPOINT /usr/local/bin/entrypoint.sh