FROM node:12

COPY package*.json /opt/
RUN cd /opt && npm install
RUN ls -hl /opt
RUN ls -hl /opt/node_modules
RUN ls -hl /opt/node_modules/sbolgraph

COPY . /opt/

RUN cd /opt && npm run build

ENTRYPOINT ["/bin/bash", "-c", "cd /opt && npm run dev"]


