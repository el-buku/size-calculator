import {useState} from 'react'
import {Main,Title, Wrapper, T1, Pagination, Subtitle, textSelected, textNotSelected, hoverColor} from '../styled'
import styled from 'styled-components'

const Li= styled(T1)`
    &:hover{
        color: ${props => props.selected ? textSelected : hoverColor}
    }
    font-size:2em;
    font-weight: 900;
    color:${props=>props.selected?textSelected:textNotSelected};
    @media screen and (max-width: 650px){
        font-size: 1.5em !important;
    }
`

export default function Step3({hook, step, data, units}) {
    const [unit, setUnit] = useState(data.measurementUnit)
    data.measurementUnit = unit
    const {ingredientType} = data
    var usedUnits = []
    if(ingredientType=='liquid') usedUnits=units.volume;
    else usedUnits=units.mass;
    console.log(usedUnits)
    return (
        <>
            <Main id={"MAIN"}>

            <Subtitle>
                Measurements
            </Subtitle>
            <Title>
                Select your unit of measurement
            </Title>
            <Wrapper>
                <ul>
                    {usedUnits.map(unititem =>
                        <li key={unititem.value} onClick={()=>{setUnit(unititem.value); setTimeout(()=>{data.measurementUnit=unititem.value;hook(step, data)}, 500)}}><Li selected={unititem.value==unit?true:false}><a style={{color:'inherit'} }>• {unititem.name}</a></Li></li>
                    )}
                </ul>
            </Wrapper>
            <style>
                {".a g{fill:white !important}.a path{fill:"+textNotSelected+" !important}"}
            </style>
            </Main>
            <Pagination step={step} hook={hook} data={data} hideRight={true}/>
        </>
    )
}