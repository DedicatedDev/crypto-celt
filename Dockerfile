FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
     python3 python3-pip \
    fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 \
    libnspr4 libnss3 lsb-release xdg-utils libxss1 libdbus-glib-1-2 \
    curl unzip wget \
    xvfb
RUN apt install python-is-python3
RUN GECKODRIVER_VERSION=`curl https://github.com/mozilla/geckodriver/releases/latest | grep -Po 'v[0-9]+.[0-9]+.[0-9]+'` && \
   wget https://github.com/mozilla/geckodriver/releases/download/$GECKODRIVER_VERSION/geckodriver-$GECKODRIVER_VERSION-linux64.tar.gz && \
    tar -zxf geckodriver-$GECKODRIVER_VERSION-linux64.tar.gz -C /usr/local/bin && \
    chmod +x /usr/local/bin/geckodriver && \
    rm geckodriver-$GECKODRIVER_VERSION-linux64.tar.gz
RUN FIREFOX_SETUP=firefox-setup.tar.bz2 && \
    apt-get purge firefox && \
    wget -O $FIREFOX_SETUP "https://download.mozilla.org/?product=firefox-latest&os=linux64" && \
    tar xjf $FIREFOX_SETUP -C /opt/ && \
    ln -s /opt/firefox/firefox /usr/bin/firefox && \
    rm $FIREFOX_SETUP
    
RUN CHROMEDRIVER_VERSION=`curl -sS chromedriver.storage.googleapis.com/LATEST_RELEASE` && \
    wget https://chromedriver.storage.googleapis.com/$CHROMEDRIVER_VERSION/chromedriver_linux64.zip && \
    unzip chromedriver_linux64.zip -d /usr/bin && \
    chmod +x /usr/bin/chromedriver && \
    rm chromedriver_linux64.zip
RUN apt --fix-broken install && apt-get install -y libgbm1 
RUN CHROME_SETUP=google-chrome.deb && \
    wget -O $CHROME_SETUP "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb" && \
    dpkg -i $CHROME_SETUP && \
    apt-get install -y -f && \
    rm $CHROME_SETUP

RUN curl -sSL https://raw.githubusercontent.com/sdispater/poetry/master/get-poetry.py | python
RUN CHROM_METAMASK_VERSION=`curl https://github.com/MetaMask/metamask-extension/releases/latest | grep -Po 'v[0-9]+.[0-9]+.[0-9]+'` && CHROM_METAMASK_PURE_VERSION=`echo $CHROM_METAMASK_VERSION | cut -c 2-` && wget https://github.com/MetaMask/metamask-extension//releases/download/$CHROM_METAMASK_VERSION/metamask-chrome-$CHROM_METAMASK_PURE_VERSION.zip &&    mv metamask-chrome-$CHROM_METAMASK_PURE_VERSION.zip metamask.crx
RUN CHROM_METAMASK_VERSION=`curl https://github.com/MetaMask/metamask-extension/releases/latest | grep -Po 'v[0-9]+.[0-9]+.[0-9]+'` && CHROM_METAMASK_PURE_VERSION=`echo $CHROM_METAMASK_VERSION | cut -c 2-` && wget https://github.com/MetaMask/metamask-extension//releases/download/$CHROM_METAMASK_VERSION/metamask-firefox-$CHROM_METAMASK_PURE_VERSION.zip &&   mv metamask-firefox-$CHROM_METAMASK_PURE_VERSION.zip metamask.xpi
ENV PATH="${PATH}:/root/.poetry/bin"
RUN apt update
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get -y install nodejs npm
RUN npm install -g yarn

COPY . /CryptoCelts
WORKDIR /CryptoCelts
RUN yarn && yarn lint && yarn lint --fix && yarn hh:build && yarn typechain:build
RUN yarn poetry && yarn nft:convert-layers-csv && yarn nft:generate-metadata count=80 && yarn nft:generate-car
RUN yarn nft:prepare && yarn typechain:build & yarn hh:node && hh:build
RUN yarn hh:test && yarn hh:deploy:local
