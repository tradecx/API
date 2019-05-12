let request = require('request'),
    crypto = require('crypto'),
    API = {}, URL = 'https://tradecx.io/api/';

API.accessKey = '';
API.secretKey = '';

// Non-Private API Calls

API.info = (callback) => {
    API.get(URL, (result) => { if (callback) callback(result); }, true);
};

API.currencyList = (callback, includeFork) => {
    API.get(URL + 'currency_list' + (includeFork ? '?extra=true' : ''), (result) => { if (callback) callback(result); }, true);
};

API.tickerList = (callback, noData) => {
    API.get(URL + (noData ? 'markets' : 'tickers'), (result) => { if (callback) callback(result); }, true);
};

API.ticker = (ticker, callback) => {
    API.get(URL + 'tickers/' + ticker, (result) => { if (callback) callback(result); }, true);
};

API.orderBook = (market, callback, asks_limit, bids_limit) => {
    API.get(URL + 'order_book?market=' + market + (asks_limit ? ('&asks_limit=' + asks_limit) : '') + (bids_limit ? ('&bids_limit=' + bids_limit) : ''), (result) => { if (callback) callback(result); }, true);
};

API.marketDepth = (market, callback) => {
    API.get(URL + 'depth?market=' + market, (result) => { if (callback) callback(result); }, true);
};

API.marketTrades = (market, callback, limit) => {
    API.get(URL + 'trades?market=' + market + (limit ? ('&limit=' + limit) : ''), (result) => { if (callback) callback(result); }, true);
};

API.kData = (market, limit, period, callback) => {
    API.get(URL + 'k?market=' + market + '&limit=' + limit + '&period=' + period, (result) => { if (callback) callback(result); }, true);
};

//Private API Calls

API.memberInfo = (callback) => {
    API.createSignature('/api/members/me', 'GET', true, '', (hash, timestamp) => {
        API.get(URL + 'members/me?access_key=' + API.accessKey + '&tonce=' + timestamp + '&signature=' + hash, (result) => { if (callback) callback(result); }, true);
    });
};

API.walletInfo = (currency, callback) => {
    API.createSignature('/api/members/me/wallet', 'GET', true, '&currency=' + currency, (hash, timestamp) => {
        API.get(URL + 'members/me/wallet?access_key=' + API.accessKey + '&currency=' + currency + '&tonce=' + timestamp + '&signature=' + hash, (result) => { if (callback) callback(result); }, true)
    });
};

API.walletsInfo = (callback) => {
    API.createSignature('/api/members/me/wallets', 'GET', true, '', (hash, timestamp) => {
        API.get(URL + 'members/me/wallets?access_key=' + API.accessKey + '&tonce=' + timestamp + '&signature=' + hash, (result) => { if (callback) callback(result); }, true)
    });
};

API.accountHistory = (limit, callback) => {
    API.createSignature('/api/members/history', 'GET', true, '&limit=' + limit, (hash, timestamp) => {
        API.get(URL + 'members/history?access_key=' + API.accessKey + '&limit=' + limit + '&tonce=' + timestamp + '&signature=' + hash, (result) => { if (callback) callback(result); }, true);
    });
};

API.deposit = (txid, callback) => {
    API.createSignature('/api/deposit', 'GET', true, '', (hash, timestamp) => {
        API.get(URL + 'deposit?access_key=' + API.accessKey + '&tonce=' + timestamp + '&txid=' + txid + '&signature=' + hash, (result) => { if (callback) callback(result); }, true);
    }, '&txid=' + txid);
};

API.deposits = (currency, callback, limit) => {
    API.createSignature('/api/deposits', 'GET', true, '&currency=' + currency + (limit ? ('&limit=' + limit) : ''), (hash, timestamp) => {
        API.get(URL + 'deposits?access_key=' + API.accessKey + '&currency=' + currency + (limit ? ('&limit=' + limit) : '') + '&tonce=' + timestamp + '&signature=' + hash, (result) => { if (callback) callback(result); }, true);
    });
};

API.withdraws = (currency, callback, limit) => {
    API.createSignature('/api/withdraws', 'GET', true, '&currency=' + currency + (limit ? ('&limit=' + limit) : ''), (hash, timestamp) => {
        API.get(URL + 'withdraws?access_key=' + API.accessKey + '&currency=' + currency + (limit ? ('&limit=' + limit) : '') + '&tonce=' + timestamp + '&signature=' + hash, (result) => { if (callback) callback(result); }, true);
    });
};

API.myTrades = (market, callback, limit, ts, from, to, orderBy) => {
    API.createSignature('/api/trades/my', 'GET', true, (from ? ('&from=' + from) : '') + (limit ? ('&limit=' + limit) : '') + '&market=' + market + (orderBy ? ('&order_by=' + orderBy) : '') + (ts ? ('&timestamp=' + ts) : '') + (to ? ('&to=' + to) : ''), (hash, timestamp) => {
        API.get(URL + 'trades/my?access_key=' + API.accessKey + (from ? ('&from=' + from) : '') + (limit ? ('&limit=' + limit) : '') + '&market=' + market + (orderBy ? ('&order_by=' + orderBy) : '') + (ts ? ('&timestamp=' + ts) : '') + (to ? ('&to=' + to) : '') + '&tonce=' + timestamp + '&signature=' + hash, (result) => { if (callback) callback(result); }, true);
    });
};

API.depositAddress = (currency, callback) => {
    API.createSignature('/api/deposit_address', 'GET', true, '&currency=' + currency, (hash, timestamp) => {
        API.get(URL + 'deposit_address?access_key=' + API.accessKey + '&currency=' + currency + '&tonce=' + timestamp + '&signature=' + hash, (result) => { if (callback) callback(result); }, true);
    });

};

API.findOrder = (id, callback) => {
    API.createSignature('/api/order', 'GET', true, '&id=' + id, (hash, timestamp) => {
        API.get(URL + 'order?access_key=' + API.accessKey + '&id=' + id + '&tonce=' + timestamp + '&signature=' + hash, (result) => { if (callback) callback(result); }, true);
    });
};

API.orders = (market, callback, state, limit, page, order) => {
    API.createSignature('/api/orders', 'GET', true, (limit ? ('&limit=' + limit) : '') + '&market=' + market + (order ? ('&order_by=' + order) : '') + (page ? ('&page=' + page) : '') + (state ? ('&state=' + state) : ''), (hash, timestamp) => {
        API.get(URL + 'orders?access_key=' + API.accessKey + (limit ? ('&limit=' + limit) : '') + '&market=' + market + (order ? ('&order_by=' + order) : '') + (page ? ('&page=' + page) : '') + '&tonce=' + timestamp + '&signature=' + hash + (state ? ('&state=' + state) : ''), (result) => { if (callback) callback(result); }, true);
    });
};

API.allOrders = (callback) => {
    API.createSignature('/api/orders', 'GET', true, '&market=all', (hash, timestamp) => {
        API.get(URL + 'orders?access_key=' + API.accessKey + '&market=all' + '&tonce=' + timestamp + '&signature=' + hash, (result) => { if (callback) callback(result); }, true);
    });
};

API.createOrder = (market, side, volume, price, callback) => {
    let timestamp = API.timestamp(),
        uri = 'access_key=' + API.accessKey + '&market=' + market + '&price=' + price + '&side=' + side + '&tonce=' + timestamp + '&volume=' + volume;

    API.createSignature('/api/orders', 'POST', false, uri, (hash) => {
        API.post(URL + 'orders?' + uri, (result) => { if (callback) callback(result); }, hash, true);
    });
};

API.cancelOrder = (id, callback) => {
    let timestamp = API.timestamp(),
        uri = 'access_key=' + API.accessKey + '&id=' + id + '&tonce=' + timestamp;

    API.createSignature('/api/order/delete', 'POST', false, uri, (hash) => {
        API.post(URL + 'order/delete?' + uri, (result) => { if (callback) callback(result); }, hash, true);
    });
};

API.cancelSide = (side, callback) => {
    let timestamp = API.timestamp(),
        uri = 'access_key=' + API.accessKey + '&side=' + side + '&tonce=' + timestamp;

    API.createSignature('/api/orders/clear', 'POST', false, uri, (hash) => {
        API.post(URL + 'orders/clear?' + uri, (result) => { if (callback) callback(result); }, hash, true);
    });
};

API.cancelAll = (callback) => {
    let timestamp = API.timestamp(),
        uri = 'access_key=' + API.accessKey + '&tonce=' + timestamp;

    API.createSignature('/api/orders/clear', 'POST', false, uri, (hash) => {
        API.post(URL + 'orders/clear?' + uri, (result) => { if (callback) callback(result); }, hash, true);
    });
};

API.withdraw = (currency, to, amount, callback) => {
    let timestamp = API.timestamp(),
        uri = 'access_key=' + API.accessKey + '&amount=' + amount + '&currency=' + currency + '&to=' + to + '&tonce=' + timestamp;

    API.createSignature('/api/withdraws', 'POST', false, uri, (hash) => {
        API.post(URL + 'withdraws?' + uri, (result) => { if (callback) callback(result); }, hash, true);
    });
};

// Request Expanded

API.post = (url, callback, sign, parse) => {
    request.post(url, { form: { signature: sign } }, (err, resp, b) => {
        if (err) throw err;

        if (callback) callback(parse ? JSON.parse(b) : b);
    });
};

API.get = (url, callback, parse) => {
    request.get(url, (err, resp, b) => {
        if (err) throw err;

        if (callback) callback(parse ? JSON.parse(b) : b);
    });
};

API.createSignature = (uri, type, hasTimestamp, param, callback, param2) => {
    let parameters,
        timestamp = API.timestamp();

    if (!param2)
        param2 = '';

    if (hasTimestamp) parameters = type + '|' + uri + '|access_key=' + API.accessKey + param + '&tonce=' + timestamp + param2;
    else parameters = type + '|' + uri + '|' + param;

    console.log(parameters);

    let hash = crypto.createHmac('sha256', API.secretKey).update(parameters).digest('hex');

    if (callback) callback(hash, hasTimestamp ? timestamp : null);
};

API.timestamp = (callback) => {
    return new Date().getTime();
};

module.exports = API;
