import React from 'react';

function mapInputs(inputs, handleInputChange) {
    const result = [];
    console.log(inputs);

    for (var inputName in inputs) {
        const jsx = inputs[inputName].jsx;

        const newJsx = React.cloneElement(jsx, {
            value: inputs[inputName]?.value,
            valid: inputs[inputName]?.valid ?? true,
            comment: inputs[inputName]?.comment,
            onChange: (event) => handleInputChange(event, inputName)
        })

        result.push(newJsx);
    }

    return result;
}

export default function AutoForm({ inputs, setInputs }) {

    const handleInputChange = (event, fieldName) => {
        event.preventDefault();

        const { valid, comment } = inputs[fieldName]?.validate && inputs[fieldName].validate(event.target.value) || { valid: true, comment: undefined };

        setInputs(olds => ({
            ...olds, [fieldName]: {
                jsx: inputs[fieldName]?.jsx,
                value: event.target.value,
                valid: valid,
                comment: comment,
                validate: inputs[fieldName]?.validate
            }
        }));
    }

    return (
        <form className="auto-form">
            {inputs && mapInputs(inputs, handleInputChange)}
        </form>
    )
}
