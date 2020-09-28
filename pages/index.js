import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Card, CardContent, CardHeader, CardHeaderTitle, Field} from "bloomer";


const initialState = {
    knowsSize: null,
    capsuleSize: null,
    ingredientType: null,
    density: null,
    user: null
}


const Container = styled.div`
    background-color:gainsboro;
    height: 100%;
`
const Main = styled.div`
    padding:25px;
    height:fit-content;
    width: 100%;
    margin: 0;
    position: absolute;
    top: 35%;
    -ms-transform: translateY(-35%);
    transform: translateY(-35%);
`
const Title = styled.h1`
    width:fit-content;
    margin:auto;
    margin-bottom:30px;
    text-align: center;
    font-size: 4vw;
    @media screen and (max-width: 650px){
        font-size: 10vw;
    }
`
const Wrapper = styled.div`
    width: fit-content;
    margin: auto;
    margin-left: ${props => props.ml ? props.ml : null};
    margin-right:${props => props.mr ? props.mr : null};
    display: flex;
`
const Btn = styled.button`
    background-color:${props => props.selected ? 'gold' : 'grey'};
    color:${props => props.selected ? 'black' : 'white'};
    border-radius: 50px;
    border: none;
    margin:auto;
    height: 5vw;
    width: 15vw;
    margin-left: ${props => props.ml ? props.ml : null};
    margin-right:${props => props.mr ? props.mr : null};
    @media screen and (max-width: 650px){
    height: 15vw;
    width: 45vw;
    font-size:4vw;
    outline: none;
    }
`
const Left = styled.div`
    float: left;
`
const Right = styled.div`
    float: right;
`

const Button = ({onClick, children, mr, ml, sel}) => {
    const [selected, setSelected] = useState(sel)
    const handleClick = () => {
        setSelected(true);
        setTimeout(() => onClick(), 500)
    }
    return (
        <Btn selected={selected} mr={mr} ml={ml} onClick={handleClick}>{children}</Btn>
    )
}

const Pagination = ({hook, step, hideLeft, hideRight}) => {
    return(
        <div style={{marginTop:100}}>
            {hideLeft?null:<Left onClick={()=>{hook(step-1)}}>
                Back
            </Left>}

            {hideRight?null:<Right onClick={()=>{hook(step)}}>
                Next
                </Right>}
        </div>
    )
}

function App() {

    const [start, useStart] = useState(false)
    return (
        <Container>
            <Main>
                {!start ? <Default hook={useStart}/> : <Start/>}
                <Pagination />
            </Main>
        </Container>
    );
}


function Default({hook}) {
    return (
        <>
            <Title>
                Let's find the right capsule size for you
            </Title>
            <Wrapper>
                <Button onClick={() => hook(true)}>
                    Get Started
                </Button>
            </Wrapper>

        </>
    )
}

class Start extends React.Component {
    constructor(props) {
        super(props)
        this.state = {step: 1, data: initialState}
        this.hook = this.hook.bind(this)
    }

    hook(step, data = null) {
        if (data) {
            this.setState({step: step + 1})
        } else {
            this.setState({step: step + 1, data: data})
        }
    }

    render() {
        const {step, data} = this.state
        const getComponent = (step) => {
            switch (step) {
                case 1:
                    return Step1;
                case 2:
                    return Step2;
                case 3:
                    return Step3;
                case 4:
                    return Step4;
                case 5:
                    return Step5;
            }
        }
        const Component = getComponent(step)
        return (
            <Component hook={this.hook} step={step} data={data}/>
        )
    }
}

function Step1({hook, step, data}) {
    const [ingredientType, setType] = useState(data.ingredientType)

    function handleClick() {
        hook(step)
    }

    useEffect(() => console.log(ingredientType))
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
            <Pagination hook={hook} hideLeft={true} hideRight={ingredientType?false:true} step={step}/>
        </>
    )
}

export default App