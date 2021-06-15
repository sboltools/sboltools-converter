FROM node:14

COPY package*.json /opt/
RUN cd /opt && yarn install

RUN ls -hl /opt
RUN ls -hl /opt/node_modules
RUN ls -hl /opt/node_modules/sbolgraph
RUN ls -hl /opt/node_modules/sbolgraph/node_modules

COPY . /opt/

RUN cd /opt && yarn run build

ENTRYPOINT ["/bin/bash", "-c", "cd /opt && yarn run dev"]


