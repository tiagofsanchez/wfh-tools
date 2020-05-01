import React from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useTheme } from "@material-ui/core"
import PropTypes from "prop-types"

const FundingGraph = ({ fundingHistory }) => {
  const theme = useTheme()

  let graphData = []
  fundingHistory.split(", ").map(yearAndMoney => {
    graphData.push({
      name: yearAndMoney.slice(0, 4),
      Raised: yearAndMoney.slice(5),
    })
    return graphData
  })

  return (
    <div style={{ margin: `auto` }}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={graphData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" padding={{ left: 10, right: 10 }} />
          <YAxis unit="$ Musd" padding={{ top: 30 }} />
          <Tooltip
            contentStyle={{
              borderRadius: "4px",
              backgroundColor: theme.palette.background.paper,
            }}
            formatter={(value) => (`${value}$ Musd`)}
          />
          <Area
            type="monotone"
            dataKey="Raised"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

FundingGraph.propTypes = {
  fundingHistory: PropTypes.string.isRequired,
}

export default FundingGraph
