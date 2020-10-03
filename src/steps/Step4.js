import {useState} from 'react'
import {
    Title,
    Wrapper,
    T1,
    Pagination,
    Subtitle,
    textSelected,
    textNotSelected,
    Btn,
    InputWrapper,
    bottomOffset
} from '../styled'
import {getQtyMl, getMlToQty, getQtyToG} from '../'
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

export default function Step4({hook, step, data, units, sizes}) {
    const [quantity, setQuantity] = useState(data.quantity)
    data.quantity = quantity
    const {ingredientType, measurementUnit, user} = data
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
        var quantity = e.target.value
        if (quantity && parseFloat(quantity) >= 0) {
            if (parseFloat(quantity)) {
                var siz = sizes
                var mls, gs
                if (user == 'children') {
                    siz = sizes.slice(-5)
                } else if (user == 'elderly') {
                    siz = sizes.slice(-6)
                }
                const maxml = siz[0][1]
                if (ingredientType == 'liquid') {
                    mls = getQtyMl(parseFloat(quantity), measurementUnit)
                    if (mls <= maxml * 0.8)
                        setQuantity(parseFloat(quantity))
                    else {
                        quantity = getMlToQty(maxml * 0.8, measurementUnit)
                        setQuantity(parseFloat(quantity.toFixed(3)))
                    }
                } else {
                    gs = getQtyToG(quantity, measurementUnit)
                    mls = gs * data.density
                    if (mls <= maxml * 0.8)
                        setQuantity(parseFloat(quantity))
                    else {
                        quantity = maxml*0.8*data.density
                        switch (measurementUnit){
                            case 'mcg':
                                quantity=quantity*1000000
                                break
                            case 'mg':
                                quantity=quantity*1000
                        }
                        setQuantity(parseFloat(quantity.toFixed(3)))
                    }
                }

            }
        } else {
            setQuantity('')
        }
    }
    return (
        <>
            <Subtitle>
                {type} Measurements
            </Subtitle>
            <Title>
                Enter your {type.toLowerCase()} quantity for one capsule
            </Title>
            <Wrapper>
                <div style={{width: 'fit-content', marginRight: 20}} className={'wrap'}>
                    <InputWrapper value={quantity} onChange={(e) => handleQuantity(e)} type={"number"}/>
                </div>
                <div style={{width: 'fit-content', marginLeft: 20}}>
                    <Btn selected={true}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Btn>
                    <ul style={{marginTop: 20, padding:0}}>
                        {usedUnits.map(unititem =>
                            <li key={unititem.value}><Li selected={unititem.value == measurementUnit ? true : false}><a
                                style={{color: 'inherit'}}>• {unititem.name}</a></Li></li>
                        )}
                    </ul>
                </div>

            </Wrapper>
            <Bottom>{quantity ? quantity : 0} {measurementUnit} per capsule</Bottom>

            <Pagination step={step} hook={hook} data={data} disableRight={quantity ? false : true}/>
            <style>
                {".wrap{margin-top:0px!important}"}
            </style>
            <style>{"input::-webkit-outer-spin-button,\n" +
            "input::-webkit-inner-spin-button {\n" +
            "  -webkit-appearance: none;\n" +
            "  margin: 0;\n" +
            "}input[type=number] {\n" +
            "  -moz-appearance: textfield;\n" + "}" +
            ""}</style>
        </>
    )
}