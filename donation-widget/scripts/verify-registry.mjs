import { JsonRpcProvider, Contract } from 'ethers';
import { NETWORKS, EVM_TOKENS } from '../registry.js';
const abi=['function name() view returns (string)','function symbol() view returns (string)','function decimals() view returns (uint8)'];
let failures=0;
for(const n of NETWORKS){
 const provider=new JsonRpcProvider(n.rpc);
 for(const [symbol,t] of Object.entries(EVM_TOKENS[n.id]||{})){
  try{
   const code=await provider.getCode(t.address);
   if(code==='0x')throw Error('No contract bytecode');
   const c=new Contract(t.address,abi,provider);
   const [name,actualSymbol,decimals]=await Promise.all([c.name(),c.symbol(),c.decimals()]);
   const accepted=t.label==='USDT0'?['USDT0','USDT']:t.label.startsWith('USDT')?['USDT']:t.label.startsWith('USDC')?['USDC']:[symbol];
   if(!accepted.includes(actualSymbol))throw Error('symbol mismatch: '+actualSymbol);
   if(Number(decimals)!==t.decimals)throw Error('decimals mismatch: '+decimals+' expected '+t.decimals);
   console.log('PASS',n.name,t.label,t.address,'|',name,'|',actualSymbol,'|',decimals);
  }catch(e){failures++;console.error('FAIL',n.name,symbol,t.address,e.shortMessage||e.message)}
 }
}
if(failures){console.error(failures+' registry check(s) failed');process.exitCode=1}else console.log('All EVM token metadata checks passed. This does not verify issuer provenance or transfer behavior.');
