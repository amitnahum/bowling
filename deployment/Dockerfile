FROM node:10.15.3-stretch-slim
COPY . /bowling
WORKDIR /bowling
RUN npm install
RUN npm install -g serve
#RUN npm test || exit
RUN npm run build
CMD ['serve', '-s','build']
