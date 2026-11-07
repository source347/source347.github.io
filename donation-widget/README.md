# Donation widget v1.0

Static-site donation modal for GitHub Pages. EVM support: Ethereum, Base, BNB Smart Chain, Arbitrum One, Polygon PoS, OP Mainnet and Avalanche C-Chain. Solana support: SOL, USDT and USDC.

## Install

Add this to any page after publishing this directory through GitHub Pages:

```html
<script type="module">
  import { initDonationWidget } from 'https://source347.github.io/donation-widget/donation-widget.js';
  initDonationWidget({
    buttonText: 'Donate',
    title: 'Support this project',
    subtitle: 'Choose a network and amount.',
    position: 'bottom-right', // or bottom-left
    theme: 'auto',            // auto, light, dark
    accentColor: '#6757e8'
  });
</script>
```

Defaults use the recipient addresses supplied for this project:
- EVM: `0xC948e00B65Edf3a236c3794Aa1b0A4187f22e752`
- Solana: `5u3AjB3mswr97kB8QeKdRWWajAV9v4wSszAMeN38JUd8`

Per-site customization: `buttonText`, `title`, `subtitle`, `position`, `theme`, `accentColor`, `evmAddress`, `solanaAddress`.

## Asset policy

- ETH: Ethereum, Base, Arbitrum One, OP Mainnet.
- BNB: BNB Smart Chain.
- Polygon and Avalanche: stablecoins only in this release.
- BNB-chain USDT/USDC are Binance-Peg assets (18 decimals), not issuer-native contracts.
- Arbitrum, Polygon and Optimism USDT entries are USDT0 deployments.
- Base USDT is intentionally omitted; Base USDC is Circle-native.
- Token contracts and decimals are bundled locally. No token-list discovery is done at page load.

## Wallets and transaction flow

Uses injected EIP-1193 EVM wallets and injected Phantom/Solflare-compatible Solana wallets. Wallet connection and network switching are requested only after the donor clicks the send button. Each transaction must be approved in the wallet. WalletConnect/mobile deep-link support is not included in v1.0.

## Release checklist — not yet production-approved

1. Run the read-only registry verification script against live RPC endpoints.
2. Independently review token provenance and decimals, especially Binance-Peg and USDT0 assets.
3. Test each network/token with small-value transfers.
4. Test mobile browsers and supported wallet extensions.
5. Consider a dedicated Solana RPC provider before public launch.

This repository copy is a review/staging release. Do not advertise it as production-verified until the checklist is complete.
