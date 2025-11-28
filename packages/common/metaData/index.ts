const SUPPORTED_ASSETS = ['SOL', 'BTC', 'ETH'] as const;
export type TimerNodeMetaData = {
    time: number;
};
export type TradingMetadata = {
    type: 'LONG' | 'SHORT',
    qty: number,
    symbol: typeof SUPPORTED_ASSETS[number]
}
export type PriceTriggerMetaData = {
    asset: string,
    price: number,
};