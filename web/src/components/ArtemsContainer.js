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
import RadioButtonGroup from './RadioButtonGroup';
import InputPassword from './InputPassword';
import InputPhone from './InputPhone';
import InputText from './InputText';
import InputDate from './InputDate';

export default function ArtemsContainer({ children, header }) {
    const searchSamples = ['best coffee shops near me', 'how to learn Python programming', 'top tourist attractions in Paris', 'healthy dinner recipes', 'latest smartphone reviews', 'how to start a blog', 'tips for improving public speaking', 'best books of 2024', 'how to meditate for beginners', 'DIY home improvement projects', 'fun activities for kids at home', 'best workout routines for weight loss', 'how to save money on groceries', 'upcoming movies in theaters', 'top 10 travel destinations in Asia', 'how to improve your credit score', 'best online courses for career development', 'easy gardening tips for beginners', 'how to create a budget plan', 'best practices for remote work', 'ways to boost your immune system', 'how to make homemade pizza', 'tips for effective time management', 'best video editing software for beginners', 'how to write a resume that stands out', 'popular podcasts to listen to in 2024', 'ways to reduce stress and anxiety', 'how to take better photos with your phone', 'top fashion trends for fall 2024', 'how to plan a successful event', 'best apps for productivity', 'tips for traveling on a budget', 'how to build a personal brand online', 'healthy snacks for weight loss', 'best places to visit in Europe', 'how to improve your writing skills', 'tips for starting a small business', 'best practices for social media marketing', 'how to stay motivated while working from home', 'easy recipes for busy weeknights', 'how to choose the right college major', 'top online shopping sites for deals', 'ways to make extra money from home', 'how to create engaging content on social media', 'best family-friendly vacation spots', 'tips for effective networking in your career', 'how to develop good study habits', 'top health and wellness trends of 2024', 'how to find your passion and purpose in life', 'best ways to declutter your home', 'how to improve communication skills at work', 'popular fitness challenges you can try at home', 'tips for enhancing your digital security', 'best documentaries on Netflix right now', 'how to foster creativity in the workplace', 'easy crafts you can do with kids', 'ways to practice mindfulness daily', 'how to negotiate a salary increase effectively', 'top YouTube channels for learning new skills', 'best practices for maintaining work-life balance', 'how to write compelling marketing copy', 'tips for effective team collaboration online', 'popular board games for family game night', 'ways to support mental health in the workplace', 'how to create a successful YouTube channel', 'best travel apps for planning trips in 2024','tips for improving your LinkedIn profile','ways to incorporate more vegetables into your diet','best strategies for managing remote teams','how to host a virtual event successfully','popular recipes trending on social media','ways to practice gratitude daily','tips for enhancing your public relations skills','best online tools for project management','how to create a sustainable lifestyle','popular trends in interior design','ways to improve customer service experience','tips for effective conflict resolution at work','how to stay organized while working from home','best podcasts about entrepreneurship','easy meal prep ideas for busy people','ways to enhance employee engagement','tips for building resilience in challenging times','popular travel blogs you should follow','how to create an effective marketing strategy','best practices for email marketing campaigns','ways to give back to your community','tips for improving personal finance management'];
    const dropdownSamples=['White','Silver','Dark Gray','Khaki','Dark Khaki'];
    const radioButtonSamples=[
        { "title": "1 неделя", "value": "1_week" ,"disabled":true},
        { "title": "1 месяц", "value": "1_month" },
        { "title": "3 месяца", "value": "3_months" },
        { "title": "6 месяцев", "value": "6_months" },
        { "title": "Все время", "value": "all" }
    ];
    const [period, setPeriod] = useState("");

    const handleRadioBtnChange = (val) => {
      setPeriod(val);
    };

    return (
        <CollapseContainer header="Блоки Артема">
            <SearchString data={searchSamples}/>
            <Spliter/>
            <DropdownList options={dropdownSamples}/>
            <Spliter/>
            <Logo onClick={() => alert("Hello")}/>
            <Spliter/>
            <Logo full={true} onClick={() => alert("Hello")}/>
            <Spliter/>
            <Switch/>
            <Spliter/>
            <StarsBar input_mode={false} value={5}/>
            <Spliter/>
            <StarsBar/>
            <Spliter/>
            <ScrollingList>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
                <p>Text Text Text</p>
            </ScrollingList>
            <Spliter/>
            <RadioButtonGroup name='radio' selected={period} onChange={handleRadioBtnChange} options={radioButtonSamples}/>
            <Spliter/>
            <InputString required={true} label='Label' comment='Comment'/>
            <Spliter/>
            <InputPassword label='Password' required={true} comment='Comment'/>
            <Spliter/>
            <InputPhone label='Phone number' required={true} comment='Comment'/>
            <Spliter/>
            <InputText/>
            <Spliter/>
            <InputDate/>
            <Spliter/>
        </CollapseContainer>
    );
}