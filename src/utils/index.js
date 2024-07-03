const getPropertyObject = (str, json) =>
  str.length === 0 ? [] : str.split(',').map((name) => json[name.trim()]?.id);

const stringToArray = (str) => (str.length === 0 ? [] : str.split(',').map((name) => name.trim()));

const mapTagsOrSkills = (str) => {
  if (str) {
    return str.length > 0 ? str.split(',').map((name) => ({ name: name.trim() })) : [];
  } else {
    return [];
  }
};

module.exports = {
  getPropertyObject,
  stringToArray,
  mapTagsOrSkills
};
