import { writable, derived } from "svelte/store";
import { uniqueByKeepLast } from './functions.js'


export const absoluteMax = writable([]);
export const pMilMax = writable([]);
export const minidayStore = writable({});
export const minidaySettings = writable({});
export const minidayCopy = derived(
  minidayStore,
  $minidayStore => uniqueByKeepLast($minidayStore, itm => itm.id)
);



