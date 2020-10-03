import styled, {keyframes} from 'styled-components'
import {useState} from 'react'
import ArrowLeft from '../public/svgs/arrowleft.svg'
import ArrowRight from '../public/svgs/arrowright.svg'


const font1 = 'nunito'
const font2 = 'nunito'
const bgCol = '#f2f2f2ff'
const primaryCol = '#f8d858ff'
const secondaryCol = '#d4d4d4ff'
const textSelected = '#2c2825ff'
const textNotSelected = '#d4d4d4ff'
const bottomOffset = '15px'

const getSelected = keyframes`
    from {background-color: ${secondaryCol};}
    to {background-color:${props=>props.theme.main};}
`

const Container = styled.div`
    background-color:${bgCol};
`
const Main = styled.div`
    background-color:${bgCol};
    padding:25px;
    height:100%;
    width: 100%;
    margin: 0;
    position: absolute;
    top:35%;
    padding-top: 80px;
    -ms-transform: translateY(-35%);
    transform: translateY(-35%);
    @media screen and (min-width:650px){
        padding-bottom:30px
    }
`

const T1 = styled.h1`
    font-family: ${font1};
    font-weight: 900;
`
const T2 = styled.h1`
    font-family: ${font2};
    font-weight: 200;
`

const Title = styled(T1)`
    color:${props=>props.col2?textSelected:textNotSelected}
    width:fit-content;
    margin:auto;
    margin-bottom:30px;
    text-align: center;
    font-size: 4vw;
    @media screen and (max-width: 650px){
        font-size: 10vw;
    }
`

const Subtitle = styled(T2)`
    text-transform: uppercase;
    width:fit-content;
    margin:auto;
    margin-bottom:-5px;
    text-align: center;
    font-size: 2.3vw;
    @media screen and (max-width: 650px){
        font-size: 5vw;
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
        div{margin:auto !important;padding:5px; width:50% !important}
        .wrap{margin-top:0px!important}
    }
`

const InputWrapper = styled.input`
    background-color: white;
    font-family: ${font1};
    font-size: 2vw;
    height: 10vw;
    width: 20vw;
    outline: none;
    border-radius: 10vw;
    border:none;
    padding: 30px;
    @media screen and (max-width: 650px){
    padding: 10px;
    height: 12vw;
    width: 30vw;
    font-size:4vw;
    }
`

const Btn = styled.button`
    font-family: ${font1};
    font-weight: 900;
    font-size:2.5vw;
    background-color:${props => props.selected ? props=>props.theme.main : secondaryCol};
    animation:${props => props.selected ? getSelected : null} 0.3s;
    color: white;
    border-radius: 10vw;
    border: none;
    margin:auto;
    height: 10vw;
    width: 20vw;
    margin-left: ${props => props.ml ? props.ml : null};
    margin-right:${props => props.mr ? props.mr : null};
    outline: none;
    @media screen and (max-width: 650px){
    height: 12vw;
    width: 30vw;
    font-size:4vw;
    }
`
const Left = styled.div`
    position:absolute;
    bottom:${bottomOffset};
    float: left;
`
const Right = styled.div`
    float: right;
    position:absolute;
    bottom:${bottomOffset};
    right: 25px;
    pointer-events: ${props => props.disabled ? 'none' : ''}
`
const StartButton = ({onClick, children, mr, ml, sel}) => {
    const [selected, setSelected] = useState(sel)
    const handleClick = () => {
        setSelected(true);
        setTimeout(() => onClick(), 300)
    }
    return (
        <Btn selected={selected} mr={mr} ml={ml} onClick={handleClick}>{children}</Btn>
    )
}

const Textspan = styled.span`
    font-family: ${font2};
    font-weight: 200;
    position: absolute;
    bottom: 17.5px;
`

const Pagination = ({hook, hideLeft, disableRight, step, data, mTop = 20, hideRight}) => {
    return (
        <div className={'pagination'} style={{marginTop: mTop}}>
            {hideLeft ? null : <Left onClick={() => {
                hook(step - 2)
            }}>
                <ArrowLeft style={{scale: 0.5}}/>
                <Textspan style={{marginLeft: 5}}>
                    BACK
                </Textspan>
            </Left>}
            {hideRight? null : <Right onClick={() => {
                hook(step, data)
            }} disabled={disableRight}>
                <Textspan style={{right: 100}}>
                    NEXT
                </Textspan>
                <ArrowRight style={{scale: 0.5}}/>
            </Right>}

        </div>
    )
}


export {
    Container,
    Main,
    T1,
    T2,
    Title,
    Subtitle,
    Wrapper,
    Btn,
    Left,
    Right,
    StartButton,
    Pagination,
    textSelected,
    textNotSelected,
    InputWrapper,
    bottomOffset,
    primaryCol, bgCol
}