import data from './data';


const dealersAlpha = data.slice();
dealersAlpha.sort((a, b) => a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase()));
const dealersAlphaReverse = dealersAlpha.slice();
dealersAlphaReverse.reverse();

const tagsReducer = (accumulator, current) => {
  current.tags.forEach(tag => {
    accumulator[tag] = accumulator[tag] || 0;
    accumulator[tag] += 1;
  });

  return accumulator;
};

const tags = Object.entries(data.reduce(tagsReducer, {})).map(([name, count]) => `${name} (${count})`);
tags.sort();

export {
  data,
  dealersAlpha,
  dealersAlphaReverse,
  tags,
};
