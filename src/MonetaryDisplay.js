import frequencies from "./values/frequencies";
import React from "react";


const MonetaryDisplay = ({index, monetaryItem, removeMonetaryItem, setMonetaryItemName, setMonetaryItemValue, setMonetaryItemFrequency, toggleMonetaryItemActive}) => {

    return <div className={"box monetary-box " + (monetaryItem.type === "expense" ? "is-bordered-red" : "is-bordered-green")}>
        <h2 className="is-size-2 is-pulled-left">
            {monetaryItem.name ? monetaryItem.name :
                monetaryItem.type === "expense" ? "New Expense" : "New Income"
            }
        </h2>
        <div className="is-pulled-right box-upper-right is-flex">
            <div className="">
                Active&nbsp;
                <input
                    type="checkbox"
                    className="checkbox"
                    checked={monetaryItem.active}
                    onChange={() => toggleMonetaryItemActive(index)}
                />
            </div>
            <i
                className="delete"
                onClick={() => removeMonetaryItem(index)}
                style={{marginBottom: "10px"}}
            />
        </div>
        <div>
            <input
                type="text"
                className="input"
                placeholder="Name"
                value={monetaryItem.name}
                onChange={e => setMonetaryItemName(index, e.target.value)}
            />
        </div>
        <div>
            <input
                type="text"
                placeholder="Dollar Value"
                className={
                    "input " +
                    ((new RegExp("[^\\d.]+").test(monetaryItem.value) || monetaryItem.value === "") ? "is-danger" : "")
                }
                value={monetaryItem.value}
                onChange={e => setMonetaryItemValue(index, e.target.value)}
            />
        </div>
        <div>
            Occurrence Rate
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
    </div>
};

export default MonetaryDisplay;
