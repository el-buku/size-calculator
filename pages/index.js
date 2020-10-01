import React, {useEffect, useState} from 'react';
import {
    Container,
    Main,
    Title,
    Wrapper,
    StartButton
} from "./components/styled";
import Step1 from "./components/steps/Step1"
import Step2 from "./components/steps/Step2"
import Step3 from "./components/steps/Step3"
import Step4 from "./components/steps/Step4"


const initialState = {
    knowsSize: null,
    capsuleSize: null,
    ingredientType: null,
    density: null,
    user: null,
    measurementUnit: null,
    quantity: null,
}



function App() {

    const [start, useStart] = useState(false)
    return (
        <Container>
            <Main>
                {!start ? <Default hook={useStart}/> : <Start/>}
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
        this.state = {step: 1, data: initialState}
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
            }
        }
        const Component = getComponent(step)
        return (
            <Component hook={this.hook} step={step} data={data}/>
        )
    }
}


export default App