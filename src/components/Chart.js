import React, { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const abortController = new AbortController();

const Chart = () => {
  const [company, setCompany] = useState("");
  const [options, setOptions] = useState({
    title: {
      text: "My chart",
    },
    series: [{ data: [] }],
  });

  useEffect(() => {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${company}&outputsize=full&apikey=I0R8K64CG3EHARV6`,
      { signal: abortController.signal }
    )
      .then((response) => response.json())
      .then((data) => {
        // the below commented code was meant to display the data in the chart,
        //but because I get an error that I made a lot of call requests, I can't get the data, and stuck on displaying it.
        // let x;
        // for (var key of Object.keys(data)) {
        //   x = Object.values(data[key]);
        //   x.forEach((col) =>
        //     setOptions({ series: [{ data: Object.keys(col) }] })
        //   );
        //   console.log(data[key]);
        // }
      })
      .catch((err) => console.error(err));
    return () => {
      abortController.abort();
    };
  }, [company]);
  return (
    <div>
      <select
        value={company}
        onChange={(e) => {
          const selectedCompany = e.target.value;
          setCompany(selectedCompany);
        }}
        class="form-select"
      >
        <option value="IBM">IBM</option>
        <option value="MSFT">Microsoft</option>
        <option value="AAPL">Apple</option>
      </select>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Chart;
