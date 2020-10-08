import React, {useEffect, useState} from 'react';
import {
    Container,
    Main,
    Title,
    Wrapper,
    StartButton, bgCol
} from "../src/styled";
import Step0 from "../src/steps/Step0"
import Step1 from "../src/steps/Step1"
import Step2 from "../src/steps/Step2"
import Step3 from "../src/steps/Step3"
import Step4 from "../src/steps/Step4"
import Step5 from "../src/steps/Step5"
import Step6 from "../src/steps/Step6"
import Step7 from "../src/steps/Step7"

const initialState = {
    name:null,
    capsuleSize: null,
    ingredientType: null,
    density: 1,
    user: null,
    measurementUnit: null,
    quantity: null,
    email: null,
    types:[]
}


const units = {
    volume: [
        {name: 'Tea Spoon (TS)', value: 'ts'},
        {name: 'Table Spoon (TBS)', value: 'tbs'},
        {name: 'Mililiter (mL)', value: 'ml'},
        {name: 'Cubic Centimeter (CC)', value: 'cc'},
        // {name: '1/8 Cup', value: '1/8 cup'},
        // {name: '1/4 Cup', value: '1/4 cup'},
        // {name: '1/2 Cup', value: '1/2 cup'},
        // {name: '1 Cup', value: '1 cup'}
    ],
    mass: [
        {name: 'Milligrams (mg)', value: 'mg'},
        {name: 'Micrograms (mcg)', value: 'mcg'},
        {name: 'Grams (g)', value: 'g'},
        // {name: 'Kilograms (kg)', value: 'kg'},
        // {name: 'Pounds (lb)', value: 'lb'},
        // {name: 'Ounces (oz)', value: 'oz'}
    ]
}

function App({domain}) {
    const [start, useStart] = useState(false)
    return (
        <Container>
            <style>
                {"body{" +
                "   background-color:" + bgCol +
                "}"}
            </style>
                {!start ? <Default hook={useStart}/> : <Start domain={domain}/>}
        </Container>
    );
}




function Default({hook}) {
    return (
        <>
            <Main id={"MAIN"}>

            <Title>
                Let's find the right capsule size for you
            </Title>
            <Wrapper>
                <StartButton onClick={() => hook(true)}>
                    Get Started
                </StartButton>
            </Wrapper>
            </Main>
        </>
    )
}

class Start extends React.Component {
    constructor(props) {
        super(props)
        // var sizes=[['000', 1.37], ['00E', 1], ['00', 0.9], ['0E', 0.78], ['0', 0.68], ['1', 0.48], ['2', 0.36], ['3', 0.27], ['4', 0.2], ['5', 0.13]]
        var sizes
        if(this.props.domain=='capsuline')
            sizes=[['000', 1.37], ['00', 0.9], ['0E', 0.78], ['0', 0.68], ['1', 0.48], ['2', 0.36], ['3', 0.27], ['4', 0.2]]
        else sizes=[['00E', 1], ['00', 0.9], ['0E', 0.78], ['0', 0.68], ['1', 0.48], ['2', 0.36], ['3', 0.27], ['4', 0.2]]
        // console.log(capsuleSizes)
        this.state = {step: 1, data: {domain:this.props.domain, sizes:sizes, ...initialState}}
        this.hook = this.hook.bind(this)
    }

    componentDidUpdate() {
        console.log(this.state)
    }

    hook(step, data = null) {
        if (data) {
            this.setState({step: step + 1, data: data})
        } else {
            this.setState({step: step + 1})
        }
    }

    render() {
        const {step, data} = this.state
        const getComponent = (step) => {
            switch (step) {
                case 1:
                    return Step0;
                case 2:
                    return Step1;
                case 3:
                    return Step2;
                case 4:
                    return Step3;
                case 5:
                    return Step4;
                case 6:
                    return Step5;
                case 7:
                    return Step6;
                case 8:
                    return Step7;
            }
        }
        const Component = getComponent(step)
        return (
            <Component hook={this.hook} step={step} data={data} sizes={data.sizes} units={units}/>
        )
    }
}


export default App