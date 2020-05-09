import React from "react";
import frequencies from "./values/frequencies";

const MonetaryOutput = ({monetaryValues, timeframe}) => {

    let income = 0;
    let expenses = 0;

    for (let monetaryItem of monetaryValues) {
        if (!monetaryItem.active) continue;
        let timesPerYear = frequencies[monetaryItem.frequency];
        let value = monetaryItem.value;
        let type = monetaryItem.type;
        let totalForYear = value * timesPerYear;
        let totalPerTimeframe = totalForYear / frequencies[timeframe];
        if (type === "income") {
            income += totalPerTimeframe;
        } else if (type === "expense") {
            expenses += totalPerTimeframe;
        }
    }

    const formatMoney = (value, color = null) => {
        if (isNaN(value)) {
            return <span style={{color: "darkred"}}>
                Why did you break it? Just use numbers and periods.
            </span>
        }
        if (color) {
            return <span style={{color: color}}>
                ${value.toFixed(2)}
            </span>
        }
        return <span style={{color: value >= 0 ? "green" : "darkred"}}>
            ${value.toFixed(2)}
        </span>
    }

    let netIncome = income - expenses;
    return <div className="has-text-centered">
        <h4 className="is-size-4">
            Income: {formatMoney(income, "green") || 0}
        </h4>
        <h4 className="is-size-4">
            Expenses: {formatMoney(expenses, "darkred") || 0}
        </h4>
        <h4 className="is-size-4">
            Net Income for Period: {formatMoney(netIncome) || 0}
        </h4>
    </div>
};

export default MonetaryOutput;
