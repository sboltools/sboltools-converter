FROM node:12

COPY package*.json /opt/
RUN cd /opt && yarn install

COPY . /opt/

RUN cd /opt && yarn run build

ENTRYPOINT ["/bin/bash", "-c", "cd /opt && yarn run dev"]


