import {useState} from 'react'
import {Title, Wrapper, T1, Pagination, Subtitle, textSelected, textNotSelected} from '../styled'
import styled from 'styled-components'

const Li= styled(T1)`
    font-size:2em;
    font-weight: 900;
    color:${props=>props.selected?textSelected:textNotSelected};
    @media screen and (max-width: 650px){
        font-size: 1.5em !important;
    }
`

export default function Step3({hook, step, data}) {
    const [unit, setUnit] = useState(data.measurementUnit)
    data.measurementUnit = unit
    const {ingredientType} = data
    const units = {
        volume: [
            {name: 'Tea Spoon (TS)', value: 'ts'},
            {name: 'Table Spoon (TBS)', value: 'tbs'},
            {name: 'Mililiter (mL)', value: 'ml'},
            {name: 'Cubic Centimeter (CC)', value: 'cc'},
            // {name: '1/8 Cup', value: '1/8 cup'},
            // {name: '1/4 Cup', value: '1/4 cup'},
            // {name: '1/2 Cup', value: '1/2 cup'},
            // {name: '1 Cup', value: '1 cup'}
        ],
        mass: [
            {name: 'Miligrams (mg)', value: 'mg'},
            {name: 'Micrograms (mcg)', value: 'mcg'},
            {name: 'Grams (g)', value: 'g'},
            {name: 'Kilograms (kg)', value: 'kg'},
            {name: 'Pounds (lb)', value: 'lb'},
            {name: 'Ounces (oz)', value:'oz'}
        ]
    }
    var usedUnits = []
    if(ingredientType=='liquid') usedUnits=units.volume;
    else usedUnits=units.mass;
    console.log(usedUnits)
    return (
        <>
            <Subtitle>
                Measurements
            </Subtitle>
            <Title>
                Select your unit of measurement
            </Title>
            <Wrapper>
                <ul>
                    {usedUnits.map(unititem =>
                        <li key={unititem.value} onClick={()=>setUnit(unititem.value)}><Li selected={unititem.value==unit?true:false}><a style={{color:'inherit'} }>• {unititem.name}</a></Li></li>
                    )}
                </ul>
            </Wrapper>
            <style>
                {".a g{fill:white !important}.a path{fill:"+textNotSelected+" !important}"}
            </style>
            <Pagination step={step} hook={hook} data={data} disableRight={unit ? false : true}/>
        </>
    )
}