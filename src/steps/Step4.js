import {useState} from 'react'
import {Title, Wrapper, T1, Pagination, Subtitle, textSelected, textNotSelected, Btn, InputWrapper, bottomOffset} from '../styled'
import styled from 'styled-components'

const Li = styled(T1)`
    color:${props => props.selected ? textSelected : textNotSelected};
    font-size: 1.5vw;
    @media screen and (max-width: 650px){
        font-size: 4vw;
    }
`
const Bottom = styled(T1)`
    font-size:2em;
    font-weight: 900;
    color:${textNotSelected};
    position:absolute;
    left:50%;
    bottom: ${bottomOffset};
    margin-left:20px;
    @media screen and (max-width: 650px){
        display:none;
    }
`

export default function Step4({hook, step, data}) {
    const [quantity, setQuantity] = useState(data.quantity)
    data.quantity=quantity
    const {ingredientType, measurementUnit} = data
    const units = {
        volume: [
            {name: 'Tea Spoon (TS)', value: 'ts'},
            {name: 'Table Spoon (TBS)', value: 'tbs'},
            {name: 'Mililiter (mL)', value: 'ml'},
            {name: 'Cubic Centimeter (CC)', value: 'cc'},
            {name: '1/8 Cup', value: '1/8 cup'},
            {name: '1/4 Cup', value: '1/4 cup'},
            {name: '1/2 Cup', value: '1/2 cup'},
            {name: '1 Cup', value: '1 cup'}
        ],
        mass: [
            {name: 'Miligrams (mg)', value: 'mg'},
            {name: 'Micrograms (mcg)', value: 'mcg'},
            {name: 'Grams (g)', value: 'g'},
            {name: 'Kilograms (kg)', value: 'kg'},
            {name: 'Pounds (lb)', value: 'lb'},
            {name: 'Ounces (oz)', value: 'oz'}
        ]
    }
    var usedUnits = []
    var type
    if (ingredientType == 'liquid') {
        usedUnits = units.volume;
        type = "Volume"
    } else {
        usedUnits = units.mass;
        type = "Mass"
    }
    const handleQuantity = (e) => {
        e.preventDefault()
        const quantity = e.target.value
        if(quantity && parseFloat(quantity)>=0) {
            if (parseFloat(quantity)) setQuantity(parseFloat(quantity))
        } else {
            setQuantity(null)
        }
    }
    return (
        <>
            <Subtitle>
                {type} Measurements
            </Subtitle>
            <Title>
                Enter your {type.toLowerCase()} quantity
            </Title>
            <Wrapper>
                <div style={{width: 'fit-content', marginRight: 20}} className={'wrap'}>
                    <InputWrapper value={quantity} onChange={(e) => handleQuantity(e)} type={"number"}/>
                </div>
                <div style={{width: 'fit-content', marginLeft: 20}}>
                    <Btn selected={true}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Btn>
                    <ul style={{marginTop:20}}>
                        {usedUnits.map(unititem =>
                            <li key={unititem.value}><Li selected={unititem.value == measurementUnit ? true : false}><a
                                style={{color: 'inherit'}}>• {unititem.name}</a></Li></li>
                        )}
                    </ul>
                </div>

            </Wrapper>
            <Bottom>{quantity?quantity:0} {measurementUnit} per serving size</Bottom>

            <Pagination step={step} hook={hook} data={data} disableRight={quantity ? false : true}/>
            <style>
                {".wrap{margin-top:0px!important}"}
            </style>
            <style>{"input::-webkit-outer-spin-button,\n" +
            "input::-webkit-inner-spin-button {\n" +
            "  -webkit-appearance: none;\n" +
            "  margin: 0;\n" +
            "}input[type=number] {\n" +
            "  -moz-appearance: textfield;\n" + "}"}</style>
        </>
    )
}