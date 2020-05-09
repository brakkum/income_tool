import useLocalStorage from "./hooks/useLocalStorage";
import MonetaryDisplay from "./MonetaryDisplay";
import frequencies from "./values/frequencies";
import MonetaryOutput from "./MonetaryOutput";
import React from "react";

const MonthlyIncomeTool = () => {

    let [monetaryValues, setMonetaryValues] = useLocalStorage("monetaryValue", []);
    // weekly, biweekly, monthly, yearly
    let [timeframe, setTimeframe] = useLocalStorage("timeframe", "Weekly");

    const addNewMonetaryItem = type => {
        setMonetaryValues([...monetaryValues, {
            "type": type,
            "name": "",
            "value": 0,
            "frequency": "BiWeekly",
            "active": true
        }]);
    };

    const setMonetaryItemName = (index, name) => {
        let items = monetaryValues;
        items[index].name = name;
        setMonetaryValues([...items]);
    };

    const setMonetaryItemValue = (index, value) => {
        let items = monetaryValues;
        items[index].value = value;
        setMonetaryValues([...items]);
    };

    const setMonetaryItemFrequency = (index, frequency) => {
        let items = monetaryValues;
        items[index].frequency = frequency;
        setMonetaryValues([...items]);
    };

    const removeMonetaryItem = index => {
        setMonetaryValues(monetaryValues.filter((monetaryValue, i) => {
            return i !== index;
        }))
    };

    const toggleMonetaryItemActive = index => {
        let items = monetaryValues;
        items[index].active = !items[index].active;
        setMonetaryValues([...items]);
    };

    return <main className="">
        <div className="section">
            <h3 className="is-size-3 has-text-centered">{timeframe} Totals</h3>
            <MonetaryOutput monetaryValues={monetaryValues} timeframe={timeframe} />
            <div className="buttons hero-buttons">
                {
                    Object.keys(frequencies).map((frequency, i) => {
                        return <button
                            key={i}
                            className={"button " + (timeframe === frequency ? "is-primary" : "")}
                            onClick={() => setTimeframe(frequency)}>{frequency}
                        </button>
                    })
                }
            </div>
        </div>
        <div className="has-text-centered buttons hero-buttons">
            <button className="button margin-bottom-fix button-red" onClick={() => addNewMonetaryItem("expense")}>New Expense</button>
            <button className="button margin-bottom-fix button-green" onClick={() => addNewMonetaryItem("income")}>New Income</button>
        </div>
        <div className="">
            <div className="is-flex monetary-items">
                {
                    monetaryValues.map((monetaryItem, i) => {
                        return <MonetaryDisplay
                            monetaryItem={monetaryItem}
                            removeMonetaryItem={removeMonetaryItem}
                            setMonetaryItemName={setMonetaryItemName}
                            setMonetaryItemValue={setMonetaryItemValue}
                            setMonetaryItemFrequency={setMonetaryItemFrequency}
                            toggleMonetaryItemActive={toggleMonetaryItemActive}
                            index={i}
                            key={i}
                        />
                    })
                }
            </div>
        </div>
    </main>;
};

export default MonthlyIncomeTool;
