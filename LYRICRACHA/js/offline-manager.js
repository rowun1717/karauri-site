(()=>{'use strict';
const CACHE='lyricracha-offline-v1',META='lyricracha-offline-meta-v1';
const el=id=>document.getElementById(id),btn=el('download'),del=el('delete');
const fmt=n=>n>=1048576?(n/1048576).toFixed(1)+' MB':(n/1024).toFixed(1)+' KB';
const root=new URL('./',location.href);let inventory=null,changes=[],removed=[],busy=false;
const url=p=>new URL(p,root).href;
const status=t=>el('status').textContent=t;
async function stored(){const c=await caches.open(META);const r=await c.match(url('offline-index.json'));return r?await r.json():null;}
async function refresh(){
 if(!('caches'in window)||!('serviceWorker'in navigator)){status('このブラウザは必要なオフライン機能に対応していません。');return;}
 try{
 const res=await fetch(url('offline-index.json'),{cache:'no-store'});if(!res.ok)throw Error('データ一覧の取得に失敗');inventory=await res.json();
 const old=await stored();const oldFiles=old?.files||{};const cache=await caches.open(CACHE);
 changes=[];for(const [path,info] of Object.entries(inventory.files)){
   if(oldFiles[path]?.hash!==info.hash || !(await cache.match(url(path))))changes.push(path);
 }
 removed=Object.keys(oldFiles).filter(p=>!(p in inventory.files));
 const total=Object.values(inventory.files).reduce((a,v)=>a+v.size,0);
 const diff=changes.reduce((a,p)=>a+inventory.files[p].size,0);
 el('size').textContent=fmt(total);el('updateSize').textContent=fmt(diff);el('count').textContent=Object.keys(inventory.files).length+' ファイル';
 el('saved').textContent=old?(changes.length||removed.length?'更新あり':'保存済み'):'未保存';
 status(changes.length?`ダウンロード対象：${changes.length}件。不要データ：${removed.length}件。`:'最新のデータが保存されています。');
 btn.disabled=!changes.length;del.disabled=!old;btn.textContent=old?'更新データをダウンロード':'すべてダウンロードして有効にする';
 }catch(e){status('オンラインで開いてください。'+e.message);btn.disabled=true;const old=await stored();del.disabled=!old;el('saved').textContent=old?'保存済み（更新確認不可）':'未保存';}
}
btn.addEventListener('click',async()=>{
 if(busy||!inventory)return;busy=true;btn.disabled=true;del.disabled=true;const stage='lyricracha-stage-v1';
 try{
  const staging=await caches.open(stage);for(const req of await staging.keys())await staging.delete(req);
  for(let i=0;i<changes.length;i++){
   const path=changes[i],response=await fetch(url(path),{cache:'no-store'});
   if(!response.ok||response.type==='opaque')throw Error('取得失敗: '+path);
   // Verify content hash before applying, to avoid mixing site releases.
   const buf=await response.clone().arrayBuffer();const digest=await crypto.subtle.digest('SHA-256',buf);
   const hex=Array.from(new Uint8Array(digest),x=>x.toString(16).padStart(2,'0')).join('');
   if(hex!==inventory.files[path].hash)throw Error('公開データが更新されています。ページを再読み込みしてやり直してください: '+path);
   await staging.put(url(path),response);el('progress').value=Math.round((i+1)/changes.length*100);
   status(`ダウンロード中… ${i+1} / ${changes.length} ファイル`);
  }
  const cache=await caches.open(CACHE);for(const path of changes){const r=await staging.match(url(path));await cache.put(url(path),r);}
  for(const path of removed)await cache.delete(url(path));
  const m=await caches.open(META);await m.put(url('offline-index.json'),new Response(JSON.stringify(inventory),{headers:{'Content-Type':'application/json'}}));
  await caches.delete(stage);status('保存完了！機内モードで動作を確認してみてね。');
 }catch(e){status('更新を完了できませんでした：'+e.message+'\n通信を確認して再試行してください。');await caches.delete(stage);}
 finally{busy=false;await refresh();}
});
del.addEventListener('click',async()=>{if(busy||!confirm('保存したオフラインデータを削除しますか？'))return;busy=true;await caches.delete(CACHE);await caches.delete(META);busy=false;el('progress').value=0;await refresh();});
refresh();
})();