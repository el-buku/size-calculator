import {useState} from 'react'
import {Title, Wrapper, Btn, Pagination, Subtitle, T1, T2} from '../styled'

export default function Step2({hook, step, data}) {
    const [user, setUser] = useState(data.user);
    const values = ['children', 'elderly', 'adults', 'pets'];
    data.user = user
    return (
        <>
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

                            <Btn selected={value == user ? true : false} onClick={() => setUser(value)}>
                                {value}
                            </Btn>
                            {value == user ? <T1>{value}</T1> : <T2>{value}</T2>}
                        </div>
                    )
                })}
            </Wrapper>
            <Pagination step={step} hook={hook} data={data} disableRight={user ? false : true}/>
        </>
    )
}