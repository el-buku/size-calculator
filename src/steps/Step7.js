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
    bottomOffset
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
    font-size:2vw;
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
    margin-bottom:10px;
    text-align: justify;
    font-size: 2.3vw;
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
    height:8vw;
    width:100%;
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
                    {ingredientType=='liquid'?<Liquid className={'a'} style={{maxWidth:'22vw', paddingTop:20}}/>:<Powder className={'a'} style={{maxWidth:'22vw', paddingTop:20}}/>}
                </div>
                <div className={'b'} style={{width:'fit-content', paddingLeft:20, paddingTop:20,paddingRight:20, margin:'auto'}}>
                    <Tl>
                        Recommended Capsule Size : {capsuleSize}
                    </Tl>
                    <Tl>
                        Recommended Capsule Types : {types}
                    </Tl>
                    <Button selected={true}>SHOP SIZE {capsuleSize}</Button>
                    <Bottom>Need size {capsuleSize} in bulk? <br/> Size {capsuleSize} Articles & Blog</Bottom>

                </div>

            </Wrapper>
            <Pagination step={step} hook={hook} data={data} hideRight={true}/>
            <style>
                {".wrap{margin-top:0px!important}input{width:100%!important;padding-right:20vw !important;font-size:3vw !important}.a{margin:auto}" +
                "@media screen and (max-width:650px){input{padding-right:28vw !important}.a{max-width:44vw!important}#MAIN{padding-top:15px !important}}"}
            </style>

        </>
    )
}