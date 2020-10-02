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
import Liquid from '../../public/svgs/liquidcaps.svg'
import Powder from '../../public/svgs/powdercaps.svg'


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
    text-align: justify;
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

const Button = styled(Btn)`
    height:12vw;
    width:24vw;
`

export default function Step7({hook, step, data, sizes}) {
    const {capsuleSize, types, ingredientType} = data
    return (
        <>
            <Subtitle>
                Recommended
            </Subtitle>
            <Title>
                YOUR RESULTS
            </Title>
            <Wrapper>
                <div>
                    {ingredientType=='liquid'?<Liquid style={{maxWidth:'22vw'}}/>:<Powder  style={{maxWidth:'22vw'}}/>}
                </div>
                <div style={{width:'fit-content', marginLeft:15}}>
                    <Tl>
                        Recommended Capsule Size : {capsuleSize}
                    </Tl>
                    <Tl>
                        Recommended Capsule Types : {types}
                    </Tl>
                    <Button selected={true}>SHOP SIZE {capsuleSize}</Button>

                </div>
            </Wrapper>
            <Bottom>Need size {capsuleSize} in bulk?<br/>Size {capsuleSize} Articles & Blog</Bottom>
            <Pagination step={step} hook={hook} data={data} hideRight={true}/>
            <style>
                {".wrap{margin-top:0px!important}input{width:100%!important;padding-right:20vw !important;font-size:3vw !important}" +
                "@media screen and (max-width:650px){input{padding-right:28vw !important}}"}
            </style>

        </>
    )
}