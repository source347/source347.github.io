import { BrowserProvider, Interface, getAddress, isAddress, parseUnits } from 'https://cdn.jsdelivr.net/npm/ethers@6.15.0/+esm';
import { NETWORKS, EVM_TOKENS, SOLANA_TOKENS } from './registry.js';
const EVM_TO='0xC948e00B65Edf3a236c3794Aa1b0A4187f22e752';
const SOL_TO='5u3AjB3mswr97kB8QeKdRWWajAV9v4wSszAMeN38JUd8';
const erc20=new Interface(['function transfer(address,uint256)']);
const css=`
.dnw{font:14px system-ui;color:var(--fg);--fg:#171717;--bg:#fff;--muted:#777;--line:#e5e5eb;--soft:#f5f5f7;--accent:#6757e8}
.dnw[data-theme=dark]{--fg:#f5f5f7;--bg:#18181d;--muted:#aaa;--line:#383840;--soft:#26262e;color-scheme:dark}
.dnw-launch{position:fixed;z-index:2147483000;bottom:22px;right:22px;border:0;border-radius:99px;padding:13px 22px;background:var(--accent);color:white;font-weight:700;cursor:pointer;box-shadow:0 5px 24px #0003}.dnw-launch.left{right:auto;left:22px}
.dnw-back{position:fixed;z-index:2147483001;inset:0;background:#0009;display:grid;place-items:center;padding:14px}.dnw-back[hidden]{display:none}
.dnw-modal{box-sizing:border-box;width:min(100%,490px);max-height:92vh;overflow:auto;background:var(--bg);color:var(--fg);border:1px solid var(--line);border-radius:20px;padding:22px;box-shadow:0 20px 80px #0005}
.dnw-head{display:flex;justify-content:space-between;gap:12px;align-items:start}.dnw-title{font-size:21px;font-weight:750}.dnw-sub,.dnw-small{color:var(--muted);font-size:12px}.dnw-close{border:0;border-radius:50%;width:34px;height:34px;background:var(--soft);color:var(--fg);font-size:20px;cursor:pointer}
.dnw-label{display:block;margin:17px 0 7px;color:var(--muted);font-size:11px;font-weight:750;letter-spacing:.06em;text-transform:uppercase}
.dnw-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px}.dnw-grid.three{grid-template-columns:repeat(3,minmax(0,1fr))}
.dnw-choice{border:1px solid var(--line);border-radius:11px;padding:10px;background:var(--bg);color:var(--fg);text-align:left;cursor:pointer;min-width:0}.dnw-choice[aria-pressed=true]{border:2px solid var(--accent);padding:9px;background:color-mix(in srgb,var(--accent) 9%,var(--bg))}.dnw-choice b,.dnw-choice small{display:block}.dnw-choice small{font-size:10px;color:var(--muted);margin-top:2px;overflow-wrap:anywhere}
.dnw-amount{display:flex;align-items:center;border:1px solid var(--line);border-radius:11px;padding:0 12px}.dnw-amount input{width:100%;border:0;background:transparent;color:var(--fg);padding:13px 4px;font-size:22px;outline:0}
.dnw-primary,.dnw-copy{width:100%;border-radius:11px;padding:13px;margin-top:13px;font-weight:700;cursor:pointer}.dnw-primary{border:0;background:var(--accent);color:white}.dnw-primary:disabled{opacity:.55}.dnw-copy{border:1px solid var(--line);background:var(--soft);color:var(--fg)}
.dnw-address{font:11px ui-monospace,monospace;word-break:break-all;color:var(--muted);margin-top:8px}.dnw-status{margin-top:10px;font-size:12px;overflow-wrap:anywhere;color:var(--muted)}.dnw-status.error{color:#d44}.dnw-status.success{color:#198754}.dnw-note{font-size:10px;color:var(--muted);margin-top:10px}
@media(max-width:480px){.dnw-modal{padding:17px}.dnw-launch{right:14px;bottom:14px}.dnw-launch.left{left:14px}}
`;
function units(v,d){if(!/^(?:0|[1-9]\d*)(?:\.\d+)?$/.test(String(v)))throw Error('Enter a valid positive amount.');const p=String(v).split('.')[1]||'';if(p.length>d)throw Error('Too many decimal places for this asset.');const n=parseUnits(String(v),d);if(n<=0n)throw Error('Amount must be greater than zero.');return n;}
function solWallet(){return window.phantom?.solana||window.solflare||window.solana||null;}
export function initDonationWidget(config={}){
 const o={buttonText:'Donate',title:'Support this project',subtitle:'Choose a network and amount.',position:'bottom-right',theme:'auto',accentColor:'#6757e8',solanaRpcUrl:'https://solana-rpc.publicnode.com',evmAddress:EVM_TO,solanaAddress:SOL_TO,...config};
 if(!isAddress(o.evmAddress))throw Error('Invalid EVM recipient address.');o.evmAddress=getAddress(o.evmAddress);
 const root=document.createElement('div');root.className='dnw';root.dataset.theme=o.theme==='auto'?(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'):o.theme;root.style.setProperty('--accent',o.accentColor);document.body.append(root);
 const style=document.createElement('style');style.textContent=css;document.head.append(style);
 const launch=document.createElement('button');launch.className='dnw-launch '+(o.position==='bottom-left'?'left':'');launch.textContent=o.buttonText;launch.type='button';root.append(launch);
 const back=document.createElement('div');back.className='dnw-back';back.hidden=true;back.innerHTML=`<section class="dnw-modal" role="dialog" aria-modal="true"><header class="dnw-head"><div><div class="dnw-title"></div><div class="dnw-sub"></div></div><button class="dnw-close" aria-label="Close">×</button></header><span class="dnw-label">1 · Network family</span><div class="dnw-grid family"></div><div class="evm"><span class="dnw-label">2 · Network</span><div class="dnw-grid networks"></div></div><div class="sol" hidden><span class="dnw-label">2 · Network</span><div class="dnw-choice"><b>Solana</b><small>Solana Mainnet</small></div></div><span class="dnw-label">3 · Asset</span><div class="dnw-grid three assets"></div><span class="dnw-label">4 · Amount</span><label class="dnw-amount"><span class="sym"></span><input class="amount" type="number" min="0" step="any" value="5" inputmode="decimal"></label><button class="dnw-primary send">Connect wallet & donate</button><div class="dnw-status" aria-live="polite"></div><div class="dnw-label">Or send manually</div><div class="dnw-address"></div><button class="dnw-copy">Copy receiving address</button><div class="dnw-note">Send only the selected asset on the selected network. Incorrect-network transfers may be unrecoverable. Network fees are paid separately by the donor.</div></section>`;
 root.append(back);const q=s=>back.querySelector(s);q('.dnw-title').textContent=o.title;q('.dnw-sub').textContent=o.subtitle;
 const state={family:'evm',chain:1,asset:'ETH',amount:'5',busy:false};
 const net=()=>NETWORKS.find(n=>n.id===state.chain);
 const receiver=()=>state.family==='solana'?o.solanaAddress:o.evmAddress;
 const token=()=>EVM_TOKENS[state.chain]?.[state.asset];
 const say=(m,type='')=>{q('.dnw-status').className='dnw-status '+type;q('.dnw-status').textContent=m;};
 function render(){
  q('.family').replaceChildren();[['evm','EVM','Ethereum and EVM networks'],['solana','Solana','Solana mainnet']].forEach(([id,label,sub])=>{const b=document.createElement('button');b.className='dnw-choice';b.type='button';b.setAttribute('aria-pressed',String(state.family===id));b.innerHTML='<b>'+label+'</b><small>'+sub+'</small>';b.onclick=()=>{state.family=id;state.chain=1;state.asset=id==='solana'?'SOL':'ETH';say('');render()};q('.family').append(b)});
  q('.evm').hidden=state.family!=='evm';q('.sol').hidden=state.family!=='solana';q('.networks').replaceChildren();
  if(state.family==='evm')NETWORKS.forEach(n=>{const b=document.createElement('button');b.className='dnw-choice';b.type='button';b.setAttribute('aria-pressed',String(state.chain===n.id));b.innerHTML='<b>'+n.name+'</b><small>'+(n.native||'Stablecoins only')+'</small>';b.onclick=()=>{state.chain=n.id;state.asset=n.native||Object.keys(EVM_TOKENS[n.id])[0];say('');render()};q('.networks').append(b)});
  const assets=state.family==='solana'?['SOL','USDC','USDT']:[...(net().native?[net().native]:[]),...Object.keys(EVM_TOKENS[state.chain]||{})];q('.assets').replaceChildren();
  assets.forEach(a=>{const m=state.family==='solana'?(a==='SOL'?{label:'SOL',classification:'Native asset'}:SOLANA_TOKENS[a]):(a===net().native?{label:a,classification:'Native asset'}:EVM_TOKENS[state.chain][a]);const b=document.createElement('button');b.className='dnw-choice';b.type='button';b.setAttribute('aria-pressed',String(state.asset===a));b.innerHTML='<b>'+m.label+'</b><small>'+m.classification+'</small>';b.onclick=()=>{state.asset=a;render()};q('.assets').append(b)});
  q('.amount').value=state.amount;q('.sym').textContent=['USDC','USDT'].includes(state.asset)?'$':'';q('.dnw-address').textContent=receiver();q('.send').disabled=state.busy;q('.send').textContent=state.busy?'Preparing transaction…':'Connect wallet & donate';
 }
 async function switchChain(p,n){const id='0x'+n.id.toString(16);try{await p.send('wallet_switchEthereumChain',[{chainId:id}])}catch(e){if(e.code!==4902)throw e;await p.send('wallet_addEthereumChain',[{chainId:id,chainName:n.name,nativeCurrency:{name:n.native||'POL',symbol:n.native||'POL',decimals:18},rpcUrls:[n.rpc],blockExplorerUrls:[n.explorer]}]);await p.send('wallet_switchEthereumChain',[{chainId:id}])}}
 async function sendEvm(){
  if(!window.ethereum)throw Error('No injected EVM wallet found. Install MetaMask, Rabby or Coinbase Wallet.');
  const n=net(),p=new BrowserProvider(window.ethereum);await p.send('eth_requestAccounts',[]);await switchChain(p,n);const signer=await p.getSigner();const amount=state.asset===n.native?units(state.amount,18):units(state.amount,token().decimals);
  let tx;if(state.asset===n.native)tx=await signer.sendTransaction({to:o.evmAddress,value:amount});else tx=await signer.sendTransaction({to:token().address,data:erc20.encodeFunctionData('transfer',[o.evmAddress,amount])});
  const a=document.createElement('a');a.href=n.explorer+'/tx/'+tx.hash;a.target='_blank';a.rel='noopener noreferrer';a.textContent='View transaction';a.className='dnw-link';say('Transaction submitted: '+tx.hash,'success');q('.dnw-status').append(document.createTextNode(' '),a);
 }
 async function sendSol(){
  const w=solWallet();if(!w)throw Error('Install Phantom or Solflare to donate on Solana.');
  const [{Connection,PublicKey,Transaction,SystemProgram,LAMPORTS_PER_SOL},{getAssociatedTokenAddress,createAssociatedTokenAccountInstruction,createTransferInstruction,TOKEN_PROGRAM_ID,ASSOCIATED_TOKEN_PROGRAM_ID}]=await Promise.all([import('https://esm.sh/@solana/web3.js@1.98.4'),import('https://esm.sh/@solana/spl-token@0.4.13')]);
  const c=new Connection(o.solanaRpcUrl,'confirmed');const response=await w.connect();const payer=new PublicKey(response.publicKey||w.publicKey);const to=new PublicKey(o.solanaAddress);const tx=new Transaction();
  if(state.asset==='SOL')tx.add(SystemProgram.transfer({fromPubkey:payer,toPubkey:to,lamports:units(state.amount,9)}));
  else{const mint=new PublicKey(SOLANA_TOKENS[state.asset].mint);const src=await getAssociatedTokenAddress(mint,payer);const dst=await getAssociatedTokenAddress(mint,to);if(!await c.getAccountInfo(dst))tx.add(createAssociatedTokenAccountInstruction(payer,dst,to,mint));tx.add(createTransferInstruction(src,dst,payer,units(state.amount,SOLANA_TOKENS[state.asset].decimals)));}
  tx.feePayer=payer;const bh=await c.getLatestBlockhash('confirmed');tx.recentBlockhash=bh.blockhash;if(typeof w.signTransaction!=='function')throw Error('Wallet does not support transaction signing.');const signed=await w.signTransaction(tx);const sig=await c.sendRawTransaction(signed.serialize());say('Transaction submitted: '+sig,'success');await c.confirmTransaction({signature:sig,...bh},'confirmed');const a=document.createElement('a');a.href='https://explorer.solana.com/tx/'+sig;a.target='_blank';a.rel='noopener noreferrer';a.textContent='View transaction';a.className='dnw-link';q('.dnw-status').append(document.createTextNode(' '),a);
 }
 q('.amount').addEventListener('input',e=>state.amount=e.target.value);
 q('.send').onclick=async()=>{state.busy=true;render();say('Review the transaction in your wallet.');try{await(state.family==='evm'?sendEvm():sendSol())}catch(e){say(e.shortMessage||e.message||'Transaction failed.','error')}finally{state.busy=false;render()}};
 q('.dnw-copy').onclick=async()=>{try{await navigator.clipboard.writeText(receiver());q('.dnw-copy').textContent='Address copied'}catch{say('Clipboard unavailable. Select and copy the address above.','error')}};
 const close=()=>back.hidden=true;q('.dnw-close').onclick=close;back.addEventListener('click',e=>{if(e.target===back)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});launch.onclick=()=>{render();back.hidden=false};render();
 return{open:()=>{render();back.hidden=false},close,destroy:()=>{root.remove();style.remove()}};
}
