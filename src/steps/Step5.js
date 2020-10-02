import {useState} from 'react'
import {
    Title,
    T1,
    Pagination,
    Subtitle,
    textSelected,
    textNotSelected,
    Btn,
    InputWrapper,
    bottomOffset,
    primaryCol
} from '../styled'
import styled from 'styled-components'
import D1 from '../../public/svgs/density1.svg'
import D2 from '../../public/svgs/density2.svg'
import D3 from '../../public/svgs/density3.svg'
import D4 from '../../public/svgs/density4.svg'

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


const Tl = styled(T1)`
    color:${props=>props.col2?textSelected:textNotSelected}
    width:fit-content;
    margin:${props=>props.m?'0':'auto'};
    margin-bottom:30px;
    text-align: center;
    font-size: 2.7vw;
    @media screen and (max-width: 650px){
        width: 100% !important;
        font-size: 4vw;
    }
`

const Wrapper = styled.div`
    width: fit-content;
    margin: auto;
    margin-left: ${props => props.ml ? props.ml : null};
    margin-right:${props => props.mr ? props.mr : null};
    display: flex;
    flex-wrap: wrap;
    @media screen and (max-width: 650px){
        div{margin:auto !important;padding:5px;}
        .wrap{margin-top:0px!important}
    }
`

export default function Step5({hook, step, data, units}) {
    const [density, setDensity] = useState(data.density)
    const [selected, setSelected] = useState(null)
    data.density=density
    const {ingredientType, measurementUnit} = data
    const values = [[0.6,'Light'],[ 0.8, 'Normal'],[ 1.0, 'Dense'], [1.2,'Fine']]
    const comps = [D1, D2, D3, D4]
    const getComp = (val) => {
        return (comps[val])
    }
    var usedUnits = []
    var type
    if (ingredientType == 'liquid') {
        hook(step,data)
        usedUnits = units.volume;
        type = "Volume"
    } else {
        usedUnits = units.mass;
        type = "Mass"
    }
    const handleQuantity = (e) => {
        e.preventDefault()
        const quantity = e.target.value
        if (quantity && parseFloat(quantity) >= 0) {
            if (parseFloat(quantity)) setQuantity(parseFloat(quantity))
        } else {
            setQuantity(null)
        }
    }
    var unitname=usedUnits.map(unit=>{if(unit.value==measurementUnit) return unit.name})
    const handleSelect = (value) => {
        setSelected(values.indexOf(value))
        setDensity(value[0])
    }
    const handleDensity = (e) => {
        e.preventDefault()
        setSelected(null)
        const density = e.target.value
        if(density && parseFloat(density)>0) {
            if (parseFloat(density)) setDensity(parseFloat(density))
        } else {
            if(parseFloat(density)==0)setDensity(0);
            else setDensity(null);
        }
    }

    return (
        <>
            <Subtitle>
                {type} Measurements
            </Subtitle>
            <Title>
                Choose or enter your density (g/ml)
            </Title>
            <Wrapper style={{marginLeft: '0 !important'}}>
                <div style={{width: '100%!important', margin:'0 !important'}} className={'wrap'}>
                    <div style={{display:'inline-flex', width:'100% !important'}}>
                        <Tl style={{textAlign:'inherit'}}>Your previous selection:</Tl>
                        <Tl style={{color:textNotSelected}} className={"a"}>
                            • {unitname}
                        </Tl>
                    </div>
                    <div style={{display:'block', width:'100% !important'}} className={'z'}>
                        <Tl style={{float:'left', textAlign:'justify', margin:'0 !important'}}>Determine density</Tl>
                        <div className={'c'}>
                            {values.map(value => {
                                    const Comp = getComp(values.indexOf(value))
                                    return(<div onClick={()=>handleSelect(value)} className={'b'}><Comp className={selected==values.indexOf(value)?'plm svg':'svg'}/>{value[1]}</div>)

                            })}
                        </div>
                    </div>
                    <div className={'e'}>
                        <Tl m={true}>Input your own density</Tl><InputWrapper value={density} onChange={(e) => handleDensity(e)} style={{marginLeft:30}} type={"number"}></InputWrapper>
                    </div>


                </div>

            </Wrapper>

            <Pagination step={step} hook={hook} data={data} disableRight={density ? false : true}/>
            <style>
                {".wrap{margin-top:0px!important}"}
            </style>
            <style>{"input::-webkit-outer-spin-button,\n" +
            "input::-webkit-inner-spin-button {\n" +
            "  -webkit-appearance: none;\n" +
            "  margin: 0;\n" +
            "}input[type=number] {\n" +
            "  -moz-appearance: textfield;\n" + "}" +
            "input{margin-top:-30px}"+"@media screen and (max-width:650px){.c{float:unset !important;}input{margin-top:-15px!important}.a{margin-top:15px!important}}" +
            ".a{margin-left:30px!important}.svg{max-width:75px;max-height:75px}.b{display: inline-grid;\n" +
            "text-align: center;margin-left:5px;margin-right:5px}" +
            ".c{display:flex; float:right; margin-top:-9px;}" +
            ".e{\n" +
            "    margin-top: 50px !important;\n" +
            "    display: inline-flex;\n" +
            "}.z{margin-top:15px;} h1{margin-bottom:5px!important}"}
                {".plm g{fill:white !important}.plm path{fill:"+primaryCol+" !important}" +
                "" +
                "@media screen and (max-width:650px){" +
                "#MAIN{" +
                "    height: 105%;\n" +
                "    width: fit-content;" +
                "}" +
                "}"}
            </style>
        </>
    )
}