(function(){var pg=document.body.dataset.page,L=[["index","Beranda"],["produk","Produk"],["promo","Promo"],["tentang","Tentang"],["layanan","Cara Pesan"],["ulasan","Ulasan"],["kontak","Kontak"]];
var nav=L.map(function(x){return '<a href="'+x[0]+'.html"'+(x[0]==pg?' class="ramadhan_aktif" aria-current="page"':'')+'>'+x[1]+'</a>'}).join("");
document.body.insertAdjacentHTML("afterbegin",`<header id="ramadhan_header"><div class="ramadhan_wrap ramadhan_bar"><a class="ramadhan_logo" href="index.html">XENN<b>MOTOR</b>PARTS</a><nav class="ramadhan_menu" id="ramadhan_menu" aria-label="Menu utama">${nav}</nav><button class="ramadhan_ikon" id="ramadhan_tema" aria-label="Ganti tema">🌓</button><button class="ramadhan_ikon" id="ramadhan_btn_keranjang" aria-label="Buka keranjang">🛒<span class="ramadhan_badge" id="ramadhan_jml">0</span></button><button class="ramadhan_ikon" id="ramadhan_burger" aria-label="Buka menu">☰</button></div></header>`);
document.body.insertAdjacentHTML("beforeend",`<footer id="ramadhan_footer"><div class="ramadhan_wrap">© 2026 Xenn Motor Parts.</div></footer>
<aside id="ramadhan_laci" aria-label="Keranjang"><div style="display:flex;justify-content:space-between;align-items:center"><h2 style="font-size:2rem">Keranjang</h2><button class="ramadhan_ikon" id="ramadhan_tutup" aria-label="Tutup keranjang">✕</button></div><div id="ramadhan_isi"></div><div style="padding-top:12px"><div style="display:flex;justify-content:space-between;font-weight:600;margin-bottom:10px"><span>Total</span><span id="ramadhan_total">Rp0</span></div><a class="ramadhan_btn" id="ramadhan_wa" style="display:block;text-align:center" target="_blank" rel="noopener" href="#">Pesan via WhatsApp</a></div></aside>
<div id="ramadhan_toast" role="status"></div>`)})();

var WA="6281234567890";
var P=[
{n:"Kampas rem depan",c:"Pengereman",b:["Honda","Yamaha"],h:45000,e:"🛑"},
{n:"Kampas rem belakang",c:"Pengereman",b:["Honda","Yamaha","Suzuki"],h:38000,e:"🛑"},
{n:"Oli mesin 0,8 L",c:"Mesin",b:["Semua"],h:52000,e:"🛢️"},
{n:"Busi iridium",c:"Mesin",b:["Semua"],h:85000,e:"⚡"},
{n:"Filter udara racing",c:"Mesin",b:["Honda","Kawasaki"],h:95000,e:"🌀"},
{n:"Set rantai dan gir",c:"Kaki-kaki",b:["Yamaha","Suzuki","Kawasaki"],h:230000,e:"⛓️"},
{n:"Ban tubeless 90/80-14",c:"Kaki-kaki",b:["Honda","Yamaha"],h:275000,e:"🛞"},
{n:"Shock belakang",c:"Kaki-kaki",b:["Honda","Suzuki"],h:310000,e:"🔩"},
{n:"Aki MF 12V",c:"Kelistrikan",b:["Semua"],h:185000,e:"🔋"},
{n:"Lampu LED headlamp",c:"Kelistrikan",b:["Honda","Yamaha","Kawasaki"],h:120000,e:"💡"},
{n:"Spion lipat",c:"Aksesori",b:["Semua"],h:65000,e:"🪞"},
{n:"Handgrip anti getar",c:"Aksesori",b:["Semua"],h:55000,e:"🧤"}];
var cats=["Semua","Mesin","Pengereman","Kelistrikan","Kaki-kaki","Aksesori"];
var st={brand:"Semua",cat:"Semua",q:""},cart={};

var $=function(i){return document.getElementById(i)||document.createElement("div")};
var rp=function(n){return "Rp"+n.toLocaleString("id-ID")};
try{cart=JSON.parse(localStorage.getItem("ramadhan_cart")||"{}")}catch(e){}
function toast(t){var x=$("ramadhan_toast");x.textContent=t;x.classList.add("ramadhan_tampil");clearTimeout(toast.t);toast.t=setTimeout(function(){x.classList.remove("ramadhan_tampil")},2000)}
function chips(){$("ramadhan_chips").innerHTML=cats.map(function(c){return '<button class="ramadhan_chip" aria-pressed="'+(c==st.cat)+'" data-c="'+c+'">'+c+'</button>'}).join("")}
function grid(){
 var l=P.map(function(p,i){p.i=i;return p}).filter(function(p){
  return (st.brand=="Semua"||p.b.indexOf("Semua")>-1||p.b.indexOf(st.brand)>-1)&&(st.cat=="Semua"||p.c==st.cat)&&p.n.toLowerCase().indexOf(st.q)>-1});
 $("ramadhan_grid").innerHTML=l.length?l.map(function(p){return '<article class="ramadhan_card"><div class="ramadhan_foto">'+p.e+'</div><span class="ramadhan_kecil">'+p.c+'</span><h3>'+p.n+'</h3><span class="ramadhan_kecil">Cocok: '+p.b.join(", ")+'</span><span class="ramadhan_harga">'+rp(p.h)+'</span><button class="ramadhan_btn" data-add="'+p.i+'">Tambah ke keranjang</button></article>'}).join(""):'<div class="ramadhan_kosong">Belum ada part yang cocok. Coba ganti merek, kategori, atau kata kunci.</div>'}
function drawCart(){
 var ids=Object.keys(cart),tot=0,jml=0;
 $("ramadhan_isi").innerHTML=ids.length?ids.map(function(i){var p=P[i],q=cart[i];tot+=p.h*q;jml+=q;return '<div class="ramadhan_item"><b>'+p.n+'</b><span>'+rp(p.h*q)+'</span><div class="ramadhan_qty"><button data-m="'+i+'" aria-label="Kurangi">−</button>'+q+'<button data-p="'+i+'" aria-label="Tambah">+</button></div></div>'}).join(""):'<p class="ramadhan_kecil" style="padding:20px 0">Keranjang masih kosong. Pilih part dari katalog.</p>';
 $("ramadhan_total").textContent=rp(tot);$("ramadhan_jml").textContent=jml;
 var t="Halo Xenn Motor Parts, saya mau pesan:%0A"+ids.map(function(i){return "- "+P[i].n+" x"+cart[i]}).join("%0A")+"%0ATotal: "+rp(tot);
 $("ramadhan_wa").href="https://wa.me/"+WA+"?text="+(ids.length?t:"Halo, saya mau tanya sparepart");
 try{localStorage.setItem("ramadhan_cart",JSON.stringify(cart))}catch(e){}}
document.addEventListener("click",function(e){
 var t=e.target.closest("button");if(!t)return;var d=t.dataset;
 if(d.add){cart[d.add]=(cart[d.add]||0)+1;drawCart();toast(P[d.add].n+" masuk keranjang")}
 if(d.p){cart[d.p]++;drawCart()}
 if(d.m){if(--cart[d.m]<1)delete cart[d.m];drawCart()}
 if(d.c){st.cat=d.c;chips();grid()}});
$("ramadhan_btn_keranjang").onclick=function(){$("ramadhan_laci").classList.add("ramadhan_buka")};
$("ramadhan_tutup").onclick=function(){$("ramadhan_laci").classList.remove("ramadhan_buka")};
$("ramadhan_burger").onclick=function(){$("ramadhan_menu").classList.toggle("ramadhan_buka")};
$("ramadhan_menu").onclick=function(){this.classList.remove("ramadhan_buka")};
$("ramadhan_q").oninput=function(){st.q=this.value.toLowerCase().trim();grid()};
$("ramadhan_cari").onsubmit=function(e){e.preventDefault();location.href="produk.html?merek="+encodeURIComponent($("ramadhan_merek").value)};
$("ramadhan_merek").onchange=function(){st.brand=this.value;grid()};
$("ramadhan_tema").onclick=function(){var r=document.documentElement,d=getComputedStyle(r).getPropertyValue("--bg").trim()=="#0e1a2b";r.setAttribute("data-theme",d?"light":"dark")};
$("ramadhan_salin").onclick=function(){try{navigator.clipboard.writeText("RAMADHAN10")}catch(e){}toast("Kode RAMADHAN10 disalin")};

if(document.getElementById("ramadhan_gear"))(function(){var s=$("ramadhan_gear"),d="",n=16,i,a,r;
 for(i=0;i<n*4;i++){a=i/(n*4)*Math.PI*2;r=[100,100,86,86][i%4];d+=(i?"L":"M")+(Math.cos(a)*r).toFixed(1)+" "+(Math.sin(a)*r).toFixed(1)}
 s.innerHTML='<g id="ramadhan_putar"><path d="'+d+'Z" fill="currentColor"/><circle r="62" fill="var(--bg)"/><circle r="52" fill="none" stroke="var(--acc)" stroke-width="6" stroke-dasharray="14 10"/><circle r="14" fill="var(--acc)"/><circle r="5" fill="var(--bg)"/></g>';
 var g=$("ramadhan_putar"),ang=0;
 function u(){g.setAttribute("transform","rotate("+(window.scrollY*0.35)+")")}
 addEventListener("scroll",u,{passive:true});s.onpointermove=function(e){g.setAttribute("transform","rotate("+(window.scrollY*0.35+e.clientX*0.3)+")")};u()})();

function tick(){var n=new Date(),e=new Date(n.getFullYear(),n.getMonth()+1,1),s=Math.max(0,Math.floor((e-n)/1000));
 $("ramadhan_h").textContent=Math.floor(s/86400);$("ramadhan_j").textContent=Math.floor(s%86400/3600);$("ramadhan_m").textContent=Math.floor(s%3600/60);$("ramadhan_d").textContent=s%60}
tick();setInterval(tick,1000);

$("ramadhan_form").onsubmit=function(e){e.preventDefault();
 var f=[["ramadhan_nama",function(v){return v.length>=3},"Isi nama minimal 3 huruf."],["ramadhan_email",function(v){return /^\S+@\S+\.\S+$/.test(v)},"Isi email yang valid, contoh: nama@email.com."],["ramadhan_pesan",function(v){return v.length>=10},"Tulis pesan minimal 10 karakter."]],ok=true;
 f.forEach(function(x){var el=$(x[0]),v=el.value.trim(),g=x[1](v);el.nextElementSibling.textContent=g?"":x[2];if(!g)ok=false});
 if(!ok)return;
 var m="Nama: "+$("ramadhan_nama").value+"%0AEmail: "+$("ramadhan_email").value+"%0A"+encodeURIComponent($("ramadhan_pesan").value);
 window.open("https://wa.me/082123819020"+WA+"?text="+m,"_blank");this.reset();toast("Pesan terkirim. Kami balas segera.")};
var qp=new URLSearchParams(location.search).get("merek");if(qp){st.brand=qp;$("ramadhan_merek").value=qp}
chips();grid();drawCart();
