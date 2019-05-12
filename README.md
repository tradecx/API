
## TradeCX Simple API

Import `./tcx`, set your `accessKey` and `secretKey`.

```
let API = require('./tcx');

API.accessKey = 'ACCESS_KEY';
API.secretKey = 'SECRET_KEY';

```

The following is a list of API calls and their parameters:



### - `.info(callback)`

Example:

```

API.info((result) => { console.log(result); });

```

Expected Result (may vary):

```
{ version: 'Version 1.0.1',
  timestamp: 1557432810.4442585,
  total_volume: 0.00121474,
  btc_volume: 0.00029059,
  ltc_volume: 0.06668724,
  doge_volume: 212.04244876 }
```



### - `.currencyList(callback, includeFork)`

The `includeFork` parameter gives details on the type of coin (i.e. Bitcoin, Ethereum, CryptoNote).

Example:

```
API.currencyList((result) { console.log(result); }, false /*true*/);

```

Expected Result (may vary depending on parameters):

```
{ btc: { id: 1, code: 'btc', name: 'Bitcoin' },
  ltc: { id: 2, code: 'ltc', name: 'Litecoin' },
  eth: { id: 3, code: 'eth', name: 'Ethereum' },
  doge: { id: 4, code: 'doge', name: 'Dogecoin' },
  jokr: { id: 5, code: 'jokr', name: 'Joker' },
  znd: { id: 6, code: 'znd', name: 'Zenad' },
  b2b: { id: 7, code: 'b2b', name: 'B2BCoin' },
  adv2: { id: 8, code: 'adv2', name: 'AdevPlus2.0' },
  osc: { id: 9, code: 'osc', name: 'Oscillate' },
  keg: { id: 10, code: 'keg', name: 'Kegcoin Gold' },
  elph: { id: 11, code: 'elph', name: 'Elphyrecoin' },
  nbx: { id: 12, code: 'nbx', name: 'NibbleClassic' },
  hitc: { id: 13, code: 'hitc', name: 'HITC' },
  btcm: { id: 14, code: 'btcm', name: 'BitcoinMono' },
  tlrm: { id: 15, code: 'tlrm', name: 'Tellurium' },
  mon: { id: 16, code: 'mon', name: 'Bitcoin Monster' } }
```



### - `.tickerList(callback, noData)`

When the `noData` parameter is set to true, the call returns a list of just the markets. Setting `noData` to false will return market data such as price, volume, high, low, etc.

Example:

```
API.tickerList((result) => { console.log(result); }, false);
```

Expected Result (may vary depending on parameters):

```
[ { id: 'ltcbtc', name: 'BTC/LTC' },
  { id: 'ethbtc', name: 'BTC/ETH' },
  { id: 'dogebtc', name: 'BTC/DOGE' },
  { id: 'jokrbtc', name: 'BTC/JOKR' },
  { id: 'jokrdoge', name: 'DOGE/JOKR' },
  { id: 'zndbtc', name: 'BTC/ZND' },
  { id: 'adv2btc', name: 'BTC/ADV2' },
  { id: 'b2bbtc', name: 'BTC/B2B' },
  { id: 'oscbtc', name: 'BTC/OSC' },
  { id: 'oscltc', name: 'LTC/OSC' },
  { id: 'kegbtc', name: 'BTC/KEG' },
  { id: 'elphbtc', name: 'BTC/ELPH' },
  { id: 'nbxbtc', name: 'BTC/NBX' },
  { id: 'hitcbtc', name: 'BTC/HITC' },
  { id: 'btcmltc', name: 'LTC/BTCM' },
  { id: 'btcmdoge', name: 'DOGE/BTCM' },
  { id: 'tlrmltc', name: 'LTC/TLRM' },
  { id: 'tlrmdoge', name: 'DOGE/TLRM' },
  { id: 'monbtc', name: 'BTC/MON' },
  { id: 'kegdoge', name: 'DOGE/KEG' },
  { id: 'mondoge', name: 'DOGE/MON' } ]
```



### - `.ticker(ticker, callback)`

Receive information about a specific ticker. The `ticker` paramter is similar to the `id` object in the `tickerList` result (i.e. `oscltc`, `ltcbtc`, `kegdoge`). Alternatively, these ids are present in the URL of any market on the main website (i.e. `https://tradecx.io/markets/kegdoge`)

Example:

```
API.ticker('oscltc', (result) => { console.log(result); });
```

Expected Result (may vary):

```
{ at: 1557434013,
  ticker:
   { buy: '0.00000001',
     sell: '0.00000002',
     low: '0.00000001',
     high: '0.00000002',
     last: '0.00000001',
     vol: '6534255.4459875',
     volbtc: '0.0008344',
     volquote: '0.06783728991975',
     change: '0.0',
     name: 'LTC/OSC',
     currency: 'Oscillate' } }
```



### - `.orderBook(market, callback, asks_limit, bids_limit)`

Get a list of the order book for a specific market. `market` parameter follows the same principle as the previous example. The `asks_limit` and `bids_limit` denotes the length of the array to be returned. These parameters can be null.

Example:

```
API.orderBook('oscltc', (result) => { console.log(result); }, 1, 1);

```

Expected Result (may vary depending on parameters):

```
{ asks:
   [ { id: 1283,
       side: 'sell',
       ord_type: 'limit',
       price: '0.00000002',
       avg_price: '0.0',
       state: 'wait',
       market: 'oscltc',
       created_at: '2019-05-09T17:15:35+08:00',
       volume: '1500000.0',
       remaining_volume: '1500000.0',
       executed_volume: '0.0',
       trades_count: 0 } ],
  bids:
   [ { id: 1239,
       side: 'buy',
       ord_type: 'limit',
       price: '0.00000001',
       avg_price: '0.00000001',
       state: 'wait',
       market: 'oscltc',
       created_at: '2019-05-09T03:37:21+08:00',
       volume: '11524771.0',
       remaining_volume: '5239989.1',
       executed_volume: '6284781.9',
       trades_count: 13 } ] }
```



### - `.marketDepth(market, callback)`

Example:

```
API.marketDepth('oscltc', (result) => { console.log(result); });
```

Expected Result (may vary depending on parameters):

```
{ timestamp: 1557434814,
  asks:
   [ [ '0.0000005', '1000000.0' ],
     [ '0.0000003', '1000000.0' ],
     [ '0.00000025', '1000000.0' ],
     [ '0.00000024', '10555.87320921' ],
     [ '0.0000002', '1000000.0' ],
     [ '0.00000004', '2340000.0' ],
     [ '0.00000003', '3375800.0' ],
     [ '0.00000002', '14727050.44053289' ] ],
  bids: [ [ '0.00000001', '16025332.34600004' ] ] }
```



### - `.marketTrades(market, callback, limit)`

Example:

```
API.marketTrades('oscltc', (result) => { console.log(result); }, 1);
```

Expected Result (may vary depending on parameters):

```
[ { id: 596,
    price: '0.00000001',
    volume: '115005.0',
    funds: '0.00115005',
    market: 'oscltc',
    created_at: '2019-05-10T04:14:16+08:00' } ]
```



### - `.kData(market, limit, period, callback)`

`limit` -> Length of the array returned.
`period` -> Time period (15, 30, 60, 120, etc.).

Example:

```
API.kData('oscltc', 10, 60, (result) => { console.log(result) });
```

Expected Result (may vary depending on parameters):

```
[ [ 1557399600, 1e-8, 1e-8, 1e-8, 1e-8, 192415 ],
  [ 1557403200, 1e-8, 1e-8, 1e-8, 1e-8, 0 ],
  [ 1557406800, 1e-8, 1e-8, 1e-8, 1e-8, 0 ],
  [ 1557410400, 1e-8, 1e-8, 1e-8, 1e-8, 0 ],
  [ 1557414000, 1e-8, 1e-8, 1e-8, 1e-8, 146551 ],
  [ 1557417600, 1e-8, 1e-8, 1e-8, 1e-8, 985104.9 ],
  [ 1557421200, 1e-8, 2e-8, 1e-8, 2e-8, 8470.5335 ],
  [ 1557424800, 2e-8, 2e-8, 2e-8, 2e-8, 0 ],
  [ 1557428400, 2e-8, 2e-8, 1e-8, 1e-8, 447984 ],
  [ 1557432000, 1e-8, 1e-8, 1e-8, 1e-8, 115005 ] ]
```



### - `.orders(market, callback, state, limit, page, order)`
Returns an array of the user's orders. Each of the parameters can be set to filter out information.

`market` -> Market parameter (`all` parameter returns orders from all markets).
`state` -> Order state, can be `wait` (active) or `done` (finished). Default: `wait`.
`limit` -> Number of elements to return in the array. Default: `100`
`page` -> Returns a filters out array by page. (i.e. set limit=2, and use page to filter through results.) Default: `1`
`order` -> Returns orders by ascending or descending order. Can be `asc` or `desc`. Default: `asc`

The `state`, `limit`, `page`, and `order` parameters are optional. You may ignore any, or all of them.

Examples:

```
API.orders('all', (result) => { console.log(result); }, 'wait', 20, 1, 'desc');
API.orders('oscltc', (result) => { console.log(result); });
API.orders('kegbtc', (result) => { console.log(result); }, 'done', 10);
```

Expected Result (may vary depending on parameters):

```
[ { id: 1634,
    side: 'sell',
    ord_type: 'limit',
    price: '0.00000003',
    avg_price: '0.0',
    state: 'wait',
    market: 'oscbtc',
    created_at: '2019-05-12T01:11:46+08:00',
    volume: '6680712.78765843',
    remaining_volume: '6680712.78765843',
    executed_volume: '0.0',
    trades_count: 0 } ]
```



### - `.findOrder(id, callback)`
Find an order by order id.

Example:

```
API.findOrder(1634, (result) => { console.log(result); });
```

Expected Result (may vary depending on parameters):

```
{ id: 1634,
  side: 'sell',
  ord_type: 'limit',
  price: '0.00000003',
  avg_price: '0.0',
  state: 'wait',
  market: 'oscbtc',
  created_at: '2019-05-12T01:11:46+08:00',
  volume: '6680712.78765843',
  remaining_volume: '6680712.78765843',
  executed_volume: '0.0',
  trades_count: 0,
  trades: [] }
```



### - `.myTrades(market, callback, limit, ts, from, to, orderBy)`
Returns your trades for a given market.

Example:

```
API.myTrades('oscltc', (result) => { console.log(result); });
API.myTrades('oscltc', (result) => { console.log(result); }, 2, null, null, null, 'asc');
```

Expected Result (may vary depending on parameters):

```
[ { id: 45,
    price: '0.00000001',
    volume: '100.0',
    funds: '0.000001',
    market: 'oscltc',
    time: '2019-05-02T00:18:15Z',
    order_id: 211 },
  { id: 46,
    price: '0.00000006',
    volume: '10.0',
    funds: '0.0000006',
    market: 'oscltc',
    time: '2019-05-02T00:28:39Z',
    order_id: 218 } ]
```


### - `.createOrder(market, side, volume, price, callback)`
Create an order for a given market. All the parameters except `callback` are required.

`side` -> Determines whether the order is a `sell` or `buy` order.
`volume` -> The volume of the order.
`price` -> The price per unit.

Example:

```
API.createOrder('oscltc', 'sell', 100, 0.00000001)
```

Example 2 (chaining API calls):

```
API.walletInfo('osc', (wallet) => {
    API.createOrder('oscltc', 'sell', wallet.balance / 2, 0.00000001);
});

API.walletInfo('btc', (wallet) => {
    let price = 0.00000001;

    API.createOrder('oscbtc', 'buy', wallet.balance / price, price);
});
```

Expected Result (if `callback` is not null):

```
{ id: 1829,
  side: 'sell',
  ord_type: 'limit',
  price: '0.00000002',
  avg_price: '0.0',
  state: 'wait',
  market: 'oscltc',
  time: '2019-05-12T21:22:33Z',
  volume: '10000.0',
  remaining_volume: '10000.0',
  executed_volume: '0.0',
  trades_count: 0 }
```

### - `.withdraw(currency, to, amount, callback)`
Allows you to withdraw from your wallet remotely.

`currency` -> Currency you want to withdraw
`to` -> Destination address
`amount` -> Amount you wish to withdraw.

Example:

```
API.withdraw('osc', 'hannwNetC1rGg3adBdn855M1o7BFMDZ4hM2CeaZLRChL4LmkLrxbjhtPFCaPJTrjh488fDcnNaiMTKhi53AD3X2KL5LzQsoZbmy', 1000);
```

Expected Output (may vary depending on parameters):

```
{ currency: 'osc',
  amount: '1000.0',
  fee: '0.0',
  txid: null,
  time: 1557696740,
  status: 'processing' }
```

### - `.memberInfo(callback)`
Returns basic information about the account.

### - `.walletInfo(currency, callback)`
Returns wallet balance for an account. The `currency` parameter is the currency code that can be obtained from the `.currencyList` call.

### - `.walletsInfo(callback)`
Returns an array of all the wallets and their balances.

### - `.accountHistory(limit, callback)`
Returns all of the history for an account. This includes withdraws, deposits, and trades. The `limit` parameter changes the array lengths for all items (withdraws, deposits, and trades).

### - `.deposit(txid, callback)`
Get information and state of a deposit from a `txid` parameter.

### - `.deposits(currency, callback, limit)`
Returns a list of all deposits for a given currency. For a list of currency codes, refer to `.currencyList` call. The `limit` parameter changes the length of the array returned, and is optional.

### - `.depositAddress(currency, callback)`
Returns your deposit address for a given currency.

### - `.withdraws(currency, callback, limit)`
Similar functionality to `.deposits` call, returns all withdraws.

### - `.cancelOrder(id, callback)`
Cancels an order based on id. `callback` parameter is optional.

### - `.cancelSide(side, callback)`
Cancels ALL your orders on the `side` of EVERY market. Where `side` can be either `sell` or `buy`.

### - `.cancelAll(callback)`
Cancels all orders in every market.
