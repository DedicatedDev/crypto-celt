FROM ubuntu
ENV DEBIAN_FRONTEND=noninteractive
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y \
     python3 python3-pip \
    fonts-liberation libappindicator3-1 libasound2 libatk-bridge2.0-0 \
    libnspr4 libnss3 lsb-release xdg-utils libxss1 libdbus-glib-1-2 \
    curl unzip wget \
    xvfb
RUN apt install python-is-python3