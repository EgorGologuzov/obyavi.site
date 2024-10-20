import ToolButton from "./ToolButton";
import { useState } from "react";

export default function UpDown({ min = 1, max = 10, value = 1, onChange }) {
    min = +min;
    max = +max;
    value = +value;

    const [numValue, setNumValue] = useState(value);
    const [pastNumValue, setPastNumValue] = useState(value);

    const up = () => {
        checkCorrectAndSetNumValue(numValue + 1);
    }
    const down = () => {
        checkCorrectAndSetNumValue(numValue - 1);
    }

    const checkCorrectAndSetNumValue = (value) => {
        value = Number(value);

        const newValue = value < min ? min
            : value > max ? max
            : value;

        setNumValue(newValue);

        if (pastNumValue === newValue) {
            return;
        }

        const oldValue = pastNumValue;

        setPastNumValue(newValue);
        onChange({newValue: newValue, oldValue: oldValue});
    }

    const handleChange = (event) => {
        const value = Number(event.target.value);
        setNumValue(value);
    };

    const handleBlur = (event) => {
        checkCorrectAndSetNumValue(event.target.value);
    };

    const handleKeyUp = (event) => {
        if (event.key === "Enter") {
            checkCorrectAndSetNumValue(event.target.value);
        }
    };

    return (
        <div className="up-down">
            <ToolButton icon="icon-left-arrow" onClick={down} disabled={numValue <= min} />
            <input className="up-down__input" type="number" value={numValue} onChange={handleChange} onBlur={handleBlur} onKeyUp={handleKeyUp}/>
            <label className="up-down__label">/{max}</label>
            <ToolButton icon="icon-right-arrow" onClick={up} disabled={numValue >= max} />
        </div>
    )
}
