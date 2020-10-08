import {useState} from 'react'
import {
    Main,
    Title,
    T1,
    Pagination,
    Subtitle,
    textSelected,
    textNotSelected,
    Btn,
    InputWrapper,
    bottomOffset
} from '../styled'
import styled from 'styled-components'


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

const InnerWrapper = styled.div`
    position: relative;
    width: 60vw;
    input {
        width:100%;
        height:7vw;
        padding-right: 35%;
    }
    @media screen and (max-width: 650px){
        width: 80vw;
        input {
            padding-right: 28.5vw;
        }
    }
`

export default function Step0({hook, step, data}){
    const [name, setName] = useState('')
    const [selected, setSelected] = useState(false)
    data.name=name
    const handleChange = (e) => {
        e.preventDefault()
        const name = e.target.value
        setName(name)
    }
    const handleClick = () => {
        setSelected(true)
        setTimeout(()=>{
            hook(step,data)
        }, 500)
    }
    return(<>
        <Main id={"MAIN"}>
        <Title>
            What is your name?
        </Title>
        <Wrapper style={{marginLeft: '0 !important'}}>
            <InnerWrapper>
                <InputWrapper type={'text'} value={name ? name : ''} onChange={(e) => handleChange(e)}/><Btn
                selected={selected} onClick={() => handleClick()} style={{position: 'absolute', right: 0}}>Next</Btn>
            </InnerWrapper>

        </Wrapper>

        {/*<Pagination step={step - 1} hook={hook} data={data} hideRight={true}/>*/}
        {/*<style>*/}
        {/*    {".wrap{margin-top:0px!important}input{width:100%!important;padding-right:20vw !important;font-size:3vw !important}" +*/}
        {/*    "@media screen and (max-width:650px){input{padding-right:28vw !important}}"}*/}
        {/*</style>*/}
        </Main>

    </>)
}