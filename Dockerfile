FROM alpine:latest
MAINTAINER António Nuno Monteiro <anmonteiro@gmail.com>

# install dependencies
RUN apk update && apk upgrade && apk add openssl

RUN mkdir -p /out

RUN wget https://github.com/anmonteiro/lumo/releases/download/1.5.0/lumo_linux64.zip \
  && unzip lumo_linux64.zip \
  && mv lumo /out

WORKDIR /out

ENTRYPOINT [ "/out/lumo" ]
