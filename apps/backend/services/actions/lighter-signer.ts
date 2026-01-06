import { SignerClient } from 'zklighter-sdk';

const payload = JSON.parse(process.argv[2] || '{}');
const { baseUrl, privateKey, apiKeyIdx, accountIdx, marketId, clientOrderIndex, baseAmount, price, isAsk, orderType, timeInForce, nonce } = payload;

if (!baseUrl || !privateKey) {
    console.log(JSON.stringify({ success: false, error: 'Missing required parameters' }));
    process.exit(1);
}

try {
    const client = new SignerClient(baseUrl, privateKey, apiKeyIdx, accountIdx);
    const [txType, txInfo, signature, signErr] = client.sign_create_order(
        marketId, clientOrderIndex, baseAmount, price, isAsk,
        orderType, timeInForce, false, 0, 0, nonce, apiKeyIdx
    );
    await client.close();

    if (signErr) {
        console.log(JSON.stringify({ success: false, error: signErr }));
    } else {
        console.log(JSON.stringify({ success: true, txType, txInfo, signature }));
    }
} catch (err: any) {
    console.log(JSON.stringify({ success: false, error: err.message }));
}
