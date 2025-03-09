exports.request = (url, options = {}) => {
  const { params = {}, type = "text", ...restOptions } = options;
  const searchParams = new URLSearchParams(params);
  const fetchUrl = `${url}?${searchParams.toString()}`;
  return fetch(fetchUrl, restOptions).then((res) => {
    if (type === "text") {
      return res.text();
    }
    return res.json();
  });
};

exports.extractJsonFromCallback = (callbackString, callback = "callback") => {
  const jsonString = callbackString.match(
    new RegExp(`${callback}\\((.*)\\)`)
  )[1];
  return JSON.parse(jsonString);
};

const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

exports.loopRun = async (fns, delyTime = 30) => {
  let fn = fns.shift();
  while (fn) {
    await fn();
    await wait(delyTime);
    fn = fns.shift();
  }
};
