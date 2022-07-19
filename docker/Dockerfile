FROM ethereum/client-go as privatenode

RUN mkdir -p /client
RUN chown root /client
WORKDIR /client

# for initializing with our desired configuration
COPY genesis.json /client/genesis.json

# for unlocking the test account
COPY UTC--2021-09-19T06-12-01.985998519Z--5aa4c644554d07febafea3267a252bd1eebdd4a8 /chaindata/keystore/UTC--2021-09-19T06-12-01.985998519Z--5aa4c644554d07febafea3267a252bd1eebdd4a8

# initialize the geth node with our config data
RUN geth init --datadir /chaindata /client/genesis.json

EXPOSE 8545 8546 30303 30303/udp 30304/udp
STOPSIGNAL SIGINT
ENTRYPOINT ["geth"]