FROM ubuntu:16.04
MAINTAINER António Monteiro <anmonteiro@gmail.com>

# install dependencies
RUN apt-get update
RUN apt-get -y install ocaml libelf-dev apt-transport-https git make g++ python \
  python-pip python-dev build-essential curl chrpath zip unzip \
  software-properties-common python-software-properties \
  && apt-get clean

# Install Java
RUN \
  echo oracle-java8-installer shared/accepted-oracle-license-v1-1 select true | debconf-set-selections && \
  add-apt-repository -y ppa:webupd8team/java && \
  apt-get update && \
  apt-get install -y oracle-java8-installer && \
  rm -rf /var/lib/apt/lists/* && \
  rm -rf /var/cache/oracle-jdk8-installer

# Install Node & Yarn

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 7.8.0

RUN wget https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz \
  && tar -xJf "node-v$NODE_VERSION-linux-x64.tar.xz" -C /usr/local --strip-components=1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar.xz"

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
  apt-get update && apt-get -y install yarn

ENV JAVA_HOME /usr/lib/jvm/java-8-oracle

# Install AWS CLI (needed for build artifacts)

RUN pip install --upgrade awscli

# Install Boot

ENV BOOT_VERSION=2.7.1
ENV BOOT_INSTALL=/usr/bin

RUN mkdir -p $BOOT_INSTALL \
&& curl -fsSLo $BOOT_INSTALL/boot https://github.com/boot-clj/boot-bin/releases/download/latest/boot.sh \
   && chmod 755 $BOOT_INSTALL/boot

ENV PATH=$PATH:$BOOT_INSTALL

ENV LANG C.UTF-8

ENV JAVA_TOOL_OPTIONS -Dfile.encoding=UTF8

ENV BOOT_HOME /.boot
ENV BOOT_AS_ROOT yes
ENV BOOT_LOCAL_REPO /m2
ENV BOOT_JVM_OPTIONS="-client -XX:+TieredCompilation -XX:TieredStopAtLevel=1 -Xmx2g -XX:+UseConcMarkSweepGC -XX:+CMSClassUnloadingEnabled -Xverify:none"

RUN mkdir -p /out

RUN git clone https://github.com/anmonteiro/lumo.git /out \
  && cd /out \
  && git checkout b1879f421ebdf5ec623a273aa57502ef7c654a31 \
  && boot release-ci \
  && ls | grep -v tmp | xargs rm -rf

WORKDIR /out

COPY package.json /out
COPY yarn.lock /out

RUN yarn install

COPY . /out

CMD [ "/bin/bash" ]
