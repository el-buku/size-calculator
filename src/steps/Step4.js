import {useState} from 'react'
import {
    Main,
    Title,
    Wrapper,
    T1,
    Pagination,
    Subtitle,
    textSelected,
    textNotSelected,
    Btn,
    InputWrapper,
    bottomOffset,
    hoverColor,
} from '../styled'
import {getQtyMl, getMlToQty, getQtyToG} from '../'
import styled from 'styled-components'


const Li = styled(T1)`
    &:hover{
        color: ${props => props.selected ? textSelected : hoverColor}
    }
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

const red = '#f5424e'

export default function Step4({hook, step, data, units, sizes}) {
    const [quantity, setQuantity] = useState(data.quantity)
    const [measurementUnit, setUnit] = useState(data.measurementUnit)
    const [check, setCheck] = useState(false)
    data.measurementUnit = measurementUnit
    data.quantity = quantity
    const {ingredientType, user} = data
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
        var quantity = e.target.value
        if (parseFloat(quantity) >= 0) {
                var siz = sizes
                var mls, gs
                if (user == 'children') {
                    siz = sizes.slice(-5)
                } else if (user == 'elderly') {
                    siz = sizes.slice(-6)
                }
                console.log(sizes)
                const maxml = siz[0][1]
                if (ingredientType == 'liquid') {
                    mls = getQtyMl(parseFloat(quantity), measurementUnit)
                    if (mls <= maxml * 0.8){
                        setQuantity(parseFloat(quantity))
                        setCheck(false)}
                    else {
                        quantity = getMlToQty(maxml * 0.8, measurementUnit)
                        setCheck(true)
                        setQuantity(parseFloat(quantity.toFixed(3)))
                    }
                } else {
                    gs = getQtyToG(quantity, measurementUnit)
                    mls = gs * data.density
                    if (mls <= maxml * 0.8){
                        setQuantity(parseFloat(quantity))
                        setCheck(false)}
                    else {
                        quantity = maxml*0.8*data.density
                        switch (measurementUnit){
                            case 'mcg':
                                quantity=quantity*1000000
                                break
                            case 'mg':
                                quantity=quantity*1000
                        }
                        setCheck(true)
                        setQuantity(parseFloat(quantity.toFixed(3)))
                    }
                }

            }
        else {
            setQuantity(0)
        }
    }
    return (
        <>
            <Main id={"MAIN"}>

            <Subtitle>
                {type} Measurements
            </Subtitle>
            <Title>
                Enter your {type.toLowerCase()} quantity for one capsule
            </Title>
            <Wrapper>
                <div style={{width: 'fit-content', marginRight: 20}} className={'wrap'}>
                    <InputWrapper value={quantity} onChange={(e) => handleQuantity(e)} type={"number"}/>
                    {check?<><style>{`input{border: solid 0.05em ${red}!important}`}</style>
                        <T1 style={{margin:'auto', textAlign:'center', marginTop:'10px', color:red}}>Value is over the capsule limit</T1></>:null}
                </div>
                <div style={{width: 'fit-content', marginLeft: 20}}>
                    <Btn selected={true}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                    </Btn>
                    <ul style={{marginTop: 20, padding:0}}>
                        {usedUnits.map(unititem =>
                            <li key={unititem.value} onClick={()=>setUnit(unititem.value)}><Li selected={unititem.value == measurementUnit ? true : false}><a
                                style={{color: 'inherit'}}>• {unititem.name}</a></Li></li>
                        )}
                    </ul>
                </div>

            </Wrapper>
            </Main>
            <Bottom>{quantity ? quantity : 0} {measurementUnit} per capsule</Bottom>

            <Pagination step={step} hook={hook} data={data} disableRight={quantity ? false : true}/>
            <style>
                {".wrap{margin-top:0px!important}" +
                ".pagination{}"}
            </style>
            <style>{"input::-webkit-outer-spin-button,\n" +
            "input::-webkit-inner-spin-button {\n" +
            "  -webkit-appearance: none;\n" +
            "  margin: 0;\n" +
            "}input[type=number] {\n height:7vw;" +
            "  -moz-appearance: textfield;\n" + "}" +
            "@media screen and (max-width: 650px){input[type=number]{height:12vw}}"}</style>
        </>
    )
}