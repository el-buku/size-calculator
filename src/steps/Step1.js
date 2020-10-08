import {useState} from 'react'
import {Main, Title, Wrapper, Btn, Pagination, textNotSelected} from '../styled'
import Liquid from '../../public/svgs/liquidcaps.svg'
import Powder from '../../public/svgs/powdercaps.svg'

export default function Step1({hook, step, data, sizes}) {
    const [ingredientType, setType] = useState(data.ingredientType)
    data.ingredientType = ingredientType
    console.log(data)
    data.sizes=sizes
    return (
        <>
            <Main id={"MAIN"}>

            <Title>
                What would you like to encapsulate?
            </Title>
            <Wrapper>
                <div style={{width: 'fit-content', marginRight: 20, position:'relative'}}>
                    <Btn onClick={() => {setType('liquid');setTimeout(()=>{data.ingredientType= 'liquid';data.sizes=sizes.slice(1);hook(step, data)}, 500)}} selected={ingredientType == 'liquid' ? true : false}>
                        Liquid
                    </Btn>
                    <Liquid style={{position:'absolute', transform:'scale(0.6)', top: '6vw', right:'0.5vw', maxWidth:'22vw'}} className={ingredientType == 'liquid' ? 'a' : 'plm a'}/>
                </div>
                <div style={{width: 'fit-content', marginLeft: 20, position:'relative'}}>
                    <Btn onClick={() => {setType('powder');setTimeout(()=>{data.ingredientType= 'powder';hook(step, data)}, 500)}} selected={ingredientType == 'powder' ? true : false}>
                        Powder
                    </Btn>
                    <Powder style={{position:'absolute', transform:'scale(0.6)', top: '5vw', right:'0.5vw', maxWidth:'22vw'}} className={ingredientType == 'powder' ? 'a' : 'plm a'}/>
                </div>
            </Wrapper>
            <Pagination mTop={100} step={step} hook={hook} hideLeft={true} data={data}
                        hideRight={true}/>
            <style>
                {".plm g{fill:white !important}.plm path{fill:"+textNotSelected+" !important}"}
                {"@media screen and (max-width:650px){" +
                ".a{display:none!important}" +
                "}" +
                "#MAIN{" +
                "top:40%}"}
            </style>
            </Main>
        </>
    )
}
