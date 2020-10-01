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
    text-align: center;
    line-height: 3vw;
    font-weight: 900;
    color:${textNotSelected};
    width:44vw;
    margin:auto;
    margin-top:20px;
    @media screen and (max-width: 650px){
        display:none;
    }
`


const Tl = styled(T1)`
    color:${props => props.col2 ? textSelected : textNotSelected}
    width:fit-content;
    margin:${props => props.m ? '0' : 'auto'};
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

const InnerWrapper = styled.div`
    position: relative;
    width: 60vw;
    @media screen and (max-width: 650px){
        width: 80vw;
    }
`

export default function Step5({hook, step, data}) {
    const [email, setEmail] = useState(data.email)
    const [err, setErr] = useState(false)
    const [selected, setSelected] = useState(false)
    data.email = email
    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const handleChange = (e) =>{
        e.preventDefault()
        const email = e.target.value
        console.log(email)
        setEmail(e.target.value)
    }
    const handleClick = ()=>{
        setSelected(true)
        setTimeout(()=>{
            if(validateEmail(email)){
                hook(step, data)
            }
            else {
                setSelected(false);
                setErr(true);
            }
        }, 500)
    }
    return (
        <>
            <Subtitle>
                Your results are ready!
            </Subtitle>
            <Title>
                Enter your email address
            </Title>
            <Wrapper style={{marginLeft: '0 !important'}}>
                <InnerWrapper>
                    <InputWrapper type={'text'} value={email?email:''} onChange={(e)=>handleChange(e)} /><Btn selected={selected} onClick={()=>handleClick()} style={{position:'absolute', right:0}}>Get Results</Btn>
                </InnerWrapper>

            </Wrapper>                <Bottom>{err?'Please use a valid email address':'Check your email for your results as well as a promo code for your next purchase!'}</Bottom>

            <Pagination step={step} hook={hook} data={data} hideRight={true}/>
            <style>
                {".wrap{margin-top:0px!important}input{width:100%!important;padding-right:20vw !important;font-size:3vw !important}" +
                "@media screen and (max-width:650px){input{padding-right:28vw !important}}"}
            </style>

        </>
    )
}