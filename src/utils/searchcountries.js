import no from "../data/countries/countries_no.json";
import de from "../data/countries/countries_de.json";
import fr from "../data/countries/countries_fr.json";
import en from "../data/countries/countries_en.json";

import list from "../data/countries/jhcountries.json";

import regionData from "../data/countries/countryandregionlist.json"

// https://gist.github.com/yesvods/51af798dd1e7058625f4#gistcomment-2365119

function concatAndDeDuplicateObjects(p, ...arrs) {
  return []
    .concat(...arrs)
    .reduce(
      (a, b) => (!a.filter((c) => b[p] === c[p]).length ? [...a, b] : a),
      []
    );
} 

// deduping translations of countries
const unfiltered = concatAndDeDuplicateObjects("name", no, de, fr, en);

//filtering out countries not in the Johns Hopkins data
let filtered = unfiltered.filter((f) =>
  list.map((v) => v).includes(f.alpha3)
);

// removing unneeded id and alpha2 info
filtered = filtered.map((item) => {
  return {
    label: item.name,
    value: item.alpha3,
  };
});

// antall countries (184 skrivende stund)
// console.log(concatAndDeDuplicateObjects("alpha3", filtered));

export const countries = filtered;

// regioner -- datastruktur
const regionObjs = regionData.map((item) => {
  return {
    label: item.name,
    value: item.alpha3Code.toLowerCase(),
    region: item.region,
    subregion: item.subregion
  }
})
// filtrer ut land som ikke har JH-data
const regionFiltered = regionObjs.filter((f) => 
  list.map((v) => v).includes(f.value)
)

// separer lister med regioner og subregioner
const regionVals = [...new Set(regionFiltered.map(item => item.region))]
const subRegions = [...new Set(regionFiltered.map(item => item.subregion))]
// console.log(subRegions)
export const regions = {
  meta: {
    regions: regionVals,
    subregions: subRegions
  },
  data: regionFiltered
}
