import etfs from "./assets/etfs.json";

export type Etf = {
  symbol: string;
  name: string;
  scale: number;
  trackingIndex: string;
  performanceBenchmark: string;
};

const data = etfs.data.map((etf) => {
  return etfs.fields.reduce((acc, field, index) => {
    acc[field as "symbol"] = etf[index] as string;
    return acc;
  }, {} as Etf);
});

const originGroupIndexEtfs = data.reduce((acc, etf) => {
  if (!acc[etf.trackingIndex]) {
    acc[etf.trackingIndex] = [];
  }
  acc[etf.trackingIndex].push(etf);
  return acc;
}, {} as { [index: string]: Etf[] });

export const groupIndexEtfs = Object.entries(originGroupIndexEtfs).map(
  ([index, etfs]) => {
    return {
      index,
      etfs: etfs.sort((a, b) => b.scale - a.scale),
    };
  }
);

export default data;
