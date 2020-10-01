import {useState} from 'react'
import {Title, Wrapper, Btn, Pagination, textNotSelected} from '../styled'
import Liquid from '../../public/svgs/liquidcaps.svg'
import Powder from '../../public/svgs/powdercaps.svg'

export default function Step1({hook, step, data}) {
    const [ingredientType, setType] = useState(data.ingredientType)
    data.ingredientType = ingredientType
    return (
        <>
            <Title>
                What would you like to encapsulate?
            </Title>
            <Wrapper>
                <div style={{width: 'fit-content', marginRight: 20, position:'relative'}}>
                    <Btn onClick={() => setType('liquid')} selected={ingredientType == 'liquid' ? true : false}>
                        Liquid
                    </Btn>
                    <Liquid style={{position:'absolute', transform:'scale(0.8)', top: '11vw', right:'0vw', maxWidth:'22vw'}} className={ingredientType == 'liquid' ? 'a' : 'plm a'}/>
                </div>
                <div style={{width: 'fit-content', marginLeft: 20, position:'relative'}}>
                    <Btn onClick={() => setType('powder')} selected={ingredientType == 'powder' ? true : false}>
                        Powder
                    </Btn>
                    <Powder style={{position:'absolute', transform:'scale(0.8)', top: '10vw', right:'0vw', maxWidth:'22vw'}} className={ingredientType == 'powder' ? 'a' : 'plm a'}/>
                </div>
            </Wrapper>
            <Pagination mTop={100} step={step} hook={hook} hideLeft={true} data={data}
                        disableRight={ingredientType ? false : true}/>
            <style>
                {".plm g{fill:white !important}.plm path{fill:"+textNotSelected+" !important}"}
                {"@media screen and (max-width:650px){" +
                ".a{display:none!important}" +
                "}"}
            </style>
        </>
    )
}
