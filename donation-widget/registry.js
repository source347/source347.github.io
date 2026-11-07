// Static, allowlisted token registry. No token discovery runs in the visitor's browser.
// Verify live bytecode and metadata with scripts/verify-registry.mjs before enabling donations.
export const NETWORKS = [
 {id:1,key:"ethereum",name:"Ethereum",native:"ETH",explorer:"https://etherscan.io",rpc:"https://ethereum-rpc.publicnode.com"},
 {id:8453,key:"base",name:"Base",native:"ETH",explorer:"https://basescan.org",rpc:"https://base-rpc.publicnode.com"},
 {id:56,key:"bnb",name:"BNB Smart Chain",native:"BNB",explorer:"https://bscscan.com",rpc:"https://bsc-rpc.publicnode.com"},
 {id:42161,key:"arbitrum",name:"Arbitrum One",native:"ETH",explorer:"https://arbiscan.io",rpc:"https://arbitrum-one-rpc.publicnode.com"},
 {id:137,key:"polygon",name:"Polygon PoS",native:null,explorer:"https://polygonscan.com",rpc:"https://polygon-bor-rpc.publicnode.com"},
 {id:10,key:"optimism",name:"OP Mainnet",native:"ETH",explorer:"https://optimistic.etherscan.io",rpc:"https://optimism-rpc.publicnode.com"},
 {id:43114,key:"avalanche",name:"Avalanche C-Chain",native:null,explorer:"https://snowtrace.io",rpc:"https://avalanche-c-chain-rpc.publicnode.com"}
];
export const EVM_TOKENS = {
 1:{
  USDT:{address:"0xdAC17F958D2ee523a2206206994597C13D831ec7",decimals:6,label:"USDT",classification:"Tether-issued"},
  USDC:{address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",decimals:6,label:"USDC",classification:"Circle-native"}
 },
 8453:{
  USDC:{address:"0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",decimals:6,label:"USDC",classification:"Circle-native"}
 },
 56:{
  USDT:{address:"0x55d398326f99059fF775485246999027B3197955",decimals:18,label:"USDT (Binance-Peg)",classification:"Binance-Peg"},
  USDC:{address:"0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",decimals:18,label:"USDC (Binance-Peg)",classification:"Binance-Peg"}
 },
 42161:{
  USDT:{address:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",decimals:6,label:"USDT0",classification:"USDT0 omnichain"},
  USDC:{address:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",decimals:6,label:"USDC",classification:"Circle-native"}
 },
 137:{
  USDT:{address:"0xc2132D05D31c914a87C6611C10748AEb04B58e8F",decimals:6,label:"USDT0",classification:"USDT0 omnichain"},
  USDC:{address:"0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",decimals:6,label:"USDC",classification:"Circle-native"}
 },
 10:{
  USDT:{address:"0x01bFF41798a0BcF287b996046Ca68b395DbC1071",decimals:6,label:"USDT0",classification:"USDT0 omnichain"},
  USDC:{address:"0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",decimals:6,label:"USDC",classification:"Circle-native"}
 },
 43114:{
  USDT:{address:"0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7",decimals:6,label:"USDT",classification:"Tether-issued"},
  USDC:{address:"0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E",decimals:6,label:"USDC",classification:"Circle-native"}
 }
};
export const SOLANA_TOKENS={
 USDT:{mint:"Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",decimals:6,label:"USDT",classification:"Tether-issued"},
 USDC:{mint:"EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",decimals:6,label:"USDC",classification:"Circle-native"}
};
export const REGISTRY_SOURCES={
 USDT:"https://docs.usdt0.to/technical-documentation/deployments",
 TETHER:"https://tether.to/en/supported-protocols/",
 USDC:"https://developers.circle.com/stablecoins/usdc-contract-addresses",
 BNB_PEG:"https://bscscan.com/"
};
