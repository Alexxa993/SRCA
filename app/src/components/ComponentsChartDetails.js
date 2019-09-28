import React from "react";
import Chart from "react-google-charts";
import { Label } from "reactstrap";

export const ComponentsChartDetails = props => {
  const { component } = props;

  const data = component.phases.map(ph => {
    return [ph.name, new Date(ph.dateFrom), new Date(ph.dateTo)];
  });

  return (
    <>
      <Label for="chart">Component chart: </Label>
      <Chart
        width={"500px"}
        height={"300px"}
        chartType="Timeline"
        loader={<div>Loading Chart</div>}
        data={[
          [
            { type: "string", id: "Phase" },
            { type: "date", id: "Start" },
            { type: "date", id: "End" }
          ],
          ...data
        ]}
        options={{
          showRowNumber: true
        }}
        rootProps={{ "data-testid": "1" }}
      />
    </>
  );
};
