FROM nikolaik/python-nodejs
COPY . /CryptoCelts
WORKDIR /CryptoCelts
RUN yarn && yarn lint && yarn lint --fix && yarn hh:build && yarn typechain:build
