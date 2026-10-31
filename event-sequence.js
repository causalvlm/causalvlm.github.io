const EventSequence = Object.freeze({
  ancestors(events, id, visited = new Set()) {
    const event = events.find((item) => item.id === id);
    if (!event) return visited;
    for (const parent of event.before) {
      if (visited.has(parent)) continue;
      visited.add(parent);
      this.ancestors(events, parent, visited);
    }
    return visited;
  },
  missing(events, ids) {
    const selected = new Set(ids);
    const missing = new Set();
    for (const id of ids) {
      for (const parent of this.ancestors(events, id)) {
        if (!selected.has(parent)) missing.add(parent);
      }
    }
    return events.filter((event) => missing.has(event.id)).map((event) => event.id);
  },
  ordered(events, ids) {
    const remaining = [...new Set(ids)].filter((id) => events.some((event) => event.id === id));
    const result = [];
    while (remaining.length) {
      const index = remaining.findIndex((id) => {
        const ancestors = this.ancestors(events, id);
        return !remaining.some((other) => ancestors.has(other));
      });
      if (index < 0) throw new Error('Event relationships must form a directed acyclic graph.');
      result.push(...remaining.splice(index, 1));
    }
    return result;
  },
  highlights(events) {
    const score = (event) => event.before.length * 2 + events.filter((other) => other.before.includes(event.id)).length;
    const anchor = events.reduce((best, event) => score(event) > score(best) ? event : best, events[0]);
    return events.filter((event) => event.id === anchor.id || anchor.before.includes(event.id) || event.before.includes(anchor.id)).map((event) => event.id);
  },
  move(events, ids, id, offset) {
    const index = ids.indexOf(id);
    const target = index + offset;
    if (index < 0 || target < 0 || target >= ids.length) return null;
    const proposed = [...ids];
    [proposed[index], proposed[target]] = [proposed[target], proposed[index]];
    const ordered = this.ordered(events, proposed);
    return proposed.every((value, position) => ordered[position] === value) ? proposed : null;
  },
  caption(event, captions) {
    return captions[event.id] ?? event.narration ?? event.text;
  }
});
