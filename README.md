## AWS instance config files with `-rw-r--r-- 1 root root` permissions

- SUPERVISOR

  - **/etc/supervisor/conf.d/wallaclone.conf:**

    ```
    [program:wallaclone]
    command:/home/apps/.nvm/versions/node/v23.10.0/bin/node server.js
    user=apps
    directory=/home/apps/wallaclone-node
    autostart=true
    autorestart=true
    environment=MONGO_URI="mongodb://<USER_NAME>:<USER_PASS>@<HOST>:<PORT>/<DATABASE_NAME>",JWT_SECRET="<YOUR_SUPER_SECRET_STRING>",RABBITMQ_BROKER_URL="<YOUR_RABBIT_BROKER_URL>"
    ```

  - **/etc/supervisor/conf.d/microservices.conf:**

    ```
    [program:microservices]
    command:/home/apps/.nvm/versions/node/v23.10.0/bin/node recoveryPassConsumer.js
    user=apps
    directory=/home/apps/microservices
    autostart=true
    autorestart=true
    environment=RABBITMQ_BROKER_URL="<YOUR_RABBIT_BROKER_URL>",EMAIL_PASS="<SMTP_USER_PASS>"
    ```

- NGINX

  - **/etc/nginx/sites-available/wallaclone-node:**

    ```
    server {
    server_name api.wallaclone.keepcoders.duckdns.org;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_redirect off;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }


        listen 443 ssl; # managed by Certbot
        ssl_certificate <ROUTE_TO_SECRET>; # managed by Certbot
        ssl_certificate_key <ROUTE_TO_SECRET>; # managed by Certbot
        include <ROUTE_TO_SECRET>; # managed by Certbot
        ssl_dhparam <ROUTE_TO_SECRET>; # managed by Certbot


    }
    server {
        if ($host = api.wallaclone.keepcoders.duckdns.org) {
            return 301 https://$host$request_uri;
        } # managed by Certbot


    server_name api.wallaclone.keepcoders.duckdns.org;
        listen 80;
        return 404; # managed by Certbot


    }
    ```

  - **/etc/nginx/sites-available/wallaclone-react:**

    ```
    server {
    server_name wallaclone.keepcoders.duckdns.org;
    root /var/www/wallaclone-react;
    index index.html;
    location / {
        try_files $uri $uri/ /index.html;
    }


        listen 443 ssl; # managed by Certbot
        ssl_certificate <ROUTE_TO_SECRET>; # managed by Certbot
        ssl_certificate_key <ROUTE_TO_SECRET>; # managed by Certbot
        include <ROUTE_TO_SECRET>; # managed by Certbot
        ssl_dhparam <ROUTE_TO_SECRET>; # managed by Certbot


    }
    server {
        if ($host = wallaclone.keepcoders.duckdns.org) {
            return 301 https://$host$request_uri;
        } # managed by Certbot


    server_name wallaclone.keepcoders.duckdns.org;
        listen 80;
        return 404; # managed by Certbot


    }
    ```
