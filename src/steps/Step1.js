import {useState} from 'react'
import {Title, Wrapper, Btn, Pagination} from '../styled'

export default function Step1({hook, step, data}) {
    const [ingredientType, setType] = useState(data.ingredientType)
    data.ingredientType = ingredientType
    return (
        <>
            <Title>
                What would you like to encapsulate?
            </Title>
            <Wrapper>
                <div style={{width: 'fit-content', marginRight: 20}}>
                    <Btn onClick={() => setType('liquid')} selected={ingredientType == 'liquid' ? true : false}>
                        Liquid
                    </Btn>
                </div>
                <div style={{width: 'fit-content', marginLeft: 20}}>
                    <Btn onClick={() => setType('powder')} selected={ingredientType == 'powder' ? true : false}>
                        Powder
                    </Btn>
                </div>
            </Wrapper>
            <Pagination mTop={100} step={step} hook={hook} hideLeft={true} data={data}
                        disableRight={ingredientType ? false : true}/>
        </>
    )
}
