(() => {
  const studio = document.querySelector('#examples');
  if (!studio) return;
  const $ = (selector) => studio.querySelector(selector);
  const video = $('#story-video');
  const eventMap = $('#story-map');
  const sequence = $('#story-sequence');
  const videoButtons = [];
  const library = $('#story-library');
  const browse = $('#story-browse');
  const categoryButtons = [...studio.querySelectorAll('[data-story-category]')];
  const modes = [...studio.querySelectorAll('[data-story-mode]')];
  const states = {}; // Per-tab edits; reference examples are never modified.
  let videoName = 'running';
  let playing = false;
  let resumable = false;
  let playIndex = 0;
  let transitioning = false;
  let playbackRequest = 0;
  let captionSaved = false;
  const events = () => videoExamples[videoName].events;
  const state = () => states[videoName];
  const eventById = (id) => events().find((event) => event.id === id);
  const clipLength = (id) => Math.min(eventById(id).clipDuration, state().seconds);
  const duration = () => state().ids.reduce((total, id) => total + clipLength(id), 0);
  const caption = (id) => EventSequence.caption(eventById(id), state().captions);
  const feedback = (text) => { $('#story-feedback').textContent = text; };
  const make = (tag, className, text) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  };

  for (const [name, example] of Object.entries(videoExamples)) {
    const button = make('button', 'story-video-option');
    button.type = 'button';
    button.dataset.storyVideo = name;
    button.dataset.category = example.category;
    button.setAttribute('aria-controls', 'story-content');
    const image = make('img');
    image.src = example.events.find((event) => event.id === (example.cover ?? example.selected)).image;
    image.alt = '';
    image.width = 240;
    image.height = 135;
    image.loading = 'lazy';
    const label = make('span', 'video-option-label');
    const totalSeconds = Math.round(example.duration);
    const runtime = `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, '0')}`;
    label.append(make('strong', '', example.name), make('span', '', `${example.events.length} events · ${runtime} video`));
    button.append(image, label);
    $('#story-video-options').append(button);
    videoButtons.push(button);
  }
  $('#story-library-count').textContent = `${videoButtons.length} examples`;
  categoryButtons.forEach((button) => {
    button.querySelector('span').textContent = videoButtons.filter((videoButton) => videoButton.dataset.category === button.dataset.storyCategory).length;
  });

  function showCategory(category) {
    $('#story-video-options').dataset.category = category;
    $('#story-video-options').setAttribute('aria-labelledby', `story-category-${category}`);
    categoryButtons.forEach((button) => {
      const active = button.dataset.storyCategory === category;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });
    videoButtons.forEach((button) => { button.hidden = button.dataset.category !== category; });
  }

  function closeLibrary() {
    library.hidden = true;
    browse.setAttribute('aria-expanded', 'false');
    browse.focus({ preventScroll: true });
    studio.scrollIntoView({ block: 'start', behavior: 'auto' });
  }

  function save() {
    state().history.push({ ids: [...state().ids], mode: state().mode, seconds: state().seconds, captions: { ...state().captions } });
    if (state().history.length > 30) state().history.shift();
  }

  function stop(canResume = false) {
    resumable = canResume;
    playing = false;
    playbackRequest += 1;
    video.pause();
    $('#story-play').innerHTML = `<span aria-hidden="true">▶</span> ${canResume ? 'Resume' : 'Play edit'}`;
    $('#story-overlay').hidden = false;
    $('#story-play').setAttribute('aria-label', canResume ? 'Resume your video edit' : 'Play your video edit');
  }

  async function loadClip(id, autoplay = false) {
    const token = ++playbackRequest;
    transitioning = autoplay;
    const event = eventById(id);
    video.poster = event.image;
    video.src = event.clip;
    video.setAttribute('aria-label', `${videoExamples[videoName].name}: ${event.title}`);
    $('#story-playing-label').textContent = `E${id} · ${event.title}`;
    $('#story-player-caption').textContent = caption(id);
    $('#story-player').dataset.event = id;
    video.load();
    if (!autoplay) return;
    try {
      await video.play();
      if (token !== playbackRequest) return;
      transitioning = false;
    } catch (error) {
      if (token !== playbackRequest || error.name === 'AbortError') return;
      stop();
      $('#story-playback-status').textContent = 'Tap play to try again';
      feedback('The video could not start. Please try Play edit again.');
    }
  }

  function markPlaying() {
    sequence.querySelectorAll('[data-sequence-event]').forEach((button) => {
      const active = playing && Number(button.dataset.sequenceEvent) === state().ids[playIndex];
      button.classList.toggle('is-playing', active);
      if (active) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
  }

  function play() {
    if (playing) {
      stop(true);
      $('#story-playback-status').textContent = 'Paused';
      markPlaying();
      return;
    }
    if (!state().ids.length) return;
    playing = true;
    transitioning = false;
    const resume = resumable;
    resumable = false;
    if (!resume) playIndex = 0;
    $('#story-overlay').hidden = true;
    $('#story-play').innerHTML = '<span aria-hidden="true">Ⅱ</span> Pause';
    $('#story-play').setAttribute('aria-label', 'Pause your video edit');
    if (resume) {
      const token = ++playbackRequest;
      video.play().catch((error) => {
        if (token !== playbackRequest || error.name === 'AbortError') return;
        stop(true);
        feedback('Tap Resume to continue playback.');
      });
    } else {
      $('#story-progress').value = 0;
      loadClip(state().ids[0], true);
    }
    markPlaying();
  }

  function advance() {
    if (!playing || transitioning) return;
    transitioning = true;
    if (playIndex + 1 >= state().ids.length) {
      stop();
      $('#story-progress').value = 1;
      $('#story-playback-status').textContent = 'Finished · play again';
      markPlaying();
      transitioning = false;
      return;
    }
    playIndex += 1;
    loadClip(state().ids[playIndex], true);
    markPlaying();
  }

  function select(id, preview = true) {
    if (!eventById(id)) return;
    stop();
    transitioning = false;
    state().selected = id;
    renderSelection();
    renderSequence();
    if (preview) loadClip(id);
    $('#story-progress').value = 0;
    $('#story-playback-status').textContent = `E${id} selected · play your edit`;
  }

  function relationGroup(label, ids, kind) {
    const group = make('div', `relation-group ${kind}`);
    group.append(make('span', 'relation-label', label));
    const list = make('div', 'relation-links');
    if (!ids.length) list.append(make('span', 'relation-empty', kind === 'before' ? 'No earlier link' : 'No later link'));
    for (const id of ids) {
      const button = make('button', '', `E${id} · ${eventById(id).choice}`);
      button.type = 'button';
      button.dataset.relationEvent = id;
      button.setAttribute('aria-label', `Inspect E${id}: ${eventById(id).title}`);
      list.append(button);
    }
    group.append(list);
    return group;
  }

  function relationArrow(active, kind) {
    const arrow = make('span', `relation-arrow ${kind}`);
    arrow.dataset.active = String(active);
    arrow.setAttribute('aria-hidden', 'true');
    arrow.innerHTML = '<svg class="direction-arrow" viewBox="0 0 44 20"><path class="direction-track" d="M2 10H39M32 3L39 10L32 17"/><path class="direction-flow" pathLength="100" d="M2 10H39"/></svg>';
    return arrow;
  }

  function renderSelection() {
    const selected = eventById(state().selected);
    const after = events().filter((event) => event.before.includes(selected.id)).map((event) => event.id);
    eventMap.querySelectorAll('[data-story-event]').forEach((button) => {
      const id = Number(button.dataset.storyEvent);
      const role = id === selected.id ? 'selected' : selected.before.includes(id) ? 'before' : after.includes(id) ? 'after' : 'other';
      const card = button.closest('.story-event');
      card.dataset.relation = role;
      button.setAttribute('aria-pressed', String(id === selected.id));
      button.querySelector('.event-relationship').textContent = role === 'before' ? '↗ Leads in' : role === 'after' ? '↳ Leads on' : role === 'selected' ? '● Selected' : '·';
      const included = state().ids.includes(id);
      card.querySelector('[data-event-include]').checked = included;
      card.querySelector('.event-toggle').title = `${included ? 'Remove from' : 'Add to'} your edit`;
      button.setAttribute('aria-label', `E${id}: ${eventById(id).title}. ${eventById(id).time}. ${role === 'before' ? 'Leads into the selected event. ' : role === 'after' ? 'Follows from the selected event. ' : ''}${state().ids.includes(id) ? 'Included in your edit.' : 'Not included in your edit.'}`);
    });
    const relation = $('#story-relations');
    const row = make('div', 'relation-row');
    row.append(relationGroup('LEADS IN', selected.before, 'before'), relationArrow(selected.before.length > 0, 'before'), relationGroup('SELECTED', [selected.id], 'selected'), relationArrow(after.length > 0, 'after'), relationGroup('LEADS ON', after, 'after'));
    relation.replaceChildren(row, make('p', 'relation-explanation', selected.text));
    PageMotion.enter(relation, 4);
    $('#story-selected-title').textContent = `E${selected.id} · ${selected.title}`;
    const included = state().ids.includes(selected.id);
    $('#story-include').setAttribute('aria-pressed', String(included));
    $('#story-include').textContent = included ? '✓ In your edit' : '+ Add to edit';
    $('#story-include').setAttribute('aria-label', `${included ? 'Remove' : 'Add'} E${selected.id}: ${selected.title} ${included ? 'from' : 'to'} your edit`);
    $('#story-caption').value = caption(selected.id);
    captionSaved = false;
    $('#story-caption').setAttribute('aria-label', `Caption for E${selected.id}: ${selected.title}`);
  }

  function renderSequence() {
    const positions = PageMotion.capture(sequence);
    sequence.replaceChildren(...state().ids.map((id, index) => {
      const item = make('li');
      const button = make('button', id === state().selected ? 'sequence-moment is-selected' : 'sequence-moment');
      button.type = 'button';
      button.dataset.sequenceEvent = id;
      button.setAttribute('aria-label', `Moment ${index + 1}: E${id}, ${eventById(id).title}`);
      button.setAttribute('aria-pressed', String(id === state().selected));
      const image = make('img');
      image.src = eventById(id).image;
      image.alt = '';
      image.width = 56;
      image.height = 40;
      button.append(image, make('span', '', `E${id}`));
      item.append(button);
      return item;
    }));
    PageMotion.settle(sequence, positions);
    if (!state().ids.length) sequence.append(make('li', 'empty-sequence', 'Your story starts with a moment. Check any event above to add it to your edit.'));
    const seconds = Math.round(duration());
    $('#story-duration').textContent = state().ids.length ? `· ${seconds}s` : '';
    $('#story-preview-count').textContent = `${state().ids.length} moment${state().ids.length === 1 ? '' : 's'}`;
    $('#story-play').disabled = !state().ids.length;
    $('#story-overlay').disabled = !state().ids.length;
    $('#story-earlier').disabled = !EventSequence.move(events(), state().ids, state().selected, -1);
    $('#story-later').disabled = !EventSequence.move(events(), state().ids, state().selected, 1);
    const missing = EventSequence.missing(events(), state().ids);
    $('#story-context-note').textContent = missing.length ? `${missing.map((id) => `E${id}`).join(', ')} ${missing.length === 1 ? 'adds' : 'add'} earlier context to this edit.` : state().ids.length ? 'The earlier context is included.' : 'Choose the moments you want to keep.';
    $('#story-context').hidden = !missing.length;
    $('#story-undo').disabled = !state().history.length;
    $('#story-narrative-text').textContent = state().ids.map(caption).join(' ');
    $('#story-narrative').hidden = !state().ids.length;
    const selectedIndex = state().ids.indexOf(state().selected);
    $('#story-sequence-help').textContent = selectedIndex < 0 ? 'Add the selected moment to include it in your sequence.' : 'Reorder independent moments. Earlier prerequisites stay before their effects.';
    markPlaying();
  }

  function renderMode() {
    modes.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.storyMode === state().mode)));
    $('#story-mode-description').textContent = {
      highlights: 'A short cut around the most connected moment. Add context or make it your own.',
      narrative: 'The events in sequence, with captions that explain how they connect.',
      custom: 'Keep the moments you want. Change their order and tell the story in your words.'
    }[state().mode];
  }

  function updateEdit(message) {
    stop();
    renderMode();
    renderSelection();
    renderSequence();
    loadClip(state().selected);
    $('#story-progress').value = 0;
    $('#story-playback-status').textContent = 'Edit updated · ready to play';
    feedback(message);
  }

  function showVideo(name, selected) {
    stop();
    videoName = name;
    if (!states[name]) states[name] = { ids: EventSequence.highlights(events()), selected: videoExamples[name].selected, mode: 'highlights', seconds: 3, captions: {}, history: [] };
    if (selected) state().selected = selected;
    $('#story-current-name').textContent = videoExamples[name].name;
    $('#story-current-pattern').textContent = videoExamples[name].pattern;
    $('#story-current-image').src = eventById(videoExamples[name].cover ?? videoExamples[name].selected).image;
    videoButtons.forEach((button) => {
      const active = button.dataset.storyVideo === name;
      button.setAttribute('aria-pressed', String(active));
    });
    if (!library.hidden) closeLibrary();
    $('#story-event-count').textContent = events().length;
    eventMap.dataset.count = events().length;
    eventMap.replaceChildren(...events().map((event) => {
      const card = make('div', 'story-event');
      const button = make('button', 'event-inspect');
      button.type = 'button';
      button.dataset.storyEvent = event.id;
      const frame = make('span', 'event-thumb');
      const image = make('img');
      image.src = event.image;
      image.alt = '';
      image.width = 240;
      image.height = 135;
      frame.append(image, make('span', 'event-number', `E${event.id}`));
      const body = make('span', 'event-body');
      body.append(make('strong', 'event-title', event.choice), make('span', 'event-time', event.time), make('span', 'event-relationship', ''));
      button.append(frame, body);
      const toggle = make('label', 'event-toggle');
      const checkbox = make('input');
      checkbox.type = 'checkbox';
      checkbox.dataset.eventInclude = event.id;
      checkbox.setAttribute('aria-label', `Include E${event.id}: ${event.title} in your edit`);
      const check = make('span', 'event-check');
      check.setAttribute('aria-hidden', 'true');
      check.innerHTML = '<svg viewBox="0 0 24 24"><path d="m5 12 4 4 10-10"/></svg>';
      toggle.append(checkbox, check);
      card.append(button, toggle);
      return card;
    }));
    PageMotion.enter(eventMap, 6);
    $('#story-caption-editor').hidden = true;
    $('#story-caption-toggle').setAttribute('aria-expanded', 'false');
    $('#story-narrative').open = state().mode === 'narrative';
    renderMode();
    select(state().selected);
    feedback('');
  }

  eventMap.addEventListener('click', (event) => {
    const button = event.target.closest('[data-story-event]');
    if (button) select(Number(button.dataset.storyEvent));
  });
  eventMap.addEventListener('change', (event) => {
    const checkbox = event.target.closest('[data-event-include]');
    if (checkbox) toggleIncluded(Number(checkbox.dataset.eventInclude));
  });
  eventMap.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const button = event.target.closest('[data-story-event], [data-event-include]');
    if (!button) return;
    event.preventDefault();
    const includes = button.hasAttribute('data-event-include');
    const buttons = [...eventMap.querySelectorAll(includes ? '[data-event-include]' : '[data-story-event]')];
    const index = buttons.indexOf(button);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next].focus();
    if (!includes) select(Number(buttons[next].dataset.storyEvent));
  });
  $('#story-relations').addEventListener('click', (event) => {
    const button = event.target.closest('[data-relation-event]');
    if (button) {
      select(Number(button.dataset.relationEvent));
      eventMap.querySelector(`[data-story-event="${state().selected}"]`).focus({ preventScroll: true });
    }
  });
  sequence.addEventListener('click', (event) => {
    const button = event.target.closest('[data-sequence-event]');
    if (button) {
      select(Number(button.dataset.sequenceEvent));
      sequence.querySelector(`[data-sequence-event="${state().selected}"]`).focus({ preventScroll: true });
    }
  });
  browse.addEventListener('click', () => {
    if (!library.hidden) { closeLibrary(); return; }
    showCategory(videoExamples[videoName].category);
    library.hidden = false;
    browse.setAttribute('aria-expanded', 'true');
    videoButtons.find((button) => button.dataset.storyVideo === videoName).focus({ preventScroll: true });
  });
  library.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') { event.preventDefault(); closeLibrary(); }
  });
  categoryButtons.forEach((button, index) => {
    button.addEventListener('click', () => showCategory(button.dataset.storyCategory));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? categoryButtons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + categoryButtons.length) % categoryButtons.length;
      categoryButtons[next].focus();
      showCategory(categoryButtons[next].dataset.storyCategory);
    });
  });
  videoButtons.forEach((button) => {
    button.addEventListener('click', () => showVideo(button.dataset.storyVideo));
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const visibleButtons = videoButtons.filter((item) => !item.hidden);
      const index = visibleButtons.indexOf(button);
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? visibleButtons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + visibleButtons.length) % visibleButtons.length;
      visibleButtons[next].focus();
    });
  });
  modes.forEach((button) => button.addEventListener('click', () => {
    save();
    state().mode = button.dataset.storyMode;
    if (state().mode === 'highlights') { state().ids = EventSequence.highlights(events()); state().seconds = 3; }
    if (state().mode === 'narrative') { state().ids = EventSequence.ordered(events(), events().map((event) => event.id)); state().seconds = 6; }
    $('#story-narrative').open = state().mode === 'narrative';
    updateEdit(state().mode === 'custom' ? 'Your sequence is ready to customise.' : `${state().ids.length} moments selected. Play your edit or customise it.`);
  }));
  function toggleIncluded(id) {
    if (!eventById(id)) return;
    save();
    const included = state().ids.includes(id);
    state().ids = included ? state().ids.filter((value) => value !== id) : EventSequence.ordered(events(), [...state().ids, id]);
    state().mode = 'custom';
    updateEdit(`E${id} ${included ? 'removed from' : 'added to'} your edit.`);
  }
  $('#story-include').addEventListener('click', () => toggleIncluded(state().selected));
  $('#story-context').addEventListener('click', () => {
    save();
    const missing = EventSequence.missing(events(), state().ids);
    const all = new Set([...state().ids, ...missing]);
    state().ids = EventSequence.ordered(events(), events().filter((event) => all.has(event.id)).map((event) => event.id));
    state().mode = 'custom';
    updateEdit(`Added ${missing.map((id) => `E${id}`).join(', ')} to show the earlier context.`);
  });
  for (const [selector, offset] of [['#story-earlier', -1], ['#story-later', 1]]) {
    $(selector).addEventListener('click', () => {
      const moved = EventSequence.move(events(), state().ids, state().selected, offset);
      if (!moved) return;
      save();
      state().ids = moved;
      state().mode = 'custom';
      updateEdit(`Moved E${state().selected} ${offset < 0 ? 'earlier' : 'later'}. Event prerequisites stay in order.`);
    });
  }
  $('#story-undo').addEventListener('click', () => {
    const previous = state().history.pop();
    if (!previous) return;
    Object.assign(state(), previous);
    updateEdit('Previous edit restored.');
  });
  $('#story-reset').addEventListener('click', () => {
    save();
    Object.assign(state(), { ids: EventSequence.highlights(events()), mode: 'highlights', seconds: 3, captions: {}, selected: videoExamples[videoName].selected });
    $('#story-narrative').open = false;
    updateEdit('Back to the suggested highlights.');
  });
  $('#story-caption-toggle').addEventListener('click', () => {
    const open = $('#story-caption-editor').hidden;
    $('#story-caption-editor').hidden = !open;
    $('#story-caption-toggle').setAttribute('aria-expanded', String(open));
    if (open) $('#story-caption').focus();
  });
  $('#story-caption').addEventListener('focus', () => { captionSaved = false; });
  $('#story-caption').addEventListener('input', () => {
    const value = $('#story-caption').value;
    if (!captionSaved) { save(); captionSaved = true; }
    stop();
    state().captions[state().selected] = value;
    state().mode = 'custom';
    renderMode();
    renderSequence();
    $('#story-progress').value = 0;
    $('#story-playback-status').textContent = 'Caption updated · ready to play';
    $('#story-narrative-text').textContent = state().ids.map(caption).join(' ');
    $('#story-undo').disabled = !state().history.length;
    if (Number($('#story-player').dataset.event) === state().selected) $('#story-player-caption').textContent = value;
  });
  const subtitle = make('p', 'story-player-caption');
  subtitle.id = 'story-player-caption';
  $('#story-player').append(subtitle);
  $('#story-play').addEventListener('click', play);
  $('#story-overlay').addEventListener('click', play);
  video.addEventListener('timeupdate', () => {
    if (!playing || transitioning) return;
    const id = state().ids[playIndex];
    const elapsed = state().ids.slice(0, playIndex).reduce((sum, item) => sum + clipLength(item), 0) + Math.min(video.currentTime, clipLength(id));
    $('#story-progress').value = duration() ? elapsed / duration() : 0;
    $('#story-playback-status').textContent = `${Math.floor(elapsed)} / ${Math.round(duration())}s · E${id}`;
    if (video.currentTime >= clipLength(id) - 0.04) advance();
  });
  video.addEventListener('ended', advance);
  video.addEventListener('pause', () => {
    if (!playing || !video.paused || transitioning || video.ended) return;
    stop(true);
    markPlaying();
    $('#story-playback-status').textContent = 'Paused';
  });
  video.addEventListener('error', () => {
    stop();
    $('#story-playback-status').textContent = 'Video unavailable · try again';
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && playing) {
      stop(true);
      markPlaying();
      $('#story-playback-status').textContent = 'Paused';
    }
  });
  document.querySelector('#explore-all').addEventListener('click', () => showVideo('chicken', 6));
  showVideo('running');
})();
