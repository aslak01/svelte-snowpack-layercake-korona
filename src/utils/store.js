import { writable, derived } from "svelte/store";
import { uniqueByKeepLast } from "./functions.js";

export const absoluteMax = writable([]);
export const pMilMax = writable([]);
export const minidayStore = writable({});

export const minidayCopy = derived(minidayStore, ($minidayStore) =>
  uniqueByKeepLast($minidayStore, (itm) => itm.id)
);

export const minidaySettings = writable({
  range: 7,
  start: 0,
  end: 1,
  skala: 3,
  color: "black",
  navnOversatt: true,
  cut: { start: 0, end: 1 },
  selectedValue: [],
  pMax: null,
  aMax: null,
});
export const minidayCharts = writable([]);

let id = 0;
let newId = () => {
  id++;
  return id;
};

let data = [{ id: newId(), value: "nor", pop: 0, aMax: 0, pMax: 0, data: [] }];
