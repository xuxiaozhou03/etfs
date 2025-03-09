const { fetchEtfList, fetchEtf } = require("./fetchEtfs");
const { loopRun } = require("./utils");
const fs = require("fs");

const main = async () => {
  const etfs = await fetchEtfList();

  const result = [];

  const fns = etfs.map((etf) => async () => {
    console.log("start", etf.symbol);
    const data = await fetchEtf(etf.symbol);
    console.log("end", etf.symbol);
    result.push({
      ...data,
      ...etf,
    });
  });

  await loopRun(fns, 100);

  const fields = [
    "symbol",
    "name",
    "scale",
    "trackingIndex",
    "performanceBenchmark",
  ];

  const json = {
    fields,
    data: result.map((item) => fields.map((field) => item[field])),
  };

  fs.writeFileSync("etfs.json", JSON.stringify(json));
};

main();
