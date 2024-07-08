const getPropertyObject = (str, json) => {
  if (str.length === 0) return [];
  return str.split(',').map((name) => {
    const prop = name.toLowerCase().trim();
    console.log(prop);
    const real = json[prop];

    return real.id;
  });
};

const stringToArray = (str) => (str.length === 0 ? [] : str.split(',').map((name) => name.trim()));

const mapTagsOrSkills = (str) => {
  if (str) {
    return str.length > 0 ? str.split(',').map((name) => ({ name: name.trim() })) : [];
  } else {
    return [];
  }
};

function sleep(ms = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  getPropertyObject,
  stringToArray,
  mapTagsOrSkills,
  sleep
};
