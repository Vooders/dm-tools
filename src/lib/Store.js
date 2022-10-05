


module.exports = (dir) => {
  const fs = require('fs')
  const path = require('path')
  return {
    get: (filename) => {
      const filePath = path.join(dir, filename + '.json');
      return parseDataFile(filePath, {});
    },
    set: (filename, data) => {
      const filePath = path.join(dir, filename + '.json');
      fs.writeFileSync(filePath, JSON.stringify(data));
    }
  }
}


function parseDataFile(filePath, defaults) {
  try {
    return JSON.parse(fs.readFileSync(filePath).toString());
  } catch(error) {
    return defaults;
  }
}
