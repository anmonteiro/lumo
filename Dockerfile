FROM jllopis/busybox

MAINTAINER António Nuno Monteiro <anmonteiro@gmail.com>

ADD https://github.com/anmonteiro/lumo/releases/download/1.7.0/lumo_linux64.zip /lumo.zip

RUN unzip lumo.zip \
  && rm -rf lumo.zip \
  && chmod a+x lumo

ADD ./shared-libs/libstdc++.so.6 /lib64

ENTRYPOINT [ "/lumo" ]
