import {useState} from 'react'
import {Main,Title, Wrapper, Btn, Pagination, Subtitle, T1, T2, textNotSelected} from '../styled'
import Kids from '../../public/svgs/kds.svg'
import Adults from '../../public/svgs/adults.svg'
import Elderly from '../../public/svgs/elderly.svg'
import Pets from '../../public/svgs/pts.svg'

const style={
    height:'12vw',width:'12vw'
}

export default function Step2({hook, step, data}) {
    const [user, setUser] = useState(data.user);
    var values = ['adults','children','elderly', 'pets'];
    if(data.domain=='kcaps') values=['children', 'elderly', 'adults']
    data.user = user
    const getCompByVal = (val) =>{
        var selected
        if(val==user) selected=true
        switch (val){
            case 'children':
                return <Kids style={style} className={!selected?'a':null}/>
            case 'adults':
                return <Adults style={style} className={!selected?'a':null}/>
            case 'elderly':
                return <Elderly style={style}className={!selected?'a':null}/>
            case 'pets':
                return <Pets style={style}className={!selected?'a':null}/>
        }
    }
    return (
        <>
        <Main id={'MAIN'}>
            <Subtitle>
                PATIENT
            </Subtitle>
            <Title>
                Who are the capsules for?
            </Title>
            <Wrapper>
                {values.map((value) => {
                    return (
                        <div key={value}
                             style={{width: 'fit-content', marginLeft: 15, marginRight: 15, textAlign: 'center'}}>

                            <Btn selected={value == user ? true : false} onClick={() => {setUser(value); setTimeout(()=>{data.user=value; hook(step, data)}, 500)}}>
                                {getCompByVal(value)}
                            </Btn>
                            {value == user ? <T1 style={{fontSize: '2vw'}}>{value.toUpperCase()}</T1> : <T2>{value.toUpperCase()}</T2>}
                        </div>
                    )
                })}
            </Wrapper>
            <style>
                {"button{    width: 19vw !important;\n" +
                "    height: 19vw !important;\n" +
                "    border-radius: 80px !important;}" +
                "#MAIN{height:35vw} @media screen and (max-width: 650px){#MAIN{height:100vw}}"}

            </style>
        </Main>
    <Pagination step={step} hook={hook} data={data} hideRight={true}/>
    </>

)
}