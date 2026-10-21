import test from 'node:test';
import assert from 'node:assert/strict';
import {reconcileEvents, summarize} from './reconcile.js';

test('reconciles matched SaaS events', () => {
  const events = [{id:'evt-1',status:'processed',payloadHash:'a1'}];
  const result = reconcileEvents(events, events);
  assert.deepEqual(result, {sourceCount:1,targetCount:1,missing:[],mismatched:[],unexpected:[]});
});

test('detects missing, mismatched, and unexpected events', () => {
  const result = reconcileEvents(
    [{id:'evt-1',status:'processed',payloadHash:'a1'}, {id:'evt-2',status:'queued',payloadHash:'b2'}],
    [{id:'evt-1',status:'failed',payloadHash:'a1'}, {id:'evt-3',status:'processed',payloadHash:'c3'}],
  );
  assert.deepEqual(result.missing, ['evt-2']);
  assert.deepEqual(result.mismatched, ['evt-1']);
  assert.deepEqual(result.unexpected, ['evt-3']);
});

test('produces an operator summary', () => {
  const result = reconcileEvents([], [{id:'evt-9',status:'processed',payloadHash:'z9'}]);
  assert.equal(summarize(result), 'Reconciliation complete: 0 missing, 0 mismatched, 1 unexpected.');
});
