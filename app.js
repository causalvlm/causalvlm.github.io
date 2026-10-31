(() => {
  const graph = document.querySelector('.focus-graph');
  const wires = graph.querySelector('.focus-wires');
  const buttons = [...graph.querySelectorAll('.focus-event')];
  const descriptions = {
    4: ['Prepared chicken → coating.', 'Seasoning prepares the chicken for coating. The flour is prepared separately.'],
    5: ['Prepared flour → coating.', 'Seasoning prepares the flour for coating. The chicken is prepared separately.'],
    6: ['Both preparations lead here.', 'The seasoned chicken and seasoned flour come together in the coating step.'],
  };
  let selected = 6;
  let frame;

  const svgNode = (tag, attributes) => {
    const element = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const [key, value] of Object.entries(attributes)) element.setAttribute(key, value);
    return element;
  };
  const connections = [4, 5].map((id) => {
    const group = svgNode('g', { class: 'focus-connection', 'data-from': id });
    group.append(
      svgNode('path', { class: 'connection-track', 'marker-end': 'url(#focus-arrow)' }),
      svgNode('path', { class: 'connection-flow', pathLength: 100 }),
    );
    return group;
  });
  const junctionHalo = svgNode('circle', { class: 'focus-junction-halo', r: 8 });
  const junction = svgNode('circle', { class: 'focus-junction', r: 3.5 });
  wires.querySelector('g').replaceChildren(...connections, junctionHalo, junction);

  function drawConnections() {
    const bounds = graph.getBoundingClientRect();
    const target = graph.querySelector('[data-event="6"]').getBoundingClientRect();
    const stacked = window.matchMedia('(max-width: 700px)').matches;
    const tipX = stacked ? target.left - bounds.left + target.width / 2 : target.left - bounds.left - 6;
    const tipY = stacked ? target.top - bounds.top - 6 : target.top - bounds.top + target.height / 2;
    const joinX = stacked ? tipX : tipX - 22;
    const joinY = stacked ? tipY - 18 : tipY;
    wires.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
    connections.forEach((connection) => {
      const id = Number(connection.dataset.from);
      const source = graph.querySelector(`[data-event="${id}"]`).getBoundingClientRect();
      let curve;
      if (stacked) {
        const x = source.left - bounds.left + source.width / 2;
        const y = source.bottom - bounds.top + 3;
        curve = `M${x} ${y} C${x} ${joinY} ${joinX} ${y} ${joinX} ${joinY} L${tipX} ${tipY}`;
      } else {
        const x = source.right - bounds.left + 3;
        const y = source.top - bounds.top + source.height / 2;
        const middle = (x + joinX) / 2;
        curve = `M${x} ${y} C${middle} ${y} ${middle} ${joinY} ${joinX} ${joinY} L${tipX} ${tipY}`;
      }
      connection.querySelectorAll('path').forEach((path) => path.setAttribute('d', curve));
      connection.dataset.active = String(selected === 6 || selected === id);
    });
    [junction, junctionHalo].forEach((circle) => {
      circle.setAttribute('cx', joinX);
      circle.setAttribute('cy', joinY);
    });
  }

  function selectStep(id) {
    selected = id;
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(Number(button.dataset.event) === id)));
    const [heading, explanation] = descriptions[id];
    document.querySelector('#focus-route').textContent = heading;
    document.querySelector('#focus-explanation').textContent = explanation;
    drawConnections();
    PageMotion.enter(document.querySelector('#focus-caption'), 4);
  }
  buttons.forEach((button) => button.addEventListener('click', () => selectStep(Number(button.dataset.event))));
  function refreshConnections() {
    window.cancelAnimationFrame(frame);
    frame = window.requestAnimationFrame(drawConnections);
  }
  if ('ResizeObserver' in window) new ResizeObserver(refreshConnections).observe(graph);
  graph.addEventListener('load', refreshConnections, true);
  window.addEventListener('resize', refreshConnections);
  if (document.fonts) document.fonts.ready.then(refreshConnections);
  selectStep(6);
})();

const results = {
  activitynet: { name: 'ActivityNet', f1: '0.73', gain: '+6.3', scores: [0.29, 0.31, 0.30, 0.27, 0.49, 0.73] },
  youcook2: { name: 'YouCook2', f1: '0.64', gain: '+7.3', scores: [0.30, 0.33, 0.32, 0.28, 0.37, 0.64] },
};
const methods = ['PLM-3B (FT)', 'InternVL3-4B (FT)', 'InternVL3-8B (FT)', 'Qwen3-VL-8B (FT)', 'Captions → Llama-70B', 'Causal-VLM'];
const tabs = Array.from(document.querySelectorAll('[data-dataset]'));
function showResults(dataset) {
  const data = results[dataset];
  document.querySelector('#result-dataset').textContent = data.name.toUpperCase();
  document.querySelector('#result-f1').textContent = data.f1;
  document.querySelector('#result-gain').textContent = data.gain;
  document.querySelector('#result-chart').setAttribute('aria-labelledby', `tab-${dataset}`);
  const rows = document.querySelector('#chart-rows');
  rows.replaceChildren();
  data.scores.forEach((score, index) => {
    const row = document.createElement('div');
    row.className = `chart-row${index === methods.length - 1 ? ' ours' : ''}`;
    const label = document.createElement('span');
    label.className = 'chart-label';
    label.textContent = methods[index];
    const track = document.createElement('div');
    track.className = 'bar-track';
    track.setAttribute('aria-hidden', 'true');
    const bar = document.createElement('span');
    bar.className = 'bar-fill';
    bar.style.width = `${score * 100}%`;
    track.append(bar);
    const value = document.createElement('strong');
    value.textContent = score.toFixed(2);
    row.append(label, track, value);
    rows.append(row);
  });
  PageMotion.enter(document.querySelector('.result-highlight'), 5);
  tabs.forEach((tab) => {
    const active = tab.dataset.dataset === dataset;
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showResults(tab.dataset.dataset));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    tabs[next].focus();
    showResults(tabs[next].dataset.dataset);
  });
});
showResults('activitynet');

const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-open', open);
});
document.querySelectorAll('.site-header a').forEach((link) => link.addEventListener('click', () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('is-open');
}));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
    menuToggle.click();
    menuToggle.focus();
  }
});

document.querySelector('#copy-citation').addEventListener('click', async (event) => {
  const text = document.querySelector('#bibtex').textContent;
  try {
    await navigator.clipboard.writeText(text);
    event.target.textContent = 'Copied';
    document.querySelector('#copy-status').textContent = 'BibTeX copied to clipboard.';
    window.setTimeout(() => { event.target.textContent = 'Copy BibTeX'; }, 2500);
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.querySelector('#bibtex'));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.querySelector('#copy-status').textContent = 'Citation selected. Use your keyboard copy command.';
  }
});

document.querySelectorAll('video').forEach((video) => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach((other) => { if (other !== video) other.pause(); });
  });
});

const figureDialog = document.querySelector('.figure-dialog');
const figureViewport = document.querySelector('.figure-viewport');
const figureZoom = document.querySelector('#figure-zoom');
document.querySelectorAll('.figure-open').forEach((figureButton) => {
  figureButton.addEventListener('click', () => {
    const source = figureButton.querySelector('img');
    const detail = document.querySelector('#figure-detail');
    detail.src = source.src;
    detail.alt = source.alt;
    document.querySelector('#figure-dialog-title').textContent = figureButton.closest('figure').querySelector('.figure-number').textContent;
    figureViewport.classList.remove('is-zoomed');
    figureZoom.setAttribute('aria-pressed', 'false');
    figureZoom.textContent = 'Zoom in';
    figureDialog.showModal();
    PageMotion.enter(figureDialog, 8);
    figureViewport.scrollTo(0, 0);
  });
});
figureZoom.addEventListener('click', () => {
  const zoomed = figureViewport.classList.toggle('is-zoomed');
  figureZoom.setAttribute('aria-pressed', String(zoomed));
  figureZoom.textContent = zoomed ? 'Fit to screen' : 'Zoom in';
});
document.querySelector('#figure-close').addEventListener('click', () => figureDialog.close());
figureDialog.addEventListener('click', (event) => {
  if (event.target === figureDialog) figureDialog.close();
});
