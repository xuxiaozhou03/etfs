import React from "react";
import { groupIndexEtfs } from "./data";

function App() {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-slate-400">
          <th className="text-left">名称</th>
          <th className="text-left">代码</th>
          <th className="text-left">规模（亿）</th>
        </tr>
      </thead>
      <tbody>
        {groupIndexEtfs.map((group) => (
          <React.Fragment key={group.index}>
            <tr key={group.index}>
              <td colSpan={3} className="text-center bg-slate-100">
                跟踪标的：{group.index}
              </td>
            </tr>
            {group.etfs.map((etf) => (
              <tr
                key={etf.symbol}
                className={etf.scale < 1 ? "line-through" : ""}
              >
                <td>{etf.name}</td>
                <td>{etf.symbol}</td>
                <td>{etf.scale}</td>
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default App;
