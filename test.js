var API = require('./tcx.js'),
	_ = require('underscore');

API.accessKey = 'ACCESS_KEY';
API.secretKey = 'SECRET_KEY';

function main() {
	//API.info((result) => { console.log(result); });
	//API.currencyList((result) => { console.log(result); }, false);
	//API.tickerList((result) => { console.log(result); }, true)
	//API.ticker('oscltc', (result) => { console.log(result); })

	//API.orderBook('oscltc', (result) => { console.log(result); }, 1, 1);
	//API.marketDepth('oscltc', (result) => { console.log(result); });
	//API.marketTrades('oscltc', (result) => { console.log(result); }, 1);

	//API.kData('oscltc', 10, 60, (result) => { console.log(result); });

	//API.cancelSide('sell', (result) => { console.log(result); });

	//API.orders('all', (result) => { console.log(result); }, 'wait', 1, 1, 'desc');
	//API.findOrder(1634, (result) => { console.log(result); });

	//API.myTrades('oscltc', (result) => { console.log(result); }, 2, null, null, null, 'asc');

	//API.walletInfo('osc', (result) => { console.log(result); });

	//API.createOrder('oscltc', 'sell', 10000, 0.00000002);

	//API.cancelOrder(1829);

	//API.withdraw('osc', 'hannwNetC1rGg3adBdn855M1o7BFMDZ4hM2CeaZLRChL4LmkLrxbjhtPFCaPJTrjh488fDcnNaiMTKhi53AD3X2KL5LzQsoZbmy', -10, (result) => {
	//	console.log(result);
	//});
}

main();
