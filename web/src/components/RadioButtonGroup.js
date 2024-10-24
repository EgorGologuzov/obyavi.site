const RadioButton=({value,title,selected,groupName,onChange,disabled=false})=>{
    const handleChange = () => onChange?.(value);

    const inputId = `${groupName}_radio_item_with_value__${value}`;
    const isChecked = value === selected;
    const isDisabled=disabled;
  
    return (
      <div
        className='radio-btn-group_item'
        key={value}
        data-checked={isChecked}
        data-disabled={isDisabled}
      >
        <input
          className='radio-btn-group_item_input'
          type="radio"
          name={groupName}
          id={inputId}
          value={value}
          onChange={handleChange}
        />
        <label className='radio-btn-group_item_label' htmlFor={inputId}>
          {title}
        </label>
        <p className="radio-btn-group_item_comment">Comment</p>
        <div className="radio-btn-group_item_color-filter"></div>
      </div>
    );
}

const RadioButtonGroup = ({name,options,selected,onChange}) => {
    const handleChange=(value)=>onChange?.(value);

    return ( 
        <div className='radio-btn-group'>
      {options.map(({ value, title ,disabled}) => (
        <RadioButton
          key={value}
          groupName={name}
          disabled={disabled}
          value={value}
          title={title}
          selected={selected}
          onChange={handleChange}
        />
      ))}
    </div>
    );
}
 

export default RadioButtonGroup;