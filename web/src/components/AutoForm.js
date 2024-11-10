import React, { useState } from 'react';
import Grid from "./Grid";

// хук для создания нового сотояния формы
export function useNewFormState() {
    // устанавливаю все необходимые сотояни
    // values - объект {имяИнпута: значениеИнпута}, имя задается в пропсах инпута как name=""
    // invalidFields - Set, содержит имена неправильно заполненных полей
    const [values, setValues] = useState({});
    const [invalidFields, setInvalidFields] = useState(new Set());

    // собираю все в один объект
    const formState = {
        values: values,
        invalidFields: invalidFields
    }

    // возврат
    return formState;
}

/* автоформа следит за изменениями значений внутренних валидируемых инпутов и их валидацией,
результат отслеживания сохраняет в объект formState */
export default function AutoForm({ children, formState }) {

    const handleInputChange = ({ fieldName, newValue, isValid }) => {
        // устанавливаю значение поля в объект значений formState.values
        formState.values[fieldName] = newValue;
        // если значение не прошло валидацию внутри компонента, то добавляю его в набор неверных значений
        // иначе, удаляю его оттуда
        isValid ? formState.invalidFields.delete(fieldName) : formState.invalidFields.add(fieldName);
    }

    return (
        <form className="auto-form">
            <Grid desktopColumns={1} mobileColumns={1}>
                {/* прохожусь по всем внутр. элементам и клонирую их задавая новые обработчики*/}
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        if (!child.props.name) {
                            return child;
                        }

                        return React.cloneElement(child, {
                            // задаю обработчики на событие изменения значеня и событе первоначальной проверки значения
                            // передаю их в функцию, которая синхронизирует перенесет эти значения в formState
                            onChange: (event) => handleInputChange({
                                fieldName: child.props.name,
                                newValue: event.newValue,
                                isValid: event.isValid
                            }),
                            onMontage: (event) => handleInputChange({
                                fieldName: child.props.name,
                                newValue: event.value,
                                isValid: event.isValid
                            })
                        });
                    }
                    return child;
                })}
            </Grid>
        </form>
    )
}