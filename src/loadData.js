import data from './data';


const dealersAlpha = data.slice();
dealersAlpha.sort((a, b) => a.display_name.toLowerCase().localeCompare(b.display_name.toLowerCase()));
const dealersAlphaReverse = dealersAlpha.slice();
dealersAlphaReverse.reverse();

const tagsReducer = (accumulator, current) => {
  current.tags.forEach(tag => accumulator.add(tag));

  return accumulator;
};

const tags = Array.from(data.reduce(tagsReducer, new Set()));
tags.sort();

export {
  data,
  dealersAlpha,
  dealersAlphaReverse,
  tags,
};
