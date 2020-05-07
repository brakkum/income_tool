import frequencies from "./values/frequencies";
import React from "react";


const MonetaryDisplay = ({index, monetaryItem, removeMonetaryItem, setMonetaryItemName, setMonetaryItemValue, setMonetaryItemFrequency}) => {

    return <div className={"box monetary-box " + (monetaryItem.type === "expense" ? "is-bordered-red" : "is-bordered-green")}>
        <i
            className="delete is-pulled-right"
            onClick={() => removeMonetaryItem(index)}
            style={{marginBottom: "10px"}}
        />
        <div>Name</div>
        <input
            type="text"
            className="input"
            value={monetaryItem.name}
            onChange={e => setMonetaryItemName(index, e.target.value)}
        />
        <div>Value</div>
        <input
            type="text"
            className={
                "input " +
                ((new RegExp("[^\\d.]+").test(monetaryItem.value) || monetaryItem.value === "") ? "is-danger" : "")
            }
            value={monetaryItem.value}
            onChange={e => setMonetaryItemValue(index, e.target.value)}
        />
        <div>Occurrence</div>
        <div className="buttons hero-buttons">
            {
                Object.keys(frequencies).map((frequency, i) => {
                    return <button
                        className={"button is-small " + (frequency === monetaryItem.frequency ? "is-primary" : "")}
                        key={i}
                        onClick={() => setMonetaryItemFrequency(index, frequency)}
                    >
                        {frequency}
                    </button>
                })
            }
        </div>
    </div>
};

export default MonetaryDisplay;
