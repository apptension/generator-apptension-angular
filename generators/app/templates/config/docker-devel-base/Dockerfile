FROM phusion/baseimage

CMD ["/sbin/my_init"]

# Install apt packages
RUN apt-get update && apt-get install -y \
    unzip \
    gcc make \
    libmysqlclient-dev libxml2-dev \
    wget \
    build-essential checkinstall \
    curl libcurl4-gnutls-dev \
    libreadline-gplv2-dev libncursesw5-dev libssl-dev libsqlite3-dev tk-dev libgdbm-dev libc6-dev libbz2-dev

# Compile Python
RUN mkdir -p /opt \
    && cd /opt \
    && wget http://python.org/ftp/python/2.7.10/Python-2.7.10.tgz \
    && tar -xvf Python-2.7.10.tgz \
    && cd Python-2.7.10 \
    && ./configure \
    && make \
    && checkinstall

# Compile PHP
RUN mkdir -p /opt \
    && cd /tmp \
    && wget --trust-server-names http://us2.php.net/get/php-5.4.25.tar.bz2/from/us1.php.net/mirror \
    && tar -xvf php-5.4.25.tar.bz2 \
    && cd php-5.4.25 \
    && ./configure --prefix=/opt/php --enable-bcmath --with-mysql --with-pdo-mysql --with-openssl --with-curl \
    && make install \
    && export PATH=$PATH:/opt/php

# Install Node
RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - \
    && apt-get install -y nodejs

