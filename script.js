<<<<<<< HEAD
const P = PRODUCTS; // من ملف products.js
const CATS = {
  h: 'صمامات يدوية وميكانيكية',
  s: 'صمامات السولينويد والتحكم',
  c: 'السلندرات الهوائية',
  f: 'وحدات الخدمة والفلاتر والمنظمات',
  a: 'القوابض والملحقات'
};
const WHY = [
  'خبرة تمتد لأكثر من 10 سنوات في الشرق الأوسط، مع ضمان شامل لعيوب الصناعة وخدمات ما بعد البيع',
  'جودة عالية ومنتجات معتمدة', 'أسعار منافسة', 'فريق فني ذو كفاءة عالية', 'سرعة استجابة وتوصيل داخل المملكة'
];
const SERVICES = [
  'توفير قطع غيار متكاملة لأنظمة الهواء المضغوط', 'تقديم حلول مخصصة حسب احتياجات العملاء',
  'دعم فني واستشاري متخصص وتوفير خدمات الصيانة', 'ضمان شامل على قطع الغيار ضد عيوب الصناعة', 'سرعة في التوريد داخل المملكة'
];
const ICON = {
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
  box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v9"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  tool: '<path d="M14 6a4 4 0 005 5l-9 9a2.1 2.1 0 01-3-3zM14 6l3-3 4 4"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>'
};
const VAT = 0.15;
const fmt = n => n.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ر.س';
const $ = s => document.querySelector(s);
const svg = k => `<svg viewBox="0 0 24 24">${ICON[k]}</svg>`;
let q = '', cart = {}, step = 'cart';
const lock = () => document.body.classList.toggle('lock', $('#side').classList.contains('open') || $('#dr').classList.contains('on') || $('#modal').classList.contains('on'));

/* ============ القائمة الجانبية ============ */
function renderSide(page, arg) {
  const link = (h, ic, t, on, em) => `<li><a href="#/${h}" class="${on ? 'on' : ''}">${ic ? svg(ic) : ''}${t}${em ? `<em>${em}</em>` : ''}</a></li>`;
  const cnt = k => P.filter(p => p.c === k).length;
  $('#side ul').innerHTML =
    link('home', 'home', 'الرئيسية', page === 'home') +
    '<li class="grp">المنتجات</li>' +
    link('products', 'box', 'كل المنتجات', page === 'products' && !arg, P.length) +
    Object.entries(CATS).map(([k, t]) => `<li class="sub2">${link('products/' + k, '', t, page === 'products' && arg === k, cnt(k)).slice(4, -5)}</li>`).join('') +
    '<li class="grp">الشركة</li>' +
    link('about', 'info', 'من نحن', page === 'about') +
    link('services', 'tool', 'خدماتنا', page === 'services') +
    link('contact', 'phone', 'تواصل معنا', page === 'contact');
}

/* ============ الصفحات ============ */
const card = p => `<div class="prod" data-id="${p.id}"><div class="im"><img src="${p.img}" alt="${p.n}" onerror="this.parentNode.classList.add('noimg');this.remove()"></div><div class="in"><h3>${p.n}</h3><div class="m">${p.ms.length ? p.ms.slice(0, 2).join(' / ') + (p.ms.length > 2 ? ' …' : '') : CATS[p.c]}</div><div class="row"><span class="price">${fmt(p.p)}</span><button class="add" data-id="${p.id}">أضف للسلة</button></div></div></div>`;
const whyBoxes = () => `<div class="grid why">${WHY.map((t, i) => `<div class="box"><div class="n">${i + 1}</div><p>${t}</p></div>`).join('')}</div>`;

const VIEWS = {
  home: () => `
    <div class="hero2">
      <h2>قطع غيار <span>أنظمة الهواء المضغوط</span> بجودة عالية وأسعار تنافسية</h2>
      <p>متخصصون في استيراد وتوزيع قطع غيار أنظمة الهواء المضغوط للسوق السعودي، مع التزام كامل بالجودة وخدمة العملاء.</p>
      <a class="btn" href="#/products">تصفّح المنتجات</a><a class="btn ghost" href="#/contact">تواصل معنا</a>
      <div class="stats"><div><b>+10</b><small>سنوات خبرة في الشرق الأوسط</small></div><div><b>${P.length}</b><small>منتج في الكتالوج</small></div><div><b>جدة</b><small>المقر الرئيسي بالمملكة</small></div></div>
    </div>
    <div class="sec"><h2>أقسام المنتجات</h2><p class="sub">اختر القسم لعرض منتجاته.</p>
      <div class="grid cats">${Object.entries(CATS).map(([k, t]) => { const f = P.filter(p => p.c === k); return `<div class="cat" data-k="${k}"><div class="im"><img src="${f[0].img}" alt="" onerror="this.parentNode.classList.add('noimg');this.remove()"></div><div class="t"><b>${t}</b><small>${f.length} منتج</small></div></div>`; }).join('')}</div></div>
    <div class="sec"><h2>لماذا ايرتك جاهز؟</h2><p class="sub">شريكك الموثوق لتوريد قطع غيار خطوط الإنتاج.</p>${whyBoxes()}</div>`,

  products: arg => {
    const list = P.filter(p => (!arg || p.c === arg) && (!q || (p.n + ' ' + p.ms.join(' ') + ' ' + CATS[p.c]).toLowerCase().includes(q)));
    return `<h2>${arg ? CATS[arg] : 'كل المنتجات'}</h2><p class="sub">${list.length} منتج${q ? ` مطابق لـ «${q}»` : ''} — اضغط على المنتج لعرض الموديلات.</p>
      <div class="grid prods">${list.map(card).join('') || '<p class="empty">لا توجد نتائج مطابقة</p>'}</div>`;
  },

  about: () => `
    <h2>من نحن</h2><p class="sub">مؤسسة ايرتك جاهز للتجارة — جدة، المملكة العربية السعودية</p>
    <div class="box"><p style="font-weight:400">تأسست شركة ايرتك في جمهورية مصر العربية عام 2013، وامتدت خبرتها لتشمل السوق السعودي من خلال مؤسسة ايرتك جاهز للتجارة (ايرتك جاهز)، التي تتخذ من مدينة جدة مقراً لها. تتخصص الشركة في استيراد وتوزيع قطع غيار أنظمة الهواء المضغوط، مع التزام كامل بالجودة وخدمة العملاء.</p></div>
    <div class="grid two-c sec">
      <div class="box"><h2 style="font-size:22px">رؤيتنا</h2><p>انطلاقاً وإيماناً منا بحلم 2030 بنمو الصناعة المحلية وتشجيعها، قمنا بتوفير القطع اللازمة لخطوط الإنتاج، والتي تعد من أساسيات الصناعة للنمو والتطور، والالتزام بتقديم أفضل الحلول الصناعية للريادة العالمية في هذا المجال.</p></div>
      <div class="box"><h2 style="font-size:22px">رسالتنا</h2><p>توفير منتجات عالية الجودة بأسعار تنافسية، وخدمة فنية متميزة.</p></div>
    </div>
    <div class="sec"><h2>لماذا ايرتك جاهز؟</h2><p class="sub"></p>${whyBoxes()}</div>`,

  services: () => `<h2>خدماتنا</h2><p class="sub">دعم متكامل من التوريد حتى الصيانة.</p><div class="svc">${SERVICES.map(s => `<div>${s}</div>`).join('')}</div>`,

  contact: () => `
    <h2>تواصل معنا</h2><p class="sub">يسعدنا استقبال استفساراتكم وطلبات التسعير.</p>
    <div class="grid ci">
      <div class="box"><h4>الهاتف</h4><p><a href="tel:+966539534767">+966 53 953 4767</a></p><p><a href="tel:+966558492922">+966 55 849 2922</a></p></div>
      <div class="box"><h4>البريد الإلكتروني</h4><p><a href="mailto:airtech.ksa2@gmail.com">airtech.ksa2@gmail.com</a></p></div>
      <div class="box"><h4>العنوان</h4><p>Abd Al Jalil Yassin St, Al Marwah,<br>Jeddah 22354, Saudi Arabia</p></div>
      <div class="box"><h4>السوشيال ميديا</h4><p>Instagram / Facebook: Airtech.ksa</p><p>TikTok: airtech.jahiz.ksa</p></div>
    </div>`
};
const TITLES = { home: 'الرئيسية', products: 'المنتجات', about: 'من نحن', services: 'خدماتنا', contact: 'تواصل معنا' };

function route() {
  const [p = 'home', arg = ''] = location.hash.replace('#/', '').split('/');
  const page = VIEWS[p] ? p : 'home';
  $('#view').innerHTML = VIEWS[page](arg);
  $('#pt').textContent = page === 'products' && arg ? CATS[arg] : TITLES[page];
  renderSide(page, arg);
  closeSide();
  scrollTo(0, 0);
}
addEventListener('hashchange', route);

$('#view').onclick = e => {
  const add = e.target.closest('.add');
  if (add) {
    const p = P[add.dataset.id];
    if (p.ms.length > 1) return openModal(p.id);
    addCart(p.id, p.ms[0] || '', add);
    return;
  }
  const pr = e.target.closest('.prod');
  if (pr) return openModal(+pr.dataset.id);
  const ct = e.target.closest('.cat');
  if (ct) location.hash = '#/products/' + ct.dataset.k;
};

/* ============ البحث: أيقونة تفتح الحقل ============ */
const topbar = $('.top');
const openSearch = () => {
  topbar.classList.add('sopen');
  $('#sbtn').setAttribute('aria-expanded', 'true');
  $('#q').focus();
};
// clear = true يمسح النص ويرجع القائمة كاملة
const closeSearch = clear => {
  topbar.classList.remove('sopen');
  $('#sbtn').setAttribute('aria-expanded', 'false');
  if (clear && q) {
    q = ''; $('#q').value = '';
    if (location.hash.startsWith('#/products')) route();
  }
};
// منع الزر من سحب التركيز من الحقل (يمنع إعادة الفتح بعد الإغلاق)
$('#sbtn').onmousedown = e => e.preventDefault();
$('#sbtn').onclick = () => topbar.classList.contains('sopen') ? closeSearch(true) : openSearch();
$('#q').onblur = () => { if (!$('#q').value.trim()) closeSearch(); };
$('#q').oninput = e => {
  q = e.target.value.trim().toLowerCase();
  if (!location.hash.startsWith('#/products')) location.hash = '#/products'; else route();
};

/* ============ القائمة الجانبية: فتح وإغلاق ============ */
const closeSide = () => { $('#side').classList.remove('open'); $('#sveil').classList.remove('on'); lock(); };
$('#side').onclick = e => {
  const a = e.target.closest('a');
  if (!a) return;
  const had = q;
  q = ''; $('#q').value = '';
  closeSearch();
  closeSide();
  // لو الرابط هو نفس الصفحة الحالية لن يحدث hashchange، فنعيد الرسم يدوياً
  if (had && a.getAttribute('href') === location.hash) route();
};
$('#burger').onclick = () => { $('#side').classList.add('open'); $('#sveil').classList.add('on'); lock(); };
$('#sveil').onclick = closeSide;

/* ============ تفاصيل المنتج ============ */
function openModal(id) {
  const p = P[id], m = $('#modal');
  m.innerHTML = `<div class="mbox"><button class="mx" id="mx" aria-label="إغلاق">×</button>
    <div class="im"><img src="${p.img}" alt="${p.n}"></div>
    <div class="in"><span class="tag">${CATS[p.c]}</span><h3>${p.n}</h3>
    ${p.ms.length ? `<label>الموديل</label><select class="f ltr" id="ms">${p.ms.map(x => `<option>${x}</option>`).join('')}</select>` : '<p class="sub">للاستفسار عن الموديلات المتاحة تواصل معنا.</p>'}
    <div class="price" style="font-size:26px;margin:10px 0">${fmt(p.p)}</div>
    <button class="btn" id="madd">أضف للسلة</button></div></div>`;
  m.classList.add('on'); lock();
  $('#mx').onclick = closeModal;
  m.onclick = e => { if (e.target === m) closeModal(); };
  $('#madd').onclick = () => { addCart(id, $('#ms') ? $('#ms').value : ''); closeModal(); openDr('cart'); };
}
const closeModal = () => { $('#modal').classList.remove('on'); lock(); };

/* ============ السلة والدفع ============ */
function addCart(id, model, btn) {
  const k = id + '|' + model;
  cart[k] = (cart[k] || 0) + 1;
  sync();
  if (btn) { btn.textContent = '✓ تمت الإضافة'; setTimeout(() => btn.textContent = 'أضف للسلة', 900); }
}
const items = () => Object.keys(cart).map(k => ({ ...P[k.split('|')[0]], model: k.split('|')[1], q: cart[k], k }));
const subtotal = () => items().reduce((s, i) => s + i.p * i.q, 0);
function sync() { $('#cnt').textContent = Object.values(cart).reduce((a, b) => a + b, 0); if ($('#dr').classList.contains('on')) draw(); }
function openDr(v) { step = v || 'cart'; $('#dr').classList.add('on'); $('#veil').classList.add('on'); lock(); draw(); }
function closeDr() { $('#dr').classList.remove('on'); $('#veil').classList.remove('on'); lock(); }

function draw() {
  const bd = $('#bd'), ft = $('#ft'), it = items();
  if (step === 'cart') {
    $('#ttl').textContent = 'سلة المشتريات';
    bd.innerHTML = it.length ? it.map(i => `<div class="line"><img src="${i.img}" alt=""><div><b>${i.n}</b><small>${i.model}</small><div class="qty"><button data-d="-1" data-k="${i.k}">−</button><span>${i.q}</span><button data-d="1" data-k="${i.k}">+</button></div></div><b>${fmt(i.p * i.q)}</b></div>`).join('') : '<p class="empty">السلة فارغة — أضف منتجات من الكتالوج</p>';
    bd.querySelectorAll('.qty button').forEach(b => b.onclick = () => { cart[b.dataset.k] += +b.dataset.d; if (cart[b.dataset.k] < 1) delete cart[b.dataset.k]; sync(); draw(); });
    const s = subtotal();
    ft.innerHTML = it.length ? `<div class="sum"><span>المجموع</span><span>${fmt(s)}</span></div><div class="sum"><span>ضريبة القيمة المضافة 15%</span><span>${fmt(s * VAT)}</span></div><div class="sum t"><span>الإجمالي</span><span>${fmt(s * (1 + VAT))}</span></div><button class="btn" style="width:100%;margin-top:12px" id="go">إتمام الطلب والدفع</button>` : '';
    if (it.length) $('#go').onclick = () => { step = 'pay'; draw(); };
  } else if (step === 'pay') {
    $('#ttl').textContent = 'بيانات الطلب والدفع';
    bd.innerHTML = `<form id="fm" novalidate><label>الاسم الكامل</label><input class="f" id="nm" autocomplete="name"><div class="two"><div><label>رقم الجوال</label><input class="f ltr" id="ph" inputmode="tel" autocomplete="tel" placeholder="+966"></div><div><label>المدينة</label><input class="f" id="ct"></div></div><label>عنوان التوصيل</label><input class="f" id="ad"><label>رقم البطاقة (مدى / فيزا / ماستركارد)</label><input class="f ltr" id="cn" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000" autocomplete="cc-number"><div class="two"><div><label>تاريخ الانتهاء</label><input class="f ltr" id="ex" maxlength="5" placeholder="MM/YY" autocomplete="cc-exp"></div><div><label>CVV</label><input class="f ltr" id="cv" maxlength="4" inputmode="numeric" placeholder="***" autocomplete="cc-csc"></div></div><div class="note">🔒 نسخة تجريبية: لا تُرسل بيانات البطاقة لأي جهة ولا يتم خصم أي مبلغ. يتم ربط بوابة الدفع الحقيقية قبل الإطلاق.</div><div class="err" id="er"></div></form>`;
    $('#cn').oninput = e => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    $('#ex').oninput = e => { const v = e.target.value.replace(/\D/g, '').slice(0, 4); e.target.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v; };
    ft.innerHTML = `<button class="btn" style="width:100%" id="pay">ادفع ${fmt(subtotal() * (1 + VAT))}</button><button class="chip" style="width:100%;margin-top:8px" id="bk">رجوع للسلة</button>`;
    $('#bk').onclick = () => { step = 'cart'; draw(); };
    $('#pay').onclick = () => {
      const v = id => $('#' + id).value.trim(), er = m => $('#er').textContent = m;
      if (!v('nm') || v('ph').replace(/\D/g, '').length < 9 || !v('ct') || !v('ad')) return er('من فضلك أكمل بيانات التوصيل.');
      if (v('cn').replace(/\D/g, '').length < 15 || !/^(0[1-9]|1[0-2])\/\d\d$/.test(v('ex')) || v('cv').length < 3) return er('تحقق من بيانات البطاقة.');
      $('#pay').disabled = true; $('#pay').textContent = 'جارٍ معالجة الدفع…';
      setTimeout(() => { window.__order = 'AT-' + Date.now().toString().slice(-6); cart = {}; sync(); step = 'done'; draw(); }, 1300);
    };
  } else {
    $('#ttl').textContent = 'تم استلام طلبك';
    bd.innerHTML = `<div class="done"><i>✓</i><h2 style="font-size:24px">شكراً لك!</h2><p>رقم الطلب: <b dir="ltr">${window.__order}</b></p><p class="sub">سنتواصل معك لتأكيد الطلب وموعد التوصيل.</p></div>`;
    ft.innerHTML = '<button class="btn" style="width:100%" id="ok">متابعة التسوّق</button>';
    $('#ok').onclick = closeDr;
  }
}
$('#open').onclick = () => openDr('cart');
$('#close').onclick = closeDr;
$('#veil').onclick = closeDr;

addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeModal(); closeDr(); closeSide();
  if (document.activeElement === $('#q')) closeSearch(true);
});
=======
const P = PRODUCTS; // من ملف products.js
const CATS = {
  h: 'صمامات يدوية وميكانيكية',
  s: 'صمامات السولينويد والتحكم',
  c: 'السلندرات الهوائية',
  f: 'وحدات الخدمة والفلاتر والمنظمات',
  a: 'القوابض والملحقات'
};
const WHY = [
  'خبرة تمتد لأكثر من 10 سنوات في الشرق الأوسط، مع ضمان شامل لعيوب الصناعة وخدمات ما بعد البيع',
  'جودة عالية ومنتجات معتمدة', 'أسعار منافسة', 'فريق فني ذو كفاءة عالية', 'سرعة استجابة وتوصيل داخل المملكة'
];
const SERVICES = [
  'توفير قطع غيار متكاملة لأنظمة الهواء المضغوط', 'تقديم حلول مخصصة حسب احتياجات العملاء',
  'دعم فني واستشاري متخصص وتوفير خدمات الصيانة', 'ضمان شامل على قطع الغيار ضد عيوب الصناعة', 'سرعة في التوريد داخل المملكة'
];
const ICON = {
  home: '<path d="M3 11l9-8 9 8M5 10v10h14V10"/>',
  box: '<path d="M21 8l-9-5-9 5v8l9 5 9-5zM3 8l9 5 9-5M12 13v9"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.5"/>',
  tool: '<path d="M14 6a4 4 0 005 5l-9 9a2.1 2.1 0 01-3-3zM14 6l3-3 4 4"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>'
};
const VAT = 0.15;
const fmt = n => n.toLocaleString('en-US', { maximumFractionDigits: 2 }) + ' ر.س';
const $ = s => document.querySelector(s);
const svg = k => `<svg viewBox="0 0 24 24">${ICON[k]}</svg>`;
let q = '', cart = {}, step = 'cart';
const lock = () => document.body.classList.toggle('lock', $('#side').classList.contains('open') || $('#dr').classList.contains('on') || $('#modal').classList.contains('on'));

/* ============ القائمة الجانبية ============ */
function renderSide(page, arg) {
  const link = (h, ic, t, on, em) => `<li><a href="#/${h}" class="${on ? 'on' : ''}">${ic ? svg(ic) : ''}${t}${em ? `<em>${em}</em>` : ''}</a></li>`;
  const cnt = k => P.filter(p => p.c === k).length;
  $('#side ul').innerHTML =
    link('home', 'home', 'الرئيسية', page === 'home') +
    '<li class="grp">المنتجات</li>' +
    link('products', 'box', 'كل المنتجات', page === 'products' && !arg, P.length) +
    Object.entries(CATS).map(([k, t]) => `<li class="sub2">${link('products/' + k, '', t, page === 'products' && arg === k, cnt(k)).slice(4, -5)}</li>`).join('') +
    '<li class="grp">الشركة</li>' +
    link('about', 'info', 'من نحن', page === 'about') +
    link('services', 'tool', 'خدماتنا', page === 'services') +
    link('contact', 'phone', 'تواصل معنا', page === 'contact');
}

/* ============ الصفحات ============ */
const card = p => `<div class="prod" data-id="${p.id}"><div class="im"><img src="${p.img}" alt="${p.n}" loading="lazy"></div><div class="in"><h3>${p.n}</h3><div class="m">${p.ms.length ? p.ms.slice(0, 2).join(' / ') + (p.ms.length > 2 ? ' …' : '') : CATS[p.c]}</div><div class="row"><span class="price">${fmt(p.p)}</span><button class="add" data-id="${p.id}">أضف للسلة</button></div></div></div>`;
const whyBoxes = () => `<div class="grid why">${WHY.map((t, i) => `<div class="box"><div class="n">${i + 1}</div><p>${t}</p></div>`).join('')}</div>`;

const VIEWS = {
  home: () => `
    <div class="hero2">
      <h2>قطع غيار <span>أنظمة الهواء المضغوط</span> بجودة عالية وأسعار تنافسية</h2>
      <p>متخصصون في استيراد وتوزيع قطع غيار أنظمة الهواء المضغوط للسوق السعودي، مع التزام كامل بالجودة وخدمة العملاء.</p>
      <a class="btn" href="#/products">تصفّح المنتجات</a><a class="btn ghost" href="#/contact">تواصل معنا</a>
      <div class="stats"><div><b>+10</b><small>سنوات خبرة في الشرق الأوسط</small></div><div><b>${P.length}</b><small>منتج في الكتالوج</small></div><div><b>جدة</b><small>المقر الرئيسي بالمملكة</small></div></div>
    </div>
    <div class="sec"><h2>أقسام المنتجات</h2><p class="sub">اختر القسم لعرض منتجاته.</p>
      <div class="grid cats">${Object.entries(CATS).map(([k, t]) => { const f = P.filter(p => p.c === k); return `<div class="cat" data-k="${k}"><div class="im"><img src="${f[0].img}" alt=""></div><div class="t"><b>${t}</b><small>${f.length} منتج</small></div></div>`; }).join('')}</div></div>
    <div class="sec"><h2>لماذا ايرتك جاهز؟</h2><p class="sub">شريكك الموثوق لتوريد قطع غيار خطوط الإنتاج.</p>${whyBoxes()}</div>`,

  products: arg => {
    const list = P.filter(p => (!arg || p.c === arg) && (!q || (p.n + ' ' + p.ms.join(' ') + ' ' + CATS[p.c]).toLowerCase().includes(q)));
    return `<h2>${arg ? CATS[arg] : 'كل المنتجات'}</h2><p class="sub">${list.length} منتج${q ? ` مطابق لـ «${q}»` : ''} — اضغط على المنتج لعرض الموديلات.</p>
      <div class="grid prods">${list.map(card).join('') || '<p class="empty">لا توجد نتائج مطابقة</p>'}</div>`;
  },

  about: () => `
    <h2>من نحن</h2><p class="sub">مؤسسة ايرتك جاهز للتجارة — جدة، المملكة العربية السعودية</p>
    <div class="box"><p style="font-weight:400">تأسست شركة ايرتك في جمهورية مصر العربية عام 2013، وامتدت خبرتها لتشمل السوق السعودي من خلال مؤسسة ايرتك جاهز للتجارة (ايرتك جاهز)، التي تتخذ من مدينة جدة مقراً لها. تتخصص الشركة في استيراد وتوزيع قطع غيار أنظمة الهواء المضغوط، مع التزام كامل بالجودة وخدمة العملاء.</p></div>
    <div class="grid two-c sec">
      <div class="box"><h2 style="font-size:22px">رؤيتنا</h2><p>انطلاقاً وإيماناً منا بحلم 2030 بنمو الصناعة المحلية وتشجيعها، قمنا بتوفير القطع اللازمة لخطوط الإنتاج، والتي تعد من أساسيات الصناعة للنمو والتطور، والالتزام بتقديم أفضل الحلول الصناعية للريادة العالمية في هذا المجال.</p></div>
      <div class="box"><h2 style="font-size:22px">رسالتنا</h2><p>توفير منتجات عالية الجودة بأسعار تنافسية، وخدمة فنية متميزة.</p></div>
    </div>
    <div class="sec"><h2>لماذا ايرتك جاهز؟</h2><p class="sub"></p>${whyBoxes()}</div>`,

  services: () => `<h2>خدماتنا</h2><p class="sub">دعم متكامل من التوريد حتى الصيانة.</p><div class="svc">${SERVICES.map(s => `<div>${s}</div>`).join('')}</div>`,

  contact: () => `
    <h2>تواصل معنا</h2><p class="sub">يسعدنا استقبال استفساراتكم وطلبات التسعير.</p>
    <div class="grid ci">
      <div class="box"><h4>الهاتف</h4><p><a href="tel:+966539534767">+966 53 953 4767</a></p><p><a href="tel:+966558492922">+966 55 849 2922</a></p></div>
      <div class="box"><h4>البريد الإلكتروني</h4><p><a href="mailto:airtech.ksa2@gmail.com">airtech.ksa2@gmail.com</a></p></div>
      <div class="box"><h4>العنوان</h4><p>Abd Al Jalil Yassin St, Al Marwah,<br>Jeddah 22354, Saudi Arabia</p></div>
      <div class="box"><h4>السوشيال ميديا</h4><p>Instagram / Facebook: Airtech.ksa</p><p>TikTok: airtech.jahiz.ksa</p></div>
    </div>`
};
const TITLES = { home: 'الرئيسية', products: 'المنتجات', about: 'من نحن', services: 'خدماتنا', contact: 'تواصل معنا' };

function route() {
  const [p = 'home', arg = ''] = location.hash.replace('#/', '').split('/');
  const page = VIEWS[p] ? p : 'home';
  $('#view').innerHTML = VIEWS[page](arg);
  $('#pt').textContent = page === 'products' && arg ? CATS[arg] : TITLES[page];
  renderSide(page, arg);
  closeSide();
  scrollTo(0, 0);
}
addEventListener('hashchange', route);

$('#view').onclick = e => {
  const add = e.target.closest('.add');
  if (add) {
    const p = P[add.dataset.id];
    if (p.ms.length > 1) return openModal(p.id);
    addCart(p.id, p.ms[0] || '', add);
    return;
  }
  const pr = e.target.closest('.prod');
  if (pr) return openModal(+pr.dataset.id);
  const ct = e.target.closest('.cat');
  if (ct) location.hash = '#/products/' + ct.dataset.k;
};

/* ============ البحث: أيقونة تفتح الحقل ============ */
const topbar = $('.top');
const openSearch = () => {
  topbar.classList.add('sopen');
  $('#sbtn').setAttribute('aria-expanded', 'true');
  $('#q').focus();
};
// clear = true يمسح النص ويرجع القائمة كاملة
const closeSearch = clear => {
  topbar.classList.remove('sopen');
  $('#sbtn').setAttribute('aria-expanded', 'false');
  if (clear && q) {
    q = ''; $('#q').value = '';
    if (location.hash.startsWith('#/products')) route();
  }
};
// منع الزر من سحب التركيز من الحقل (يمنع إعادة الفتح بعد الإغلاق)
$('#sbtn').onmousedown = e => e.preventDefault();
$('#sbtn').onclick = () => topbar.classList.contains('sopen') ? closeSearch(true) : openSearch();
$('#q').onblur = () => { if (!$('#q').value.trim()) closeSearch(); };
$('#q').oninput = e => {
  q = e.target.value.trim().toLowerCase();
  if (!location.hash.startsWith('#/products')) location.hash = '#/products'; else route();
};

/* ============ القائمة الجانبية: فتح وإغلاق ============ */
const closeSide = () => { $('#side').classList.remove('open'); $('#sveil').classList.remove('on'); lock(); };
$('#side').onclick = e => {
  const a = e.target.closest('a');
  if (!a) return;
  const had = q;
  q = ''; $('#q').value = '';
  closeSearch();
  closeSide();
  // لو الرابط هو نفس الصفحة الحالية لن يحدث hashchange، فنعيد الرسم يدوياً
  if (had && a.getAttribute('href') === location.hash) route();
};
$('#burger').onclick = () => { $('#side').classList.add('open'); $('#sveil').classList.add('on'); lock(); };
$('#sveil').onclick = closeSide;

/* ============ تفاصيل المنتج ============ */
function openModal(id) {
  const p = P[id], m = $('#modal');
  m.innerHTML = `<div class="mbox"><button class="mx" id="mx" aria-label="إغلاق">×</button>
    <div class="im"><img src="${p.img}" alt="${p.n}"></div>
    <div class="in"><span class="tag">${CATS[p.c]}</span><h3>${p.n}</h3>
    ${p.ms.length ? `<label>الموديل</label><select class="f ltr" id="ms">${p.ms.map(x => `<option>${x}</option>`).join('')}</select>` : '<p class="sub">للاستفسار عن الموديلات المتاحة تواصل معنا.</p>'}
    <div class="price" style="font-size:26px;margin:10px 0">${fmt(p.p)}</div>
    <button class="btn" id="madd">أضف للسلة</button></div></div>`;
  m.classList.add('on'); lock();
  $('#mx').onclick = closeModal;
  m.onclick = e => { if (e.target === m) closeModal(); };
  $('#madd').onclick = () => { addCart(id, $('#ms') ? $('#ms').value : ''); closeModal(); openDr('cart'); };
}
const closeModal = () => { $('#modal').classList.remove('on'); lock(); };

/* ============ السلة والدفع ============ */
function addCart(id, model, btn) {
  const k = id + '|' + model;
  cart[k] = (cart[k] || 0) + 1;
  sync();
  if (btn) { btn.textContent = '✓ تمت الإضافة'; setTimeout(() => btn.textContent = 'أضف للسلة', 900); }
}
const items = () => Object.keys(cart).map(k => ({ ...P[k.split('|')[0]], model: k.split('|')[1], q: cart[k], k }));
const subtotal = () => items().reduce((s, i) => s + i.p * i.q, 0);
function sync() { $('#cnt').textContent = Object.values(cart).reduce((a, b) => a + b, 0); if ($('#dr').classList.contains('on')) draw(); }
function openDr(v) { step = v || 'cart'; $('#dr').classList.add('on'); $('#veil').classList.add('on'); lock(); draw(); }
function closeDr() { $('#dr').classList.remove('on'); $('#veil').classList.remove('on'); lock(); }

function draw() {
  const bd = $('#bd'), ft = $('#ft'), it = items();
  if (step === 'cart') {
    $('#ttl').textContent = 'سلة المشتريات';
    bd.innerHTML = it.length ? it.map(i => `<div class="line"><img src="${i.img}" alt=""><div><b>${i.n}</b><small>${i.model}</small><div class="qty"><button data-d="-1" data-k="${i.k}">−</button><span>${i.q}</span><button data-d="1" data-k="${i.k}">+</button></div></div><b>${fmt(i.p * i.q)}</b></div>`).join('') : '<p class="empty">السلة فارغة — أضف منتجات من الكتالوج</p>';
    bd.querySelectorAll('.qty button').forEach(b => b.onclick = () => { cart[b.dataset.k] += +b.dataset.d; if (cart[b.dataset.k] < 1) delete cart[b.dataset.k]; sync(); draw(); });
    const s = subtotal();
    ft.innerHTML = it.length ? `<div class="sum"><span>المجموع</span><span>${fmt(s)}</span></div><div class="sum"><span>ضريبة القيمة المضافة 15%</span><span>${fmt(s * VAT)}</span></div><div class="sum t"><span>الإجمالي</span><span>${fmt(s * (1 + VAT))}</span></div><button class="btn" style="width:100%;margin-top:12px" id="go">إتمام الطلب والدفع</button>` : '';
    if (it.length) $('#go').onclick = () => { step = 'pay'; draw(); };
  } else if (step === 'pay') {
    $('#ttl').textContent = 'بيانات الطلب والدفع';
    bd.innerHTML = `<form id="fm" novalidate><label>الاسم الكامل</label><input class="f" id="nm" autocomplete="name"><div class="two"><div><label>رقم الجوال</label><input class="f ltr" id="ph" inputmode="tel" autocomplete="tel" placeholder="+966"></div><div><label>المدينة</label><input class="f" id="ct"></div></div><label>عنوان التوصيل</label><input class="f" id="ad"><label>رقم البطاقة (مدى / فيزا / ماستركارد)</label><input class="f ltr" id="cn" inputmode="numeric" maxlength="19" placeholder="0000 0000 0000 0000" autocomplete="cc-number"><div class="two"><div><label>تاريخ الانتهاء</label><input class="f ltr" id="ex" maxlength="5" placeholder="MM/YY" autocomplete="cc-exp"></div><div><label>CVV</label><input class="f ltr" id="cv" maxlength="4" inputmode="numeric" placeholder="***" autocomplete="cc-csc"></div></div><div class="note">🔒 نسخة تجريبية: لا تُرسل بيانات البطاقة لأي جهة ولا يتم خصم أي مبلغ. يتم ربط بوابة الدفع الحقيقية قبل الإطلاق.</div><div class="err" id="er"></div></form>`;
    $('#cn').oninput = e => e.target.value = e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    $('#ex').oninput = e => { const v = e.target.value.replace(/\D/g, '').slice(0, 4); e.target.value = v.length > 2 ? v.slice(0, 2) + '/' + v.slice(2) : v; };
    ft.innerHTML = `<button class="btn" style="width:100%" id="pay">ادفع ${fmt(subtotal() * (1 + VAT))}</button><button class="chip" style="width:100%;margin-top:8px" id="bk">رجوع للسلة</button>`;
    $('#bk').onclick = () => { step = 'cart'; draw(); };
    $('#pay').onclick = () => {
      const v = id => $('#' + id).value.trim(), er = m => $('#er').textContent = m;
      if (!v('nm') || v('ph').replace(/\D/g, '').length < 9 || !v('ct') || !v('ad')) return er('من فضلك أكمل بيانات التوصيل.');
      if (v('cn').replace(/\D/g, '').length < 15 || !/^(0[1-9]|1[0-2])\/\d\d$/.test(v('ex')) || v('cv').length < 3) return er('تحقق من بيانات البطاقة.');
      $('#pay').disabled = true; $('#pay').textContent = 'جارٍ معالجة الدفع…';
      setTimeout(() => { window.__order = 'AT-' + Date.now().toString().slice(-6); cart = {}; sync(); step = 'done'; draw(); }, 1300);
    };
  } else {
    $('#ttl').textContent = 'تم استلام طلبك';
    bd.innerHTML = `<div class="done"><i>✓</i><h2 style="font-size:24px">شكراً لك!</h2><p>رقم الطلب: <b dir="ltr">${window.__order}</b></p><p class="sub">سنتواصل معك لتأكيد الطلب وموعد التوصيل.</p></div>`;
    ft.innerHTML = '<button class="btn" style="width:100%" id="ok">متابعة التسوّق</button>';
    $('#ok').onclick = closeDr;
  }
}
$('#open').onclick = () => openDr('cart');
$('#close').onclick = closeDr;
$('#veil').onclick = closeDr;

addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeModal(); closeDr(); closeSide();
  if (document.activeElement === $('#q')) closeSearch(true);
});
>>>>>>> cf718ac1006e3ecb5e788c8fa96df1047a69eaf7
route();