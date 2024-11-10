import { useEffect, useState } from "react";
import Button from "./Button";
import RadioButton from './RadioButton'
import './FilterDialogClient.css'

const FilterDialogClient = () => {
    const categories=[
        {
            name:'categorie 1',
            value:'c1',
            childCategories:[
                {
                    name:'categorie 21',
                    value:'c1_c1',
                    childCategories:[
                        {
                            name:'categorie 211',
                            value:'c1_c1_c21',
                            childCategories:[],
                        },
                        {
                            name:'categorie 212',
                            value:'c1_c1_c22',
                            childCategories:[],
                        },
                    ],
                },
                {
                    name:'categorie 22',
                    value:'c1_c2',
                    childCategories:[],
                },
            ],
        },
        
        {
            name:'categorie 2',
            value:'c2',
            childCategories:[
                {
                    name:'categorie 21',
                    value:'c2_c1',
                    childCategories:[],
                },
            ],
        },
        {
            name:'categorie 3',
            value:'c3',
            childCategories:[],
        },
    ]

    const radioGroupKey='main_group'
    const [radioValues,setRadioValues]=useState({});
    const radioValuesStatic={}

    const generateChildren=(categorie,isFatherGroup)=>{
        const baseClassName=''+'father-group'.repeat(+isFatherGroup);

        return (
            <li className={`${baseClassName} ${radioValues[radioGroupKey]==categorie.value?'checked':'unchecked'}`}>
                <RadioButton 
                    value={categorie.value} 
                    label={categorie.name} 
                    group={radioGroupKey} 
                    checked={radioValues[radioGroupKey]==categorie.value}
                    onChange={()=>setRadioValues(values=>({...values,[radioGroupKey]:categorie.value}))}
                />
                {categorie.childCategories.length!=0&&(
                    <ul>
                        {categorie.childCategories.map(
                            (subcategorie)=>generateChildren(subcategorie,false))
                        }
                    </ul>
                )}
            </li>
        )
    }

    useEffect(()=>{
        setRadioValues(radioValuesStatic);
    },[])

    return ( 
        <div className="filter-dialog">
            <div className="filter-dialog__category-tree">
                <ul>
                    {categories.map((categorie)=>generateChildren(categorie,true))}
                </ul>
            </div>
            <Button onClick={()=>alert('')}>OK</Button>
        </div>
    );
}
 
export default FilterDialogClient;