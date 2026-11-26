/* Entre el rito y el refugio · Interfaz (React 18 + htm). Los datos están en data.js */
{
const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } = React;
const html = htm.bind(React.createElement);
const D = window.DATA;
const Ctx = createContext(null);
const useApp = () => useContext(Ctx);

const C = { antro:'#E8A23A', psi:'#B8AE7E', con:'#D07A4C', coal:'#F6E3BE', wood:'#C98A4E', gold:'#E8A23A' };
const AX = { antro:'Eje antropológico', psi:'Eje psicológico', con:'Conexión entre ejes' };
const img = n => `img/f${String(n).padStart(2,'0')}.jpg`;
const th = n => `th/f${String(n).padStart(2,'0')}.jpg`;
const photo = n => D.PHOTOS.find(p => p.n === n);
const space = id => D.SPACES.find(s => s.id === id);
const gesture = id => D.GESTURES.find(g => g.id === id);
const testi = id => D.TESTIMONIES.find(t => t.id === id);
const OBJ = id => D.OBJECTS.find(o => o.id === id);

const SECTIONS = [
  { id:'territorio', label:'El territorio', short:'Territorio', icon:'map' },
  { id:'cuerpo', label:'El cuerpo que reza', short:'Cuerpo', icon:'body' },
  { id:'memoria', label:'Memoria de la fe', short:'Memoria', icon:'time' },
  { id:'crisis', label:'La fe ante la crisis', short:'Crisis', icon:'voice' },
  { id:'conexiones', label:'Conexiones', short:'Conexiones', icon:'net' },
  { id:'investigacion', label:'Nuestra investigación', short:'Investigación', icon:'book' }
];

function Icon({ n }) {
  const p = { fill:'none', stroke:'currentColor', strokeWidth:1.5, strokeLinecap:'round', strokeLinejoin:'round' };
  const d = {
    map: html`<path ...${p} d="M4 20V8l8-5 8 5v12"/><path ...${p} d="M9 20v-6h6v6M12 3v3"/>`,
    body: html`<circle ...${p} cx="12" cy="5" r="2.2"/><path ...${p} d="M12 8v7m0 0-3 6m3-6 3 6M7 10l5 1 5-1"/>`,
    time: html`<circle ...${p} cx="12" cy="12" r="8.5"/><path ...${p} d="M12 7v5l3 2"/>`,
    voice: html`<path ...${p} d="M5 5h14v10H10l-4 4v-4H5z"/><path ...${p} d="M9 10h6"/>`,
    net: html`<circle ...${p} cx="6" cy="6" r="2.2"/><circle ...${p} cx="18" cy="8" r="2.2"/><circle ...${p} cx="10" cy="18" r="2.2"/><path ...${p} d="M8 7l8 1M7 8l2 8m3 0 5-6"/>`,
    book: html`<path ...${p} d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path ...${p} d="M12 6v14"/>`
  };
  return html`<svg viewBox="0 0 24 24" aria-hidden="true">${d[n]}</svg>`;
}

/* ---------- Reusable ---------- */
function Thumb({ n, cls, alt }) {
  const { openPhoto } = useApp();
  const ph = photo(n);
  return html`<img class=${cls||''} src=${th(n)} alt=${alt || (ph ? ph.cap : 'Fotografía '+n)} loading="lazy" onClick=${() => openPhoto(n)} />`;
}
function SrcBtn({ id, children }) {
  const { openSource } = useApp();
  return html`<button class="link" onClick=${() => openSource(id)}>${children || D.SOURCES[id]?.short || id}</button>`;
}
function AxisTag({ a }) { return html`<span class=${'tag '+a}><span class="dot" style=${{background:C[a]}}></span>${AX[a]}</span>`; }
const refsToSources = s => Object.keys(D.SOURCES).filter(k => s && s.includes(k === 'BV' ? 'Vanessa' : k === 'INF' ? 'nforme' : k));

/* ---------- Lightbox ---------- */
function Lightbox({ n, list, onClose, setN }) {
  const { go } = useApp();
  const ph = photo(n); const arr = list && list.length ? list : D.PHOTOS.map(p => p.n);
  const i = arr.indexOf(n);
  const step = d => setN(arr[(i + d + arr.length) % arr.length]);
  useEffect(() => {
    const k = e => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowRight') step(1); if (e.key === 'ArrowLeft') step(-1); };
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k);
  });
  const sp = ph && space(ph.space);
  return html`<div class="overlay" role="dialog" aria-label="Fotografía ampliada">
    <div class="ov-top"><span class="small" style=${{color:'#d8ccb2'}}>Evidencia fotográfica n.º ${n}</span><button onClick=${onClose}>Cerrar ✕</button></div>
    <div class="ov-img" onClick=${e => { if (e.target === e.currentTarget) onClose(); }}><img src=${img(n)} alt=${ph?.cap} /></div>
    <div class="ov-cap">
      <p>${ph?.cap}</p>
      <div class="small" style=${{color:'#bdb29a',marginBottom:12}}>Esta imagen es parte de nuestra evidencia de campo. No registramos el día exacto de la toma, y por respeto no interpretamos lo que sienten las personas que aparecen en ella.</div>
      <div class="ov-nav">
        <button onClick=${() => step(-1)}>← Anterior</button>
        ${sp && html`<button onClick=${() => { onClose(); go('territorio', { space: sp.id }); }}>Ver en el mapa: ${sp.short}</button>`}
        <button onClick=${() => step(1)}>Siguiente →</button>
      </div>
    </div>
  </div>`;
}

function SourceModal({ id, onClose }) {
  const { go } = useApp();
  const s = D.SOURCES[id]; if (!s) return null;
  const tests = D.TESTIMONIES.filter(t => D.VOICES[t.voice].src === id);
  return html`<div class="modal" onClick=${e => { if (e.target === e.currentTarget) onClose(); }}>
    <div class="pane">
      <button class="close" onClick=${onClose}>Cerrar</button>
      <div class="kicker"><i></i>Fuente ${s.kind}</div>
      <h3 style=${{fontSize:30,marginBottom:10}}>${s.title}</h3>
      <dl class="meta"><dt>Fecha</dt><dd>${s.date}</dd><dt>Autoría</dt><dd>${s.who}</dd></dl>
      <p>${s.note}</p>
      ${tests.length > 0 && html`<h4 style=${{marginTop:18}}>Testimonios de esta fuente</h4>
        <ul class="bul g">${tests.map(t => html`<li key=${t.id}><button class="link" onClick=${() => { onClose(); go('crisis', { testimony: t.id }); }}>${t.title}</button> · ${D.VOICES[t.voice].code}</li>`)}</ul>`}
      <button class="btn sm ghost" style=${{marginTop:12}} onClick=${() => { onClose(); go('investigacion', { anchor:'fuentes' }); }}>Ver todas las fuentes</button>
    </div></div>`;
}

/* ---------- Welcome ---------- */
function Welcome() {
  const { go } = useApp();
  return html`<section class="hero">
    <div class="hero-img"><img src=${img(30)} alt="Altar mayor de la Parroquia San Alfonso María de Ligorio con la asamblea reunida" /></div>
    <div class="hero-txt">
      <div class="kicker" style=${{color:'#cdbf9f'}}><i></i>Barrio La Soledad · Teusaquillo · Bogotá</div>
      <h1>Entre el rito <em>y el refugio</em></h1>
      <div class="sub">Cartografía social interactiva de la Parroquia San Alfonso María de Ligorio</div>
      <p class="lede">Un espacio compartido. Distintas formas de vivir la fe, afrontar la incertidumbre y encontrar esperanza. Una experiencia etnográfica construida con nuestras entradas de campo, entrevistas y una amplia evidencia fotográfica tomada por el equipo.</p>
      <div class="q">¿Cómo se relacionan los rituales religiosos, el lenguaje corporal y la cohesión comunitaria con las formas de afrontamiento de la vulnerabilidad de los creyentes en la Parroquia San Alfonso?</div>
      <div class="axiscards">
        <div class="axiscard"><span class="dot" style=${{background:C.antro}}></span><b>Eje 1 · El rito</b><p>Teoría del ritual y antropología cultural: cuerpo, tradición y cohesión.</p></div>
        <div class="axiscard"><span class="dot" style=${{background:C.psi}}></span><b>Eje 2 · El refugio</b><p>Dimensión psicológica: vulnerabilidad, afrontamiento, esperanza.</p></div>
      </div>
      <div style=${{display:'flex',gap:12,flexWrap:'wrap',alignItems:'center'}}>
        <button class="btn gold" onClick=${() => go('territorio')}>Explorar el territorio →</button>
        <button class="btn ghost" style=${{color:'#ead9b5'}} onClick=${() => go('investigacion')}>Sobre la investigación</button>
      </div>
      <div class="strip">${[1,38,43,52].map(n => html`<${Thumb} key=${n} n=${n} />`)}</div>
    </div>
  </section>`;
}

/* ---------- Map ---------- */
const LAYERS = [
  { id:'ritual', label:'Ritual y lenguaje corporal', color:C.antro },
  { id:'vuln', label:'Vulnerabilidad y afrontamiento', color:C.psi },
  { id:'actores', label:'Actores sociales y comunidad', color:C.coal },
  { id:'recorridos', label:'Recorridos y desplazamientos', color:C.con },
  { id:'objetos', label:'Objetos religiosos', color:C.wood }
];

function curve(a, b) {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2; const dx = b.x - a.x, dy = b.y - a.y;
  const k = .18; return `M${a.x},${a.y} Q${mx - dy * k},${my + dx * k} ${b.x},${b.y}`;
}

function ChurchMap({ selected, onSelect, layers, moment, fill, toolbar }) {
  const [z, setZ] = useState(1); const [c, setC] = useState({ x:500, y:360 });
  const drag = useRef(null); const svg = useRef(null);
  useEffect(() => { if (selected && z > 1) { const s = space(selected); setC({ x:s.x, y:s.y }); } }, [selected]);
  const W = 1000 / z, H = 720 / z;
  const vx = Math.max(0, Math.min(1000 - W, c.x - W / 2)), vy = Math.max(0, Math.min(720 - H, c.y - H / 2));
  const zoom = d => { const nz = Math.max(1, Math.min(3, +(z + d).toFixed(2))); setZ(nz); if (selected && d > 0) { const s = space(selected); setC({ x:s.x, y:s.y }); } };
  const down = e => { if (z === 1) return; drag.current = { x:e.clientX, y:e.clientY, c:{...c} }; };
  const move = e => { if (!drag.current) return; const r = svg.current.getBoundingClientRect(); const f = W / r.width;
    setC({ x: drag.current.c.x - (e.clientX - drag.current.x) * f, y: drag.current.c.y - (e.clientY - drag.current.y) * f }); };
  const up = () => { drag.current = null; };
  const showPaths = moment || layers.recorridos;
  const paths = D.PATHS.filter(p => !moment || p.when.includes(moment));
  const occR = [0, 22, 32, 44, 58, 74];
  const lay = LAYERS.filter(l => l.id !== 'recorridos' && layers[l.id]);
  return html`<div class=${'mapcard'+(fill?' fill':'')}>
    <div class="maptools">
      ${toolbar || html`<span class="small">${moment ? 'Uso del espacio · ' + D.MOMENTS[moment].label.toLowerCase() + ' de la eucaristía' : 'Toque un punto para abrir su ficha'}</span>`}
      <div class="zoom">
        <button aria-label="Acercar" onClick=${() => zoom(.5)}>+</button>
        <button aria-label="Alejar" onClick=${() => zoom(-.5)}>−</button>
        <button aria-label="Restablecer" style=${{fontStyle:'italic',fontSize:19}} onClick=${() => { setZ(1); setC({x:500,y:360}); }}>Ver todo</button>
      </div>
    </div>
    <svg ref=${svg} class="mapsvg" viewBox=${`${vx} ${vy} ${W} ${H}`} onPointerDown=${down} onPointerMove=${move} onPointerUp=${up} onPointerLeave=${up}
      style=${{cursor: z > 1 ? 'grab' : 'default'}} role="img" aria-label="Plano esquemático de la parroquia">
      <defs>
        <radialGradient id="candle"><stop offset="0" stop-color="#FFECB8" stop-opacity=".95"/><stop offset=".25" stop-color="#F0B44C" stop-opacity=".7"/><stop offset="1" stop-color="#E08E00" stop-opacity="0"/></radialGradient>
        <radialGradient id="heat"><stop offset="0" stop-color="#E08E00" stop-opacity=".5"/><stop offset="1" stop-color="#8B3A00" stop-opacity="0"/></radialGradient>
        <radialGradient id="window"><stop offset="0" stop-color="#F0B44C" stop-opacity=".22"/><stop offset="1" stop-color="#F0B44C" stop-opacity="0"/></radialGradient>
      </defs>
      <ellipse cx="530" cy="140" rx="320" ry="220" fill="url(#window)"/>
      <text x="530" y="700" text-anchor="middle" font-size="20" fill="#E8D1A7" opacity=".5" font-style="italic" letter-spacing="3">Avenida Carrera 28</text>
      <rect x="300" y="602" width="460" height="58" rx="14" fill="rgba(232,209,167,.05)"/>
      <text x="752" y="630" text-anchor="end" font-size="17" fill="#E8D1A7" opacity=".55" font-style="italic">Atrio · vendedores ambulantes</text>
      <rect x="40" y="30" width="230" height="90" rx="12" fill="rgba(132,89,43,.16)" stroke="#A97A45" stroke-opacity=".5"/><text x="155" y="82" text-anchor="middle" font-size="19" fill="#E8D1A7" opacity=".65" font-style="italic">Casa parroquial</text>
      <rect x="40" y="128" width="230" height="72" rx="12" fill="rgba(157,145,103,.12)"/><text x="155" y="170" text-anchor="middle" font-size="19" fill="#E8D1A7" opacity=".65" font-style="italic">Patio</text>
      <rect x="40" y="210" width="230" height="350" rx="14" fill="rgba(132,89,43,.16)" stroke="#A97A45" stroke-opacity=".6"/>
      <path d="M40 325 H270 M40 425 H270" stroke="#A97A45" stroke-opacity=".35"/>
      <rect x="62" y="338" width="110" height="74" rx="6" fill="rgba(255,236,184,.08)" stroke="rgba(255,236,184,.3)" stroke-dasharray="3 4"/>
      <text x="290" y="400" text-anchor="middle" font-size="16" fill="#E8D1A7" opacity=".45" transform="rotate(-90 290 400)" font-style="italic">Pasillo · filas</text>
      <path d="M330 600 V150 H430 V100 Q530 22 630 100 V150 H730 V600 Z" fill="rgba(132,89,43,.16)" stroke="#A97A45" stroke-width="2"/>
      <rect x="330" y="82" width="100" height="68" rx="8" fill="rgba(132,89,43,.1)" stroke="#A97A45" stroke-opacity=".4"/><rect x="630" y="82" width="100" height="68" rx="8" fill="rgba(132,89,43,.1)" stroke="#A97A45" stroke-opacity=".4"/>
      <text x="380" y="122" text-anchor="middle" font-size="16" fill="#E8D1A7" opacity=".5" font-style="italic">Dependencia</text><text x="680" y="122" text-anchor="middle" font-size="16" fill="#E8D1A7" opacity=".5" font-style="italic">Dependencia</text>
      ${[0,1,2,3,4,5,6,7,8,9].map(i => html`<g key=${i}><rect x="420" y=${215 + i*34} width="78" height="11" rx="5" fill="#84592B" opacity=".7"/><rect x="562" y=${215 + i*34} width="78" height="11" rx="5" fill="#84592B" opacity=".7"/></g>`)}
      ${[220,320,420].map(y => html`<rect key=${'r'+y} x="732" y=${y} width="30" height="60" rx="15" fill="rgba(224,142,0,.25)"/>`)}
      ${[220,320].map(y => html`<rect key=${'l'+y} x="298" y=${y} width="30" height="60" rx="15" fill="rgba(224,142,0,.25)"/>`)}
      <path d="M292 560 v-56 q18 -24 36 0 v56z" fill="rgba(224,142,0,.3)"/><path d="M732 560 v-56 q18 -24 36 0 v56z" fill="rgba(224,142,0,.3)"/>
      <text x="772" y="590" text-anchor="end" font-size="16" fill="#E8D1A7" opacity=".5" font-style="italic">Altar externo</text>
      ${moment && D.SPACES.map(s => html`<circle key=${'h'+s.id} cx=${s.x} cy=${s.y} r=${occR[s.occupancy[moment]] * 1.3} fill="url(#heat)" style=${{transition:'r .8s'}}/>`)}
      ${showPaths && paths.map(p => { const a = space(p.from), b = space(p.to); return html`<path key=${p.id} class="flow" d=${curve(a,b)} stroke="#F0B44C"><title>${p.label} (${p.ref})</title></path>`; })}
      ${D.SPACES.map(s => {
        const on = selected === s.id;
        return html`<g key=${s.id} class="hot" tabindex="0" role="button" aria-label=${s.name} onClick=${() => onSelect(s.id)} onKeyDown=${e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(s.id); } }}>
          ${lay.map((l, i) => html`<circle key=${l.id} cx=${s.x} cy=${s.y} r=${20 + i*7} fill="none" stroke=${l.color} stroke-width="2" opacity=".6"/>`)}
          <circle class="flame" cx=${s.x} cy=${s.y} r=${on ? 46 : 30} fill="url(#candle)"/>
          <circle cx=${s.x} cy=${s.y} r=${on ? 8 : 6} fill="#FFECB8"/>
          <text x=${s.x} y=${s.y + 40} text-anchor="middle" font-size=${on ? 25 : 22} font-style=${on ? 'italic' : 'normal'} fill=${on ? '#FFECB8' : '#E8D1A7'}
            style=${{paintOrder:'stroke',stroke:'#2c1507',strokeWidth:6,strokeLinejoin:'round'}}>${s.short}</text>
        </g>`; })}
    </svg>
    <div class="prov">Esquema provisional, no a escala. Basado en el croquis de la primera entrada y en los recorridos registrados.</div>
    <div class="legend">
      <span><span class="dot" style=${{background:'#fff',border:'2px solid '+C.coal}}></span>Espacio registrado</span>
      ${LAYERS.map(l => html`<span key=${l.id}><span class="dot" style=${{background:l.color}}></span>${l.label}</span>`)}
      ${moment && html`<span><span class="dot" style=${{background:'rgba(135,63,53,.4)'}}></span>Uso descrito (cualitativo)</span>`}
    </div>
  </div>`;
}

const TABS = [['obs','Lo que observamos'],['dice','Lo que nos cuentan'],['int','Lo que interpretamos'],['doc','Lo que establece la doctrina']];
function SpaceSheet({ id, dock }) {
  const { go, openPhoto } = useApp();
  const s = space(id); const [tab, setTab] = useState('obs');
  useEffect(() => setTab('obs'), [id]);
  const tabs = TABS.filter(t => t[0] !== 'doc' || s.doctrine.length);
  return html`<aside class=${'sheet'+(dock?' dock':'')} key=${id}>
    <div class="sheet-img" onClick=${() => openPhoto(s.photo, s.photos)}><img src=${img(s.photo)} alt=${photo(s.photo).cap}/>
      <div class="ttl"><div class="small" style=${{color:'#e9dcc0'}}>Foto ${s.photo} · ampliar</div><h3>${s.name}</h3></div></div>
    <div class="sheet-body">
      <p style=${{fontFamily:'var(--serif)',fontSize:20,lineHeight:1.35}}>${s.lead}</p>
      <dl class="meta">
        <dt>Actores</dt><dd>${s.actors.join(' · ')}</dd>
        <dt>Gestos</dt><dd>${s.gestures.length ? s.gestures.map((g, i) => html`<span key=${g}>${i ? ' · ' : ''}<button class="link" onClick=${() => go('cuerpo', { gesture:g })}>${gesture(g).name}</button></span>`) : '—'}</dd>
        <dt>Objetos</dt><dd>${s.objects.length ? s.objects.map((o, i) => html`<span key=${o}>${i ? ' · ' : ''}<button class="link" onClick=${() => go('conexiones', { tab:'objetos', object:o })}>${OBJ(o).name}</button></span>`) : '—'}</dd>
        <dt>Dimensiones</dt><dd>${s.dims.map(d => D.DIMS[d]).join(' · ')}</dd>
      </dl>
      <div class="tabs" role="tablist">${tabs.map(t => html`<button key=${t[0]} role="tab" aria-selected=${tab===t[0]} class=${'tab'+(tab===t[0]?' on':'')} onClick=${() => setTab(t[0])}>${t[1]}</button>`)}</div>
      ${tab === 'obs' && html`<div><ul class="bul">${s.observed.map((o, i) => html`<li key=${i}>${o}</li>`)}</ul>
        <span class="lbl">Evidencia fotográfica</span><div class="thumbs">${s.photos.map(n => html`<${Thumb} key=${n} n=${n}/>`)}</div></div>`}
      ${tab === 'dice' && html`<div>
        ${s.told.length ? s.told.map(t => { const T = testi(t); return html`<div key=${t} style=${{marginBottom:12}}>
          <div class=${'quote'+(T.literal?'':' syn')}>${T.literal ? '«'+T.quotes[0]+'»' : T.quotes[0]}</div>
          <span class="small">${D.VOICES[T.voice].code} · ${D.SOURCES[D.VOICES[T.voice].src].short}</span> · <button class="link" onClick=${() => go('crisis', { testimony:t })}>Ver testimonio</button></div>`; })
          : html`<p class="small">No hay testimonios que se refieran directamente a este espacio. Lo registrado proviene de la observación.</p>`}
        ${s.emotions.length > 0 && html`<span class="lbl">Relaciones emocionales (categorías cualitativas)</span>
          <div class="chips" style=${{marginTop:6}}>${s.emotions.map((e, i) => html`<span key=${i} class="tag psi" title=${e.ev ? 'Respaldado por un testimonio' : 'Registrado por observación'}>${e.k}${e.ev ? ' · ' + D.VOICES[testi(e.ev).voice].code : ' · observación'}</span>`)}</div>`}
      </div>`}
      ${tab === 'int' && html`<ul class="bul t">${s.interpreted.map((o, i) => html`<li key=${i}>${o}</li>`)}</ul>`}
      ${tab === 'doc' && html`<div><ul class="bul">${s.doctrine.map((o, i) => html`<li key=${i}>${o}</li>`)}</ul><p class="small">Nivel «lo que se debería hacer» (Restrepo). Aquí aparece la voz de la doctrina: no para juzgar las prácticas, sino para mostrar dónde lo que hace la gente coincide con la norma y dónde la desborda.</p></div>`}
      <span class="lbl">Momentos</span>
      <ul class="bul" style=${{fontSize:14}}>${['antes','durante','despues'].map(m => html`<li key=${m}><b>${D.MOMENTS[m].label}:</b> ${s.moments[m]}</li>`)}</ul>
      <div class="row" style=${{display:'flex',flexWrap:'wrap',gap:8,alignItems:'center'}}>
        <span class="small">Fuentes:</span>${s.refs.map(r => html`<${SrcBtn} key=${r} id=${r}/>`)}
        <button class="btn sm ghost" style=${{marginLeft:'auto'}} onClick=${() => go('conexiones', { tab:'momentos', space:id })}>Comparar momentos</button>
      </div>
    </div></aside>`;
}

function Territorio({ params }) {
  const [sel, setSel] = useState(params.space || 'nave');
  const [layers, setLayers] = useState({ ritual:true, vuln:false, actores:false, recorridos:false, objetos:false });
  useEffect(() => { if (params.space) setSel(params.space); }, [params.space]);
  const active = LAYERS.filter(l => layers[l.id]);
  return html`<div class="terr">
    <div class="terr-main">
      <div class="terr-head"><div><div class="kicker"><i></i>1 · El territorio</div><h2>Un mismo templo, ocho formas de habitarlo</h2></div>
        <p>El plano reúne lo que observamos, lo que nos contaron y lo que interpretamos en cada espacio. Active capas para superponer dimensiones; seleccione un punto para abrir su ficha.</p></div>
      <div class="terr-canvas">
        <${ChurchMap} fill selected=${sel} onSelect=${setSel} layers=${layers} toolbar=${html`<div class="chips layerbar" role="group" aria-label="Capas"><span class="small" style=${{alignSelf:'center',marginRight:4}}>Capas</span>
          ${LAYERS.map(l => html`<button key=${l.id} class=${'chip'+(layers[l.id]?' on':'')} aria-pressed=${layers[l.id]} onClick=${() => setLayers({ ...layers, [l.id]: !layers[l.id] })}><span class="dot" style=${{background:l.color}}></span>${l.label}</button>`)}</div>`}/>
      </div>
      <div class="placesbar">${D.SPACES.map(s => html`<button key=${s.id} class=${'chip'+(sel===s.id?' on':'')} onClick=${() => setSel(s.id)}>${s.short}</button>`)}</div>
      ${active.length > 0 && html`<div class="layerpanel">${active.map(l => html`<div class="layerbox" key=${l.id}>
        <h4><span class="dot" style=${{background:l.color}}></span>${l.label}</h4>
        ${l.id === 'recorridos' ? D.PATHS.map(p => html`<button key=${p.id} onClick=${() => setSel(p.to)}><b>${space(p.from).short} → ${space(p.to).short}.</b> ${p.label} <span class="small">(${p.ref})</span></button>`)
          : D.SPACES.filter(s => s.layers[l.id] && s.layers[l.id] !== '—').map(s => html`<button key=${s.id} onClick=${() => setSel(s.id)}><b>${s.short}:</b> ${s.layers[l.id]}</button>`)}
      </div>`)}</div>`}
    </div>
    <${SpaceSheet} id=${sel} dock/>
  </div>`;
}

/* ---------- Cuerpo ---------- */
function Cuerpo({ params }) {
  const { go, openPhoto } = useApp();
  const [f, setF] = useState('todos'); const [open, setOpen] = useState(params.gesture || null);
  useEffect(() => { if (params.gesture) { setOpen(params.gesture); setF('todos'); setTimeout(() => document.getElementById('g-' + params.gesture)?.scrollIntoView({ behavior:'smooth', block:'center' }), 80); } }, [params.gesture]);
  const cats = [['todos','Todos'],['individual','Individuales'],['colectivo','Colectivos'],['vocal','Vocales'],['desplazamiento','Desplazamientos']];
  const list = D.GESTURES.filter(g => f === 'todos' || g.cat.includes(f));
  return html`<div class="band"><div class="wrap">
    <div class="sechead"><div><div class="kicker"><i></i>2 · El cuerpo que reza</div><h2>Lo que el cuerpo dice sin palabras</h2></div>
      <p>Solo se incluyen gestos registrados en las entradas de campo. Cada tarjeta indica dónde ocurre, su escala y la fuente.</p></div>
    <div class="theory"><div><div class="kicker" style=${{color:'#cdbf9f'}}><i></i>Fundamento</div><h3 style=${{fontSize:32,color:'#f3e6c4'}}>El rito como «paralenguaje actuado»</h3><p class="small" style=${{color:'#bdb29a',marginTop:10}}>Pedro Gómez García · antropología del ritual</p></div>
      <ol>${D.GOMEZ.map((g, i) => html`<li key=${i}>${g}</li>`)}</ol></div>
    <div class="chips" style=${{marginBottom:18}}>${cats.map(c => html`<button key=${c[0]} class=${'chip'+(f===c[0]?' on':'')} onClick=${() => setF(c[0])}>${c[1]}</button>`)}</div>
    <div class="grid">${list.map(g => { const o = open === g.id; const sp = space(g.space);
      return html`<article class="card" id=${'g-'+g.id} key=${g.id} style=${o ? {outline:'2px solid '+C.gold} : null}>
        <div class="ph" onClick=${() => g.photos.length && openPhoto(g.photos[0], g.photos)}>
          ${g.photos.length ? html`<img src=${th(g.photos[0])} alt=${photo(g.photos[0]).cap} loading="lazy"/>` : html`<div class="ph-empty">Gesto registrado en las bitácoras, sin fotografía en el archivo</div>`}
        </div>
        <div class="bd">
          <div class="chips">${g.cat.map(c => html`<span key=${c} class="tag antro">${c}</span>`)}</div>
          <h3>${g.name}</h3>
          <p style=${{margin:0,fontSize:15}}>${g.seen}</p>
          ${o && html`<div class="more">
            <span class="lbl">Dónde ocurre</span>${sp.name}
            <span class="lbl">Escala</span>${g.scale}
            <span class="lbl">Significado antropológico posible</span>${g.meaning}
            <span class="lbl">Relación con la comunidad</span>${g.community}
            <span class="lbl">Fuente</span>${g.ref}
            ${g.photos.length > 1 && html`<div class="thumbs" style=${{marginTop:10}}>${g.photos.map(n => html`<${Thumb} key=${n} n=${n}/>`)}</div>`}
          </div>`}
          <div class="row">
            <button class="btn sm" onClick=${() => setOpen(o ? null : g.id)}>${o ? 'Cerrar' : 'Leer más'}</button>
            <button class="link" onClick=${() => go('territorio', { space:g.space })}>Ver en el mapa</button>
            ${g.testimony && html`<button class="link" onClick=${() => go('crisis', { testimony:g.testimony })}>Testimonio</button>`}
          </div>
        </div></article>`; })}</div>
  </div></div>`;
}

/* ---------- Memoria ---------- */
function Memoria() {
  const { openPhoto, go } = useApp();
  const [k, setK] = useState('todos'); const [sel, setSel] = useState('h1'); const ref = useRef(null);
  const list = D.TIMELINE.filter(t => k === 'todos' || t.kind === k);
  const cur = D.TIMELINE.find(t => t.id === sel) || list[0];
  const idx = list.findIndex(t => t.id === cur.id);
  const pick = id => { setSel(id); setTimeout(() => ref.current?.querySelector('[data-id="'+id+'"]')?.scrollIntoView({ behavior:'smooth', inline:'center', block:'nearest' }), 30); };
  const kc = { leyenda:C.antro, historiografia:C.wood, documentado:C.coal, interpretacion:C.con, oral:C.psi, campo:C.psi };
  return html`<div class="band"><div class="wrap">
    <div class="sechead"><div><div class="kicker"><i></i>3 · Memoria de la fe</div><h2>Del río Guadalajara a la Avenida Carrera 28</h2></div>
      <p>La historia del Señor de los Milagros de Buga, distinguiendo la leyenda popular, el relato historiográfico, los hechos documentados, la interpretación académica y lo que recogimos en campo. No se agregan fechas ausentes en las fuentes.</p></div>
    <div class="chips" style=${{marginBottom:8}}>
      <button class=${'chip'+(k==='todos'?' on':'')} onClick=${() => setK('todos')}>Todo</button>
      ${Object.entries(D.KINDS).map(([id, l]) => html`<button key=${id} class=${'chip'+(k===id?' on':'')} onClick=${() => { setK(id); const f = D.TIMELINE.find(t => t.kind === id); if (f) setSel(f.id); }}><span class="dot" style=${{background:kc[id]}}></span>${l}</button>`)}
    </div>
    <div class="navrow"><button class="btn sm ghost" onClick=${() => idx > 0 && pick(list[idx-1].id)} disabled=${idx <= 0}>← Anterior</button><button class="btn sm ghost" onClick=${() => idx < list.length-1 && pick(list[idx+1].id)} disabled=${idx >= list.length-1}>Siguiente →</button></div>
    <div class="tl" ref=${ref} tabindex="0" onKeyDown=${e => { if (e.key==='ArrowRight' && idx < list.length-1) pick(list[idx+1].id); if (e.key==='ArrowLeft' && idx > 0) pick(list[idx-1].id); }}>
      ${list.map(t => html`<button key=${t.id} data-id=${t.id} class=${'tli'+(cur.id===t.id?' on':'')} onClick=${() => pick(t.id)}>
        <div class="when">${t.when}</div><div class="pin" style=${{borderColor:kc[t.kind]}}></div>
        <div class="box"><span class="tag" style=${{background:kc[t.kind]+'22',color:kc[t.kind]}}>${D.KINDS[t.kind]}</span><h4>${t.title}</h4></div></button>`)}
    </div>
    <div class="tldetail" key=${cur.id}>
      <div class="im" onClick=${() => cur.photos.length && openPhoto(cur.photos[0], cur.photos)}>${cur.photos.length ? html`<img src=${img(cur.photos[0])} alt=${photo(cur.photos[0]).cap}/>` : html`<div class="ph-empty" style=${{display:'grid',placeItems:'center',height:'100%',padding:30,fontFamily:'var(--serif)',fontStyle:'italic',fontSize:20,color:C.wood,textAlign:'center'}}>Sin fotografía asociada: este momento ocurre fuera del territorio observado.</div>`}</div>
      <div class="tx"><div class="kicker"><i></i>${cur.when} · ${D.KINDS[cur.kind]}</div><h3 style=${{fontSize:34,marginBottom:12}}>${cur.title}</h3><p>${cur.text}</p>
        <p class="small">Fuente: ${cur.ref}</p>
        ${cur.photos.length > 0 && html`<p class="small">${photo(cur.photos[0]).cap} (foto ${cur.photos[0]}). La foto conecta el relato con la devoción actual; no ilustra el hecho histórico.</p>`}
        ${cur.photos.length > 1 && html`<div class="thumbs">${cur.photos.map(n => html`<${Thumb} key=${n} n=${n}/>`)}</div>`}
        <div style=${{display:'flex',gap:10,flexWrap:'wrap',marginTop:12}}><button class="btn sm ghost" onClick=${() => go('territorio', { space:'senor' })}>Altares del Señor de los Milagros</button>
        <button class="btn sm ghost" onClick=${() => go('conexiones', { tab:'hallazgos', finding:'h7' })}>Hallazgo: popular e institucional</button></div>
      </div>
    </div>
  </div></div>`;
}

/* ---------- Crisis ---------- */
function Crisis({ params }) {
  const { go } = useApp();
  const [fs, setFs] = useState({ situations:null, practices:null, emotions:null });
  const [open, setOpen] = useState(params.testimony || null);
  useEffect(() => { if (params.testimony) { setOpen(params.testimony); setFs({ situations:null, practices:null, emotions:null }); setTimeout(() => document.getElementById('t-'+params.testimony)?.scrollIntoView({ behavior:'smooth', block:'center' }), 80); } }, [params.testimony]);
  const list = D.TESTIMONIES.filter(t => Object.entries(fs).every(([k, v]) => !v || t[k].includes(v)));
  const grp = (k, label) => html`<div style=${{marginBottom:12}}><span class="lbl" style=${{marginBottom:6}}>${label}</span><div class="chips">
    <button class=${'chip'+(!fs[k]?' on':'')} onClick=${() => setFs({ ...fs, [k]:null })}>Todas</button>
    ${Object.entries(D.FILTERS[k]).filter(([id]) => D.TESTIMONIES.some(t => t[k].includes(id))).map(([id, l]) => html`<button key=${id} class=${'chip'+(fs[k]===id?' on':'')} onClick=${() => setFs({ ...fs, [k]: fs[k]===id ? null : id })}>${l}</button>`)}</div></div>`;
  return html`<div class="band"><div class="wrap">
    <div class="sechead"><div><div class="kicker"><i></i>4 · La fe ante la crisis</div><h2>Voces que buscan calma, fuerza y compañía</h2></div>
      <p>Testimonios de nuestras entrevistas, con nombres anonimizados. Lo que aquí se lee es lo que las personas dicen de su experiencia: no presentamos la fe como tratamiento ni suponemos que todas vivan lo mismo.</p></div>
    <div class="withside"><aside class="panel sidepanel">${grp('situations','Situación de vulnerabilidad')}${grp('practices','Práctica religiosa')}${grp('emotions','Experiencia expresada')}
      <span class="small">${list.length} de ${D.TESTIMONIES.length} testimonios</span></aside><div>
    ${list.length === 0 && html`<div class="empty">Ningún testimonio combina estos filtros. <button class="link" onClick=${() => setFs({ situations:null, practices:null, emotions:null })}>Quitar filtros</button></div>`}
    <div class="grid" style=${{gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))'}}>${list.map(t => { const v = D.VOICES[t.voice]; const o = open === t.id;
      return html`<article class="card" id=${'t-'+t.id} key=${t.id} style=${o ? {outline:'2px solid '+C.psi} : null}>
        <div class="bd">
          <div class="chips"><${AxisTag} a=${t.axis}/>${!t.literal && html`<span class="tag">Síntesis, no cita textual</span>`}${v.src === 'PRE' && html`<span class="tag">Fuera del territorio</span>`}</div>
          <h3>${t.title}</h3>
          <div class=${'quote'+(t.literal?'':' syn')}>${t.literal ? '«'+t.quotes[0]+'»' : t.quotes[0]}</div>
          <span class="small">${v.code} · ${v.who} · <${SrcBtn} id=${v.src}/></span>
          ${o && html`<div class="more">
            ${t.quotes.slice(1).map((q, i) => html`<div key=${i} class="quote">«${q}»</div>`)}
            <span class="lbl">Contexto</span>${t.context}
            <span class="lbl">Prácticas</span>${t.practices.map(p => D.FILTERS.practices[p]).join(' · ')}
            <span class="lbl">Significados expresados</span>${t.emotions.map(e => D.FILTERS.emotions[e]).join(' · ')}
            <span class="lbl">Interpretación del equipo</span>${t.interp}
            <span class="lbl">Referencia</span>${t.ref}
          </div>`}
          <div class="row">
            <button class="btn sm" onClick=${() => setOpen(o ? null : t.id)}>${o ? 'Cerrar' : 'Leer completo'}</button>
            ${t.spaces.map(s => html`<button key=${s} class="link" onClick=${() => go('territorio', { space:s })}>${space(s).short}</button>`)}
            ${t.gestures.filter(g => gesture(g)).slice(0,1).map(g => html`<button key=${g} class="link" onClick=${() => go('cuerpo', { gesture:g })}>Gesto: ${gesture(g).name.toLowerCase()}</button>`)}
            ${!t.spaces.length && html`<span class="small">Espacio no documentado</span>`}
          </div>
        </div></article>`; })}</div>
  </div></div></div></div>`;
}

/* ---------- Conexiones ---------- */
function Momentos({ params }) {
  const [m, setM] = useState('durante'); const [sel, setSel] = useState(params.space || 'nave');
  const s = space(sel);
  return html`<div>
    <div style=${{display:'flex',flexWrap:'wrap',gap:16,alignItems:'center',marginBottom:16}}>
      <div class="seg" role="tablist">${['antes','durante','despues'].map(k => html`<button key=${k} class=${m===k?'on':''} onClick=${() => setM(k)}>${D.MOMENTS[k].label}</button>`)}</div>
      <p style=${{margin:0,maxWidth:'62ch'}}>${D.MOMENTS[m].text}</p>
    </div>
    <div class="mapgrid">
      <${ChurchMap} selected=${sel} onSelect=${setSel} layers=${{}} moment=${m}/>
      <div class="panel">
        <div class="kicker"><i></i>${D.MOMENTS[m].label} de la eucaristía</div>
        <h3 style=${{fontSize:30,marginBottom:8}}>${s.name}</h3>
        <p style=${{fontFamily:'var(--serif)',fontSize:21,lineHeight:1.35}}>${s.moments[m]}</p>
        <span class="lbl">Recorridos registrados en este momento</span>
        <ul class="bul t">${D.PATHS.filter(p => p.when.includes(m)).map(p => html`<li key=${p.id}>${space(p.from).short} → ${space(p.to).short}: ${p.label} <span class="small">(${p.ref})</span></li>`)}</ul>
        <p class="small">El tamaño del halo resume de forma cualitativa el uso descrito en las bitácoras (sobre todo E3 y E4). No es una medición.</p>
      </div>
    </div>
    <h3 style=${{margin:'34px 0 12px'}}>Cuatro visitas, cuatro templos</h3>
    <div class="visits">${D.VISITS.map(v => html`<div key=${v.id} class=${'visit'+(v.id==='E3'||v.id==='E4'?' hl':'')}>
      <div class="kicker" style=${{margin:0}}>${D.SOURCES[v.id].short}${v.id==='E3'||v.id==='E4' ? ' · prioritaria' : ''}</div>
      <h4>${v.date}</h4><div class="small">${v.day} · ${v.time}</div>
      <div class="bar" title="Afluencia descrita, escala cualitativa"><i style=${{width:(v.occN*20)+'%'}}></i></div>
      <p style=${{fontSize:14,margin:'0 0 6px'}}><b>Afluencia:</b> ${v.occ}</p>
      <p style=${{fontSize:14,margin:'0 0 6px'}}><b>Compañía:</b> ${v.company}</p>
      <p class="small" style=${{margin:0}}>${v.notes}</p></div>`)}</div>
    <div class="tablewrap" style=${{marginTop:18}}><table class="stack"><thead><tr><th>Aspecto</th><th>Entrada 3 · martes 17 nov., 4 p. m.</th><th>Entrada 4 · domingo 22 nov., 5:30 p. m.</th></tr></thead><tbody>
      ${[['Ocupación','Cerca del 30 % (inferido)','Bancas del frente y la mitad 100 %, traseras 90 % (estimado)'],
         ['Quiénes','Adultos que parecen salir del trabajo; pocos mayores; un niño','Familias con niños, parejas, adultos mayores y jóvenes'],
         ['Compañía','Más personas solas que en visitas previas','Casi todos acompañados; pocas personas solas'],
         ['Durante la misa','Quietos en su puesto; nadie en los confesionarios','Algunas personas en los altares externos y en el Santísimo'],
         ['Después','Movimiento hacia los distintos altares; algunos tocan al Cristo','Altar interno lleno; fila para confesarse; algunos se quedan sentados orando'],
         ['Ambiente','«Un poco más apagado», pero «muy en paz»; silencio y tranquilidad','Ruido antes; en los silencios, «conexión profunda»; en el canto, conexión comunitaria']]
        .map((r, i) => html`<tr key=${i}><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`)}
    </tbody></table></div>
  </div>`;
}

function Red() {
  const ref = useRef(null); const [sz, setSz] = useState({ w:700, h:460 }); const [sel, setSel] = useState('vulnerabilidad'); const [edge, setEdge] = useState(null);
  useEffect(() => { const el = ref.current; const ro = new ResizeObserver(() => setSz({ w:el.clientWidth, h:el.clientHeight })); ro.observe(el); return () => ro.disconnect(); }, []);
  const pos = n => ({ x: 60 + n.x * (sz.w - 120), y: 40 + n.y * (sz.h - 80) });
  const N = id => D.NODES.find(n => n.id === id);
  const col = e => { const a = N(e.a).axis, b = N(e.b).axis; return a === b && a !== 'con' ? C[a] : C.con; };
  const rel = D.EDGES.filter(e => e.a === sel || e.b === sel);
  const small = sz.w < 520;
  return html`<div class="netwrap">
    <div class="fig" ref=${ref}><svg viewBox=${`0 0 ${sz.w} ${sz.h}`} role="img" aria-label="Red de relaciones entre conceptos"><defs><radialGradient id="nodeglow"><stop offset="0" stop-color="#FFECB8" stop-opacity=".9"/><stop offset=".3" stop-color="#F0B44C" stop-opacity=".45"/><stop offset="1" stop-color="#E08E00" stop-opacity="0"/></radialGradient></defs>
      ${D.EDGES.map((e, i) => { const a = pos(N(e.a)), b = pos(N(e.b)); const on = e.a === sel || e.b === sel || edge === i;
        return html`<line key=${i} x1=${a.x} y1=${a.y} x2=${b.x} y2=${b.y} stroke=${col(e)} stroke-width=${on ? 3 : 1.3} opacity=${on ? .95 : .22} style=${{cursor:'pointer',transition:'all .3s'}} onClick=${() => setEdge(i)}><title>${e.t}</title></line>`; })}
      ${D.NODES.map(n => { const p = pos(n); const on = sel === n.id; const near = rel.some(e => e.a === n.id || e.b === n.id);
        return html`<g key=${n.id} class="net-node" tabindex="0" role="button" aria-label=${n.label} onClick=${() => { setSel(n.id); setEdge(null); }} onKeyDown=${e => { if (e.key === 'Enter') setSel(n.id); }} opacity=${on || near ? 1 : .55}>
          <circle class=${on ? 'flame' : ''} cx=${p.x} cy=${p.y} r=${on ? 46 : 26} fill="url(#nodeglow)"/><circle cx=${p.x} cy=${p.y} r=${on ? 7 : 5} fill=${C[n.axis]}/>
          <text x=${p.x} y=${p.y - (on ? 22 : 17)} text-anchor="middle" font-size=${small ? 15 : 19} fill=${on ? '#FFECB8' : '#E8D1A7'} font-style=${on ? 'italic' : 'normal'} style=${{paintOrder:'stroke',stroke:'#241104',strokeWidth:6}}>${n.label}</text></g>`; })}
    </svg></div>
    <div class="panel">
      <div class="chips" style=${{marginBottom:10}}>${['antro','psi','con'].map(a => html`<span key=${a} class=${'tag '+a}><span class="dot" style=${{background:C[a]}}></span>${AX[a]}</span>`)}</div>
      <h3 style=${{fontSize:32}}>${N(sel).label}</h3>
      <p class="small">Las líneas son relaciones cualitativas registradas o interpretadas, no causalidad demostrada.</p>
      ${edge !== null && html`<div class="quote" style=${{borderColor:col(D.EDGES[edge])}}>${N(D.EDGES[edge].a).label} — ${N(D.EDGES[edge].b).label}: ${D.EDGES[edge].t}<div class="small">Evidencia: ${D.EDGES[edge].ev}</div></div>`}
      <ul class="bul">${rel.map((e, i) => { const o = e.a === sel ? e.b : e.a; return html`<li key=${i}><button class="link" onClick=${() => setSel(o)}>${N(o).label}</button> · ${e.t} <span class="small">(${e.ev})</span></li>`; })}</ul>
    </div></div>`;
}

function Objetos({ params }) {
  const { go, openPhoto } = useApp();
  const [sel, setSel] = useState(params.object || 'velas');
  useEffect(() => { if (params.object) setSel(params.object); }, [params.object]);
  const o = OBJ(sel);
  return html`<div>
    <div class="theory" style=${{gridTemplateColumns:'minmax(0,1fr) minmax(0,1.2fr)',padding:0,overflow:'hidden'}}>
      <div style=${{cursor:'zoom-in',minHeight:300}} onClick=${() => openPhoto(32)}><img src=${img(32)} alt=${photo(32).cap} style=${{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/></div>
      <div style=${{padding:'28px 28px 28px 0'}}><div class="kicker" style=${{color:'#cdbf9f'}}><i></i>Fotografía 32</div>
        <h3 style=${{fontSize:34,color:'#f3e6c4'}}>Figuras de cera, estampas y oraciones</h3>
        <p style=${{opacity:.85,marginTop:10}}>Dejadas junto al crucifijo del altar interno. Las bitácoras las registran como ofrendas que expresan peticiones; qué significan para cada persona sigue siendo una pregunta abierta de la investigación (E3, «terminar mirando hacia adelante», pregunta 2).</p>
        <button class="btn sm gold" onClick=${() => setSel('cera')}>Ver ficha</button></div>
    </div>
    <div class="chips" style=${{marginBottom:16}}>${D.OBJECTS.map(x => html`<button key=${x.id} class=${'chip'+(sel===x.id?' on':'')} onClick=${() => setSel(x.id)}>${x.name}</button>`)}</div>
    <div class="tldetail" key=${o.id} style=${{marginTop:0}}>
      <div class="im" onClick=${() => o.photos.length && openPhoto(o.photos[0], o.photos)}>${o.photos.length ? html`<img src=${img(o.photos[0])} alt=${photo(o.photos[0]).cap}/>` : html`<div style=${{display:'grid',placeItems:'center',height:'100%',padding:30,fontFamily:'var(--serif)',fontStyle:'italic',fontSize:20,color:C.wood,textAlign:'center'}}>Objeto registrado en las bitácoras, sin fotografía en el archivo</div>`}</div>
      <div class="tx"><h3 style=${{fontSize:34,marginBottom:8}}>${o.name}</h3>
        <span class="lbl">Uso observado</span><p>${o.use}</p>
        <span class="lbl">Significado</span><p>${o.meaning}</p>
        <span class="lbl">Dimensión económica</span><p>${o.econ}</p>
        <span class="lbl">Espacios</span><div class="chips">${o.spaces.map(s => html`<button key=${s} class="chip" onClick=${() => go('territorio', { space:s })}>${space(s).short} →</button>`)}</div>
        ${o.testimonies.length > 0 && html`<span class="lbl">Testimonios</span><div class="chips">${o.testimonies.map(t => html`<button key=${t} class="chip" onClick=${() => go('crisis', { testimony:t })}>${testi(t).title}</button>`)}</div>`}
        ${o.photos.length > 1 && html`<span class="lbl">Fotografías</span><div class="thumbs">${o.photos.map(n => html`<${Thumb} key=${n} n=${n}/>`)}</div>`}
      </div></div>
  </div>`;
}

function Hallazgos({ params }) {
  const { go } = useApp();
  const [ax, setAx] = useState('todos'); const [open, setOpen] = useState(params.finding || null);
  const list = D.FINDINGS.filter(f => ax === 'todos' || f.axis === ax);
  return html`<div>
    <div class="chips" style=${{marginBottom:16}}>
      <button class=${'chip'+(ax==='todos'?' on':'')} onClick=${() => setAx('todos')}>Todos (${D.FINDINGS.length})</button>
      ${['antro','psi','con'].map(a => html`<button key=${a} class=${'chip'+(ax===a?' on':'')} onClick=${() => setAx(a)}><span class="dot" style=${{background:C[a]}}></span>${AX[a]}</button>`)}
    </div>
    <div class="grid" style=${{gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))'}}>${list.map((f, i) => { const o = open === f.id;
      return html`<article class="card" key=${f.id} style=${{borderTop:'4px solid '+C[f.axis]}}>
        <div class="bd">
          <div class="small" style=${{color:C[f.axis],fontWeight:600}}>${f.tension}</div>
          <h3>${f.title}</h3>
          <div class="chips"><span class="tag">${f.status}</span></div>
          <p style=${{margin:0,fontSize:15}}>${f.evidence}</p>
          ${o && html`<div class="more"><span class="lbl">Interpretación</span>${f.interp}<span class="lbl">Dimensión territorial</span>${f.space}<span class="lbl">Dimensiones</span>${f.dims.map(d => D.DIMS[d]).join(' · ')}<span class="lbl">Referencias</span>${f.refs}</div>`}
          <div class="row"><button class="btn sm" onClick=${() => setOpen(o ? null : f.id)}>${o ? 'Cerrar' : 'Evidencia e interpretación'}</button>
            <button class="link" onClick=${() => go('investigacion', { anchor:'matriz' })}>Matriz</button></div>
        </div></article>`; })}</div>
    <p class="small" style=${{marginTop:16}}>Los hallazgos son lecturas provisionales de un trabajo de campo de cuatro visitas: no se presentan como conclusiones demostradas.</p>
  </div>`;
}

function Conexiones({ params }) {
  const [tab, setTab] = useState(params.tab || 'momentos');
  useEffect(() => { if (params.tab) setTab(params.tab); }, [params.tab, params._t]);
  const T = [['momentos','Un mismo territorio, distintos momentos'],['red','Red de relaciones'],['objetos','Objetos que expresan la fe'],['hallazgos','Hallazgos y tensiones']];
  return html`<div class="band"><div class="wrap">
    <div class="sechead"><div><div class="kicker"><i></i>5 · Conexiones</div><h2>Donde el rito y el refugio se encuentran</h2></div>
      <p>Tres visualizaciones y una síntesis de hallazgos que cruzan los dos ejes. Dorado: rito; verde: refugio; terracota: lo que los une.</p></div>
    <div class="tabs" style=${{margin:'0 0 22px',padding:0}}>${T.map(t => html`<button key=${t[0]} class=${'tab'+(tab===t[0]?' on':'')} onClick=${() => setTab(t[0])}>${t[1]}</button>`)}</div>
    ${tab === 'momentos' && html`<${Momentos} params=${params}/>`}
    ${tab === 'red' && html`<${Red}/>`}
    ${tab === 'objetos' && html`<${Objetos} params=${params}/>`}
    ${tab === 'hallazgos' && html`<${Hallazgos} params=${params}/>`}
  </div></div>`;
}

/* ---------- Investigación ---------- */
function Matrix() {
  const [dim, setDim] = useState(null); const [out, setOut] = useState(''); const { toast } = useApp();
  const rows = D.FINDINGS.filter(f => !dim || f.dims.includes(dim));
  const cols = ['Hallazgo','Tensión','Eje','Estado','Evidencia','Interpretación','Espacio','Dimensiones','Referencias'];
  const vals = f => [f.title, f.tension, AX[f.axis], f.status, f.evidence, f.interp, f.space, f.dims.map(d => D.DIMS[d]).join(', '), f.refs];
  const make = sep => [cols, ...rows.map(vals)].map(r => r.map(c => sep === ',' ? '"' + String(c).replace(/"/g,'""') + '"' : String(c).replace(/\t|\n/g,' ')).join(sep)).join('\n');
  const copy = async sep => { const t = make(sep); setOut(t); try { await navigator.clipboard.writeText(t); toast('Matriz copiada al portapapeles'); } catch (e) { toast('Seleccione el texto de abajo y cópielo'); } };
  return html`<div>
    <div class="chips" style=${{marginBottom:12}}>
      <button class=${'chip'+(!dim?' on':'')} onClick=${() => setDim(null)}>Todas las dimensiones</button>
      ${Object.entries(D.DIMS).map(([k, l]) => html`<button key=${k} class=${'chip'+(dim===k?' on':'')} onClick=${() => setDim(k)}>${l}</button>`)}
    </div>
    <div class="tablewrap" style=${{maxHeight:520}}><table class="stack"><thead><tr>${['Hallazgo','Eje','Evidencia','Interpretación','Espacio','Dimensiones','Referencias'].map(c => html`<th key=${c}>${c}</th>`)}</tr></thead>
      <tbody>${rows.map(f => html`<tr key=${f.id}><td><b>${f.title}</b><div class="small">${f.status}</div></td><td><span class="dot" style=${{background:C[f.axis],marginRight:6}}></span>${AX[f.axis]}</td><td>${f.evidence}</td><td>${f.interp}</td><td>${f.space}</td><td>${f.dims.map(d => D.DIMS[d]).join(', ')}</td><td>${f.refs}</td></tr>`)}</tbody></table></div>
    <div style=${{display:'flex',gap:10,flexWrap:'wrap',margin:'12px 0'}}>
      <button class="btn sm" onClick=${() => copy(',')}>Copiar como CSV</button>
      <button class="btn sm ghost" onClick=${() => copy('\t')}>Copiar para Excel u hojas de cálculo</button>
    </div>
    ${out && html`<textarea class="out" readonly value=${out} onFocus=${e => e.target.select()}></textarea>`}
  </div>`;
}

function Investigacion({ params }) {
  const { openPhoto } = useApp();
  const [arch, setArch] = useState(null); const [cur, setCur] = useState('contexto');
  useEffect(() => { const io = new IntersectionObserver(es => { es.forEach(x => { if (x.isIntersecting) setCur(x.target.id.slice(3)); }); }, { rootMargin:'-20% 0px -70% 0px' });
    document.querySelectorAll('.rs').forEach(el => io.observe(el)); return () => io.disconnect(); }, []);
  const secs = [['contexto','Contexto'],['pregunta','Pregunta y objetivos'],['metodo','Metodología'],['fuentes','Fuentes'],['fundamentos','Fundamentos'],['dimensiones','Dimensiones'],['archivo','Archivo fotográfico'],['matriz','Matriz de hallazgos'],['contraste','Contraste entre fuentes'],['biblio','Bibliografía'],['limites','Limitaciones'],['creditos','Créditos']];
  const jump = id => document.getElementById('rs-' + id)?.scrollIntoView({ behavior:'smooth', block:'start' });
  useEffect(() => { if (params.anchor) setTimeout(() => jump(params.anchor), 120); }, [params.anchor, params._t]);
  const sp = arch ? D.PHOTOS.filter(p => p.space === arch) : D.PHOTOS;
  return html`<div class="band"><div class="wrap">
    <div class="sechead"><div><div class="kicker"><i></i>6 · Nuestra investigación</div><h2>Cómo se hizo esta cartografía</h2></div>
      <p>Marco, método, fuentes, archivo y matriz de hallazgos, con las diferencias entre lo observado y lo interpretado.</p></div>
    <div class="withside" style=${{gridTemplateColumns:'220px minmax(0,1fr)'}}><nav class="toc" aria-label="Índice">${secs.map(s => html`<button key=${s[0]} class=${cur===s[0]?'on':''} onClick=${() => jump(s[0])}>${s[1]}</button>`)}</nav><div>

    <section class="rs" id="rs-contexto"><h3>Contexto</h3><div>
      <p>La Parroquia San Alfonso María de Ligorio está en la Avenida Carrera 28 #39-27, barrio La Soledad, localidad de Teusaquillo (Bogotá). Es atendida por la congregación redentorista y alberga la devoción al Señor de los Milagros de Buga, que convoca multitudes cada día 14 del mes.</p>
      <p>El proyecto empezó preguntando por la simultaneidad de actividades el día 14; luego se enfocó en la oración colectiva, la fe y la esperanza, y en la tercera entrada adoptó un nuevo enfoque: cómo las personas usan la ritualidad para procesar la angustia, la enfermedad o la incertidumbre.</p>
      <p class="small">Lo reconstruimos a partir de la investigación documental de Vanessa, las preguntas que fuimos ajustando en la segunda entrada y el «nuevo enfoque» con el que abrimos la tercera.</p></div></section>

    <section class="rs" id="rs-pregunta"><h3>Pregunta y objetivos</h3><div>
      <div class="quote" style=${{borderColor:C.gold,fontSize:22}}>¿Cómo se relacionan los rituales religiosos, el lenguaje corporal y la cohesión comunitaria con las formas de afrontamiento de la vulnerabilidad de los creyentes en la Parroquia San Alfonso?</div>
      <p class="small">Preguntas anteriores del proceso: «¿Cómo se relacionan las personas, las actividades y los espacios… durante la celebración del Señor de los Milagros el día 14?» y «¿Qué influencia tiene la oración en compañía y/o colectiva en el sentimiento de la fe y la esperanza?» (entrada 2; Bitácora Vanessa).</p>
      <span class="lbl">Objetivos (formulación de trabajo derivada de la pregunta; las bitácoras no los enuncian por separado)</span>
      <ul class="bul"><li>Describir los gestos, posturas y desplazamientos rituales en los espacios de la parroquia.</li><li>Identificar cómo los creyentes relatan sus situaciones de vulnerabilidad y qué prácticas usan para afrontarlas.</li><li>Analizar la relación entre oración individual y colectiva, compañía y esperanza.</li><li>Situar la devoción al Señor de los Milagros en su historia popular e institucional.</li><li>Representar estas relaciones en una cartografía social que pueda devolverse a la comunidad.</li></ul></div></section>

    <section class="rs" id="rs-metodo"><h3>Metodología</h3><div>
      <p>Etnografía con observación participante, recorridos, entrevistas, croquis y registro fotográfico. Cada entrada sigue la misma estructura: contexto, «¿qué ocurrió?», registrar las voces del territorio, interpretaciones, reflexión sobre la propia mirada, relaciones y patrones, representar para comprender, conjeturar y terminar mirando hacia adelante.</p>
      <div class="two">
        <div class="panel"><h4>Eduardo Restrepo</h4><p style=${{fontSize:15}}>Tres niveles de información: <b>lo que se hace</b> (pestaña «Lo que observamos»), <b>lo que se dice</b> («Lo que nos cuentan») y <b>lo que se debería hacer</b> («Lo que establece la doctrina»). El «saber estar» guió la conducta en el templo: las investigadoras registran haber ido vestidas «de manera muy respetuosa» y observar «sin permanecer en medio de la circulación». Se rechaza la figura del «etnógrafo-asaltante».</p></div>
        <div class="panel"><h4>Rosana Guber</h4><p style=${{fontSize:15}}>Reflexividad: cada entrada incluye «reflexionar sobre nuestra propia mirada». Una investigadora reconoce que, por ser católica, le resulta fácil reconocer gestos, pero eso también la lleva a dar por sentado su significado sin preguntar (E3). La validez interna se buscó contrastando interpretación y testimonios; la externa, comparando lo nuestro con otros estudios sobre religiosidad popular en Colombia y América Latina.</p></div>
      </div>
      <div class="tablewrap" style=${{marginTop:16}}><table class="stack"><thead><tr><th>Entrada</th><th>Fecha y hora</th><th>Actividad</th><th>Enfoque</th></tr></thead><tbody>
        <tr><td>Previa</td><td>13 oct. 2026, 10 a. m.</td><td>Investigación documental y entrevistas previas</td><td>Qué lleva a pedir un milagro</td></tr>
        <tr><td>Entrada 1</td><td>14 oct. 2026 (día 14)</td><td>Recorrido, observación, entrevistas</td><td>Conocer el lugar y su dinámica</td></tr>
        <tr><td>Entrada 2</td><td>22 oct. 2026, 11:30–1:15</td><td>Recorrido, observación, entrevista</td><td>Oración colectiva, fe y esperanza</td></tr>
        <tr><td>Vanessa</td><td>25 y 27 oct. 2026</td><td>Observación dominical; entrevistas</td><td>Participación y compañía</td></tr>
        <tr><td><b>Entrada 3</b></td><td>17 nov. 2026, 4:00–5:15</td><td>Recorrido, observación, entrevistas</td><td>Nuevo enfoque: ritualidad y afrontamiento</td></tr>
        <tr><td><b>Entrada 4</b></td><td>22 nov. 2026, 5:30–6:30</td><td>Recorrido, observación, entrevistas</td><td>Profundización en domingo</td></tr>
      </tbody></table></div></div></section>

    <section class="rs" id="rs-fuentes"><h3>Fuentes</h3><div><p>Trabajamos con dos tipos de fuentes. Las primarias son las que producimos nosotras: bitácoras, entrevistas y fotografías. Las secundarias son las lecturas que nos ayudaron a interpretarlas. Cuando unas y otras no coincidían, le dimos prioridad a lo que vimos y escuchamos en el templo.</p><div class="two">
      ${Object.values(D.SOURCES).map(s => html`<div class="panel" key=${s.id}><div class="small">${s.kind}</div><h4 style=${{margin:'4px 0'}}>${s.title}</h4><div class="small">${s.date}</div><p style=${{fontSize:14,marginTop:6}}>${s.note}</p></div>`)}</div></div></section>

    <section class="rs" id="rs-fundamentos"><h3>Fundamentos</h3><div class="two">
      <div class="panel" style=${{borderTop:'4px solid '+C.gold}}><h4>Antropológicos</h4><ul class="bul"><li>Rito como paralenguaje actuado y su dualidad (Gómez García).</li><li>Comunidades de sentido (Fernández, 2017).</li><li>Devoción subalterna y «Cristo rebelde» (Echeverry Pérez, 2008).</li><li>Religiosidad popular frente a institucionalidad (casos de San Antero y Chimá, Córdoba).</li><li>Convergencia, distanciamiento y compresión espacio-tiempo (Lyshon).</li></ul></div>
      <div class="panel" style=${{borderTop:'4px solid '+C.psi}}><h4>Psicológicos y teológicos</h4><ul class="bul g"><li>Oración colectiva como acompañamiento y catarsis (Rivas y Jiménez).</li><li>La fe como asentimiento y «creer para ver» (Catecismo 155-156; Alducin).</li><li>La esperanza: espera, confianza y paciencia en la tribulación (Catecismo 1817).</li><li>Algunos autores describen la parroquia como una «tecnología social de contención»: un lugar que ayuda a sostener el dolor. Aquí lo tomamos como una hipótesis para seguir pensando, no como un efecto clínico demostrado.</li></ul></div></div></section>

    <section class="rs" id="rs-dimensiones"><h3>Dimensiones</h3><div>
      <div class="tablewrap"><table class="stack"><thead><tr><th>Dimensión</th><th>Dónde aparece</th><th>Hallazgos</th></tr></thead><tbody>
      ${Object.entries(D.DIMS).map(([k, l]) => html`<tr key=${k}><td><b>${l}</b></td><td>${D.SPACES.filter(s => s.dims.includes(k)).map(s => s.short).join(', ')}</td><td>${D.FINDINGS.filter(f => f.dims.includes(k)).map(f => f.title).join(' · ')}</td></tr>`)}
      </tbody></table></div>
      <p class="small" style=${{marginTop:10}}>La guía de cartografía social no estaba entre los archivos recibidos. Las dimensiones social, cultural, económica y espacial se integraron según el encargo; conviene revisar la guía para confirmar si exige entregables independientes (por ejemplo, un documento escrito o el mapa impreso).</p></div></section>

    <section class="rs" id="rs-archivo"><h3>Archivo fotográfico</h3><div>
      <div class="chips" style=${{marginBottom:12}}><button class=${'chip'+(!arch?' on':'')} onClick=${() => setArch(null)}>Toda la evidencia</button>
        ${D.SPACES.map(s => html`<button key=${s.id} class=${'chip'+(arch===s.id?' on':'')} onClick=${() => setArch(s.id)}>${s.short} (${D.PHOTOS.filter(p => p.space === s.id).length})</button>`)}</div>
      <div class="archive">${sp.map(p => html`<button key=${p.n} onClick=${() => openPhoto(p.n, sp.map(x => x.n))} aria-label=${'Fotografía '+p.n+': '+p.cap}><img src=${th(p.n)} alt="" loading="lazy"/><span>${p.n}</span></button>`)}</div>
      <p class="small" style=${{marginTop:10}}>Cada imagen lleva un número para poder citarla en las fichas y los hallazgos. Las organizamos por espacio para que se pueda recorrer el templo a través de ellas: primero el lugar, luego los gestos, después los objetos.</p></div></section>

    <section class="rs" id="rs-matriz"><h3>Matriz de hallazgos</h3><${Matrix}/></section>

    <section class="rs" id="rs-contraste"><h3>Contraste entre fuentes</h3><div>
      <p>Antes de construir esta cartografía reunimos la teoría en un documento de síntesis. Al compararlo con nuestras bitácoras encontramos datos mezclados o generalizados. Cuando hubo diferencias, decidimos confiar en lo que vimos y escuchamos en campo. Esta tabla deja ver esas decisiones.</p>
      <div class="tablewrap"><table class="stack"><thead><tr><th>Lo que se afirmaba en la síntesis teórica</th><th>Lo que muestran las bitácoras</th><th>Decisión</th></tr></thead><tbody>
      ${D.CONTRAST.map((c, i) => html`<tr key=${i}><td>${c.claim}</td><td>${c.check}</td><td><span class="tag con">${c.verdict}</span></td></tr>`)}</tbody></table></div></div></section>

    <section class="rs" id="rs-biblio"><h3>Bibliografía</h3><div>
      <p>Estas son las voces con las que conversamos para entender lo que vimos. No las usamos para confirmar ideas previas, sino para darle nombre a lo que pasaba en el templo.</p>
      <div class="two">${D.BIBLIO.map((b, i) => html`<div class="panel" key=${i}><span class="tag">${b.via}</span><h4 style=${{margin:'8px 0 6px'}}>${b.a}</h4><p style=${{fontSize:14.5,margin:0}}>${b.t}</p></div>`)}</div>
      <p class="small">Cada autor aparece con la idea que tomamos de su trabajo y el lugar de la cartografía donde se nota.</p></div></section>

    <section class="rs" id="rs-limites"><h3>Limitaciones</h3><div><ul class="bul t">
      <li>Cuatro visitas en horarios distintos; las comparaciones entre días son exploratorias.</li>
      <li>Los porcentajes de ocupación y de personas acompañadas son estimaciones a simple vista.</li>
      <li>La clase social y la ocupación se infirieron por la vestimenta (E1, E3).</li>
      <li>Las entrevistas fueron breves; varias preguntas sobre el significado de los objetos y la tranquilidad quedaron abiertas.</li>
      <li>Las fechas de las fotografías no están documentadas.</li>
      <li>El plano es un esquema provisional, no un levantamiento arquitectónico.</li>
      <li>Las entrevistas previas se hicieron fuera de la parroquia, a personas cercanas a una investigadora.</li>
      <li>Los datos históricos de la devoción vienen de fuentes secundarias y de nuestra investigación documental; no consultamos archivos coloniales.</li></ul></div></section>

    <section class="rs" id="rs-creditos"><h3>Créditos</h3><div>
      <p style=${{fontFamily:'var(--serif)',fontSize:24}}>Isabella Tobón · Vanessa González</p>
      <p class="small">Entradas de campo 1 a 4: Isabella Tobón. Bitácora de campo e investigación documental: Vanessa González. Evidencia fotográfica: archivo propio del equipo. Agradecimiento a las personas entrevistadas, cuyos nombres se omiten.</p></div></section>
  </div></div></div></div>`;
}

/* ---------- App ---------- */
function App() {
  const read = () => { const h = (location.hash || '').replace('#',''); return SECTIONS.some(s => s.id === h) ? h : 'inicio'; };
  const [route, setRoute] = useState(read);
  const [params, setParams] = useState({});
  const [lb, setLb] = useState(null);
  const [src, setSrc] = useState(null);
  const [msg, setMsg] = useState(null);
  useEffect(() => { const f = () => setRoute(read()); window.addEventListener('hashchange', f); return () => window.removeEventListener('hashchange', f); }, []);
  const go = useCallback((r, p = {}) => { setParams({ ...p, _t: Date.now() }); setRoute(r); try { history.replaceState(null, '', '#' + r); } catch (e) {} if (!p.anchor && !p.gesture && !p.testimony) window.scrollTo({ top:0, behavior:'smooth' }); }, []);
  const toast = t => { setMsg(t); setTimeout(() => setMsg(null), 2400); };
  const ctx = { go, openPhoto:(n, list) => setLb({ n, list }), openSource:setSrc, toast };
  const Sec = { territorio:Territorio, cuerpo:Cuerpo, memoria:Memoria, crisis:Crisis, conexiones:Conexiones, investigacion:Investigacion }[route];
  return html`<${Ctx.Provider} value=${ctx}>
    ${route === 'inicio' ? html`<${Welcome}/>` : html`<div class="shell">
      <nav class="side" aria-label="Secciones">
        <button class="brand" onClick=${() => go('inicio')}>Entre el rito y el refugio<small>Parroquia San Alfonso María de Ligorio · Bogotá</small></button>
        <div class="navlist">${SECTIONS.map((s, i) => html`<button key=${s.id} class=${'navbtn'+(route===s.id?' on':'')} aria-current=${route===s.id?'page':null} onClick=${() => go(s.id)}>
          <span class="navnum">${i+1}</span><${Icon} n=${s.icon}/><span class="full">${s.label}</span></button>`)}</div>
        <div class="axes"><span><span class="dot" style=${{background:C.antro}}></span>Eje antropológico</span><span><span class="dot" style=${{background:C.psi}}></span>Eje psicológico</span><span><span class="dot" style=${{background:C.con}}></span>Conexiones</span></div>
      </nav>
      <main>
        <${Sec} params=${params} key=${route}/>
        <footer>Cartografía social interactiva · Parroquia San Alfonso María de Ligorio, Bogotá · 2026. Fotografías originales del equipo. Testimonios anonimizados.</footer>
      </main></div>`}
    ${lb && html`<${Lightbox} n=${lb.n} list=${lb.list} setN=${n => setLb({ ...lb, n })} onClose=${() => setLb(null)}/>`}
    ${src && html`<${SourceModal} id=${src} onClose=${() => setSrc(null)}/>`}
    ${msg && html`<div class="toast" role="status">${msg}</div>`}
  <//>`;
}

ReactDOM.createRoot(document.getElementById('root')).render(html`<${App}/>`);
}
