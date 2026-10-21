export function reconcileEvents(sourceEvents, targetEvents) {
  const sourceById = new Map(sourceEvents.map((event) => [event.id, event]));
  const targetById = new Map(targetEvents.map((event) => [event.id, event]));
  const missing = [];
  const mismatched = [];
  const unexpected = [];
  for (const source of sourceEvents) {
    const target = targetById.get(source.id);
    if (!target) {
      missing.push(source.id);
    } else if (target.status !== source.status || target.payloadHash !== source.payloadHash) {
      mismatched.push(source.id);
    }
  }
  for (const target of targetEvents) {
    if (!sourceById.has(target.id)) unexpected.push(target.id);
  }
  return {sourceCount: sourceEvents.length, targetCount: targetEvents.length, missing, mismatched, unexpected};
}

export function summarize(result) {
  return `Reconciliation complete: ${result.missing.length} missing, ${result.mismatched.length} mismatched, ${result.unexpected.length} unexpected.`;
}
