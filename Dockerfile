FROM node:12

COPY package*.json /opt/
RUN cd /opt && npm install

COPY . /opt/

RUN cd /opt && npm run build

ENTRYPOINT ["/bin/bash", "-c", "cd /opt && npm run dev"]


