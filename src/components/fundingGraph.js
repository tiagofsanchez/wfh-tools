import React from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import PropTypes from "prop-types"

const FundingGraph = ({ fundingHistory }) => {
  let graphData = []
  fundingHistory.map(yearAndMoney => {
    graphData.push({
      name: yearAndMoney.slice(0, 4),
      raised: yearAndMoney.slice(5),
    })
    return graphData
  })

  console.log(graphData)

  return (
    <div style={{ margin: `auto` }}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={graphData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="raised"
            stroke="#8884d8"
            fill="#8884d8"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

FundingGraph.propTypes = {
  fundingHistory: PropTypes.array.isRequired,
}

export default FundingGraph
