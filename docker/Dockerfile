FROM nginx:1.28-bookworm
# FROM nginx:1.28-bookworm-perl
# FROM nginx:1.28-bookworm-otel
# perl: Perl
# otel: OpenTelemetory

COPY ./_site /usr/share/nginx/html
COPY ./share/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80 7143
