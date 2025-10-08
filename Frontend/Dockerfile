# Usa la imagen oficial de PHP con Apache
# Puedes cambiar '8.3-apache' a la versión que necesites, por ejemplo: '8.2-apache', '8.1-apache', etc.
FROM php:8.3-apache

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /var/www/html

# Instala extensiones comunes de PHP
# Aquí estamos instalando mysqli (para MySQL/MariaDB) y pdo_mysql.
# La instalación de extensiones se hace con el script 'docker-php-ext-install'
RUN docker-php-ext-install mysqli pdo pdo_mysql

# Opcional: Instala Composer (el gestor de dependencias de PHP)
# Descarga el instalador de Composer
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

# Opcional: Habilita el módulo de reescritura de Apache (si usas rutas amigables)
RUN a2enmod rewrite

# El puerto 80 ya está expuesto por la imagen base de Apache.
# Los archivos de tu proyecto serán montados en /var/www/html a través de docker-compose.