import React, {useState} from 'react';
import {
    Button,
    Container,
    Card,
    CardHeader,
    CardHeaderTitle,
    CardContent,
    Content,
    Title,
    Field,
    Input,
    Control
} from 'bloomer'
import {createGlobalState} from 'react-hooks-global-state';

const initialState = {
    knowsSize: null,
    capsuleSize: null,
    ingredientType: null,
    density: null,
    user:null
}

const {useGlobalState, getGlobalState} = createGlobalState(initialState);


function App() {

    const [start, useStart] = useState(false)
    return (
            !start ? <Default hook={useStart}/> : <Start/>
    );
}

function Default({hook}) {
    return (
        <Card>
            <CardHeader>
                <CardHeaderTitle isSize={4}>
                    Start
                </CardHeaderTitle>
            </CardHeader>
            <CardContent>
                <Button variant="contained" color="primary" onClick={() => hook(true)}>
                    Link
                </Button>
            </CardContent>
        </Card>
    )
}

function Start() {
    const [step, setStep] = useState(1)
    const hook = (step) => {
        setStep(step + 1)
    }
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
        <Component hook={hook} step={step}/>
    )
}

function Step1({hook, step}) {
    const [knowsSize, setKnows] = useGlobalState('knowsSize')
    const handleClick = (bool) => {
        setKnows(bool)
        console.log(getGlobalState('knowsSize'))
        hook(step)
    }
    return (
        <Card>
            <CardHeader>
                <CardHeaderTitle isSize={4}>
                    Do you know your capsule size?
                </CardHeaderTitle>
            </CardHeader>
            <CardContent>

                <Field isGrouped>
                    <Button isFullWidth={true} isColor={'primary'} onClick={() => handleClick(true)}
                            style={{marginLeft: 15}}>
                        Yes
                    </Button>
                    <Button isFullWidth={true} isColor={'danger'} onClick={() => handleClick(false)}
                            style={{marginLeft: 15}}>
                        No
                    </Button>
                </Field>
            </CardContent>
        </Card>
    )
}


function Step2({hook, step}) {
    const bool = getGlobalState('knowsSize')
    const [next, setNext] = useState(false)
    const getComponent = (bool) => {
        if (bool && !next) {
            return KnowsSize
        } else {
            return Step21
        }
    }
    const Component = getComponent(bool)
    return (
        <Component hook={hook} next={setNext} step={step}/>
    )
}

function KnowsSize({next}) {
    const [capsuleSize, setSize] = useGlobalState('capsuleSize')
    const [value, setValue] = useState()
    const handleClick = () => {
        setSize(value)
        next(true)
    }
    return (
        <Card>
            <CardHeader>
                <CardHeaderTitle isSize={4}>
                    Input your capsule size
                </CardHeaderTitle>
            </CardHeader>
            <CardContent>
                <Field isGrouped={true}>
                    <Control>
                        <Input value={value} onChange={(e) => {
                            setValue(e.target.value)
                        }}/>
                    </Control>
                    <Button variant="contained" color="secondary" onClick={() => handleClick()}>
                        Next
                    </Button>
                </Field>
            </CardContent>
        </Card>
    )
}

function Step21({hook, step}) {
    const [ingredientType, setType] = useGlobalState('ingredientType')

    function handleClick(type) {
        setType(type)
        hook(step)
    }

    return (
        <Card>
            <CardHeader>
                <CardHeaderTitle isSize={4}>
                    What would you like to encapsulate?
                </CardHeaderTitle>
            </CardHeader>
            <CardContent>
                <Field isGrouped={true}>
                    <Button isFullWidth={true} variant="contained" color="secondary"
                            onClick={() => handleClick('liquid')}>
                        Liquid
                    </Button>
                    <Button isFullWidth={true} variant="contained" color="secondary"
                            onClick={() => handleClick('powder')}>
                        Powder
                    </Button>
                </Field>
            </CardContent>
        </Card>
    )
}

function Step3({hook, step}) {
    const [density, setDensity] = useGlobalState('density')
    const values = [[0.6,'Light'],[ 0.8, 'Normal'],[ 1.0, 'Dense'], [1.2,'Fine']]
    const handleClick = (val) => {
        setDensity(val)
        hook(step)
    }
    return (
        <Card>
            <CardHeader>
                <CardHeaderTitle isSize={4}>
                    Chooose ingredient density
                </CardHeaderTitle>
            </CardHeader>
            <CardContent>
                <Field isGrouped={true}>
                    {values.map((value) => {
                    return(
                        <Button isFullWidth={true} variant="contained" color="secondary" onClick={() => handleClick(value[0])}>
                            {value[1]} {value[0]}g/ml
                        </Button>
                    )
                    })}
                </Field>
            </CardContent>
        </Card>
    )
}

function Step4({hook, step}){
    const [user, setUser] = useGlobalState('user')
    const values=['children','adults','elderly','pets']
    const handleClick=(val)=>{
        setUser(val)
        hook(step)
    }
    return(
        <Card>
            <CardHeader>
                <CardHeaderTitle isSize={4}>
                    Who are the capsules for?
                </CardHeaderTitle>
            </CardHeader>
            <CardContent>
                <Field isGrouped={true}>
                    {values.map((value) => {
                        return(
                            <Button isFullWidth={true} variant="contained" color="secondary" onClick={() => handleClick(value)}>
                                {value}
                            </Button>
                        )
                    })}
                </Field>
            </CardContent>
        </Card>
    )
}

function Step5({hook, step}){
    const[ingredientType, setType] = useGlobalState('ingredientType')
    const getComp=()=>{
        if(ingredientType=='liquid'){
            return <Step5Liquid/>
        }
        else if(ingredientType=='powder'){
            return <Step5Powder/>
        }
    }
    const Comp = getComp()
    return(
        <Comp hook={hook} step={step}/>
    )
}

function Step5Liquid({hook, step}){

}

export default App;
