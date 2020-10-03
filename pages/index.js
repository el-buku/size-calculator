import React, {useEffect, useState} from 'react';
import {
    Container,
    Main,
    Title,
    Wrapper,
    StartButton, bgCol
} from "../src/styled";
import Step1 from "../src/steps/Step1"
import Step2 from "../src/steps/Step2"
import Step3 from "../src/steps/Step3"
import Step4 from "../src/steps/Step4"
import Step5 from "../src/steps/Step5"
import Step6 from "../src/steps/Step6"
import Step7 from "../src/steps/Step7"

const initialState = {
    capsuleSize: null,
    ingredientType: null,
    density: 1,
    user: null,
    measurementUnit: null,
    quantity: null,
    email: null,
    types:[]
}

const capsuleSizes = [['000', 1.37], ['00E', 1], ['00', 0.9], ['0E', 0.78], ['0', 0.68], ['1', 0.48], ['2', 0.36], ['3', 0.27], ['4', 0.2], ['5', 0.13]]

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
        {name: 'Miligrams (mg)', value: 'mg'},
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
            <Main id={'MAIN'}>
                {!start ? <Default hook={useStart}/> : <Start domain={domain}/>}
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
                <StartButton onClick={() => hook(true)}>
                    Get Started
                </StartButton>
            </Wrapper>

        </>
    )
}

class Start extends React.Component {
    constructor(props) {
        super(props)
        this.state = {step: 1, data: {domain:this.props.domain, ...initialState}}
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
                    return Step1;
                case 2:
                    return Step2;
                case 3:
                    return Step3;
                case 4:
                    return Step4;
                case 5:
                    return Step5;
                case 6:
                    return Step6;
                case 7:
                    return Step7;
            }
        }
        const Component = getComponent(step)
        return (
            <Component hook={this.hook} step={step} data={data} sizes={capsuleSizes} units={units}/>
        )
    }
}


export default App