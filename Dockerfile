FROM nikolaik/python-nodejs
COPY . /CryptoCelts
WORKDIR /CryptoCelts
RUN yarn && yarn lint && yarn lint --fix && yarn hh:build && yarn typechain:build
RUN yarn poetry && yarn nft:convert-layers-csv && yarn nft:generate-metadata count=80 && yarn nft:generate-car
RUN yarn nft:prepare && yarn typechain:build & yarn hh:node && hh:build
RUN yarn hh:test && yarn hh:deploy:local
