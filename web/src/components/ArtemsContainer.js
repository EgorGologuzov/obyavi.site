import {useState} from 'react';

import CollapseContainer from './CollapseContainer';
import DropdownList from './DropdownList';
import InputString from './InputString';
import Logo from './Logo';
import ScrollingList from './ScrollingList';
import SearchString from './SearchString';
import Spliter from './Spliter';
import StarsBar from './StarsBar';
import Switch from './Switch';
import ToolButton from './ToolButton';
import ToolPanel from './ToolPanel';
import Grid from './Grid';
import Button from './Button';
import InputPassword from './InputPassword';
import InputPhone from './InputPhone';
import InputText from './InputText';
import InputDate from './InputDate';
import VisibilityIcon from './VisibilityIcon';
import RadioButton from './RadioButton';

export default function ArtemsContainer({ children, header }) {
    const searchSamples = ['best coffee shops near me', 'how to learn Python programming', 'top tourist attractions in Paris', 'healthy dinner recipes', 'latest smartphone reviews', 'how to start a blog', 'tips for improving public speaking', 'best books of 2024', 'how to meditate for beginners', 'DIY home improvement projects', 'fun activities for kids at home', 'best workout routines for weight loss', 'how to save money on groceries', 'upcoming movies in theaters', 'top 10 travel destinations in Asia', 'how to improve your credit score', 'best online courses for career development', 'easy gardening tips for beginners', 'how to create a budget plan', 'best practices for remote work', 'ways to boost your immune system', 'how to make homemade pizza', 'tips for effective time management']
    const dropdownSamples={'option_1':'White','option_2':'Red','option_3':'Green','option_4':'Blue','option_5':'Black'};

    const [selectedRadioBtn,setSelectedRadioBtn]=useState('small');
    const [starRating,setStarRating]=useState(0);
    const [inputString,setInputString]=useState('');
    const [inputPassword,setInputPassword]=useState('');
    const [inputText,setInputText]=useState('');
    const [inputPhone,setInputPhone]=useState('');
    const [switchValue,setSwitchValue]=useState(false);
    const [searchString,setSearchString]=useState('');
    const [dropdownValue,setDropdownValue]=useState('');
    const [inputDateValue,setInputDateValue]=useState(new Date());

    const handleRadioBtnChange = (val) => {
      setSelectedRadioBtn(val);
      console.log(val);
    };

    const handleSwitchChange=(e,oldValue,setInput)=>{
        let newValue=e.target.checked;
        console.log(`new Value:${newValue}, oldValue:${oldValue}`);
        setInput(newValue);
    }

    const handleInputChange = (e,oldValue,setInput)=>{
        let newValue=e.target.value;
        console.log(`new Value:${newValue}, oldValue:${oldValue}`);
        setInput(newValue);
    }

    const handleStarChange=(oldValue,newValue)=>{
        setStarRating(newValue);
        console.log(`new Value:${newValue}, oldValue:${oldValue}`);
    }

    const handleSearchChange=(oldValue,newValue)=>{
        setSearchString(newValue);
        console.log(`new Value:${newValue}, oldValue:${oldValue}`);
    }

    const handleOnSearch=(value)=>{
        console.log(`do something with:${value}`);
    }

    const handleDropdownChange=(oldValue,newValue)=>{
        setDropdownValue(newValue);
        console.log(`new Value:${newValue}, oldValue:${oldValue}`);
    }

    const handleInputDateChange=(oldValue,newValue)=>{
        setInputDateValue(newValue);
        console.log(`new Value:${newValue}, oldValue:${oldValue}`);
    }

    return (
        <CollapseContainer header="Блоки Артема">
            <SearchString hints={searchSamples} inputValue={searchString} onChange={handleSearchChange} onSearch={()=>handleOnSearch(searchString)}/>
            <Spliter/>
            <DropdownList options={dropdownSamples} value={dropdownValue} onChange={handleDropdownChange}/>
            <Spliter/>
            <Logo onClick={() => alert("Hello")}/>
            <Spliter/>
            <Logo full={true} onClick={() => alert("Hello")}/>
            <Spliter/>
            <Switch checked={switchValue} onChange={(e)=>handleSwitchChange(e,switchValue,setSwitchValue)}/>
            <Spliter/>
            <StarsBar value={5}/>
            <Spliter/>
            <StarsBar input_mode value={starRating} onChange={handleStarChange}/>
            <Spliter/>
            <ScrollingList>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
            </ScrollingList>
            <Spliter/>
            <InputString required={true} label='Label' comment='Comment' value={inputString} onChange={(e)=>handleInputChange(e,inputString,setInputString)}/>
            <Spliter/>
            <InputPassword label='Password' required={true} comment='Comment' value={inputPassword} onChange={(e)=>handleInputChange(e,inputPassword,setInputPassword)}/>
            <Spliter/>
            <InputPhone label='Phone number' required={true} comment='Comment' value={inputPhone} onChange={(e)=>handleInputChange(e,inputPhone,setInputPhone)}/>
            <Spliter/>
            <InputText required={true} value={inputText} onChange={(e)=>handleInputChange(e,inputText,setInputText)}/>
            <Spliter/>
            <InputDate onChange={handleInputDateChange} value={inputDateValue}/>
            <Spliter/>
            <div className="radio-btn__group">
                <RadioButton name='radio-btn_name' group={"radio-btn__group_1"} id='small' value='small' checked={selectedRadioBtn==='small'} label='маленький' onChange={handleRadioBtnChange}/>
                <RadioButton name='radio-btn_name' group={"radio-btn__group_1"}  id='medium' value='medium' checked={selectedRadioBtn==='medium'} label='средний' onChange={handleRadioBtnChange}/>
                <RadioButton name='radio-btn_name' group={"radio-btn__group_1"}  id='large' value='large' checked={selectedRadioBtn==='large'} label='большой' onChange={handleRadioBtnChange}/>
            </div>
            <Spliter/>
        </CollapseContainer>
    );
}