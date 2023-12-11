//preserved keys

const preserveKeys = [];

// Saving data to local storage
export const setData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Retrieving data from local storage
export const getData = (key) => {
  const storedData = localStorage.getItem(key);
  const parsedData = JSON.parse(storedData);

  return parsedData;
};

//Clear Storage
export const clearStorage = (clearAll = true) => {
  if (localStorage) {
    Object.keys(localStorage).forEach((key) => {
      if (clearAll === false) {
        if (!key.includes(preserveKeys)) {
          localStorage.removeItem(key);
        }
      } else {
        localStorage.removeItem(key);
      }
    });
  }
};
