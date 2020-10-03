import 'bulma/css/bulma.css'
import Head from 'next/head'
import {useState} from 'react'
import {ThemeProvider} from 'styled-components'

function MyApp({Component, pageProps, stars}) {
    const domain = stars.domain
    var col
    if(domain!='cacat')
        col='gold'
    else col = 'black'
    const theme={main:col}
    return (
        <><Head>
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;900&display=swap" rel="stylesheet"/>
                <title>Size Calculator</title>
            <style>{`.pagination div svg path{fill:${col}`}</style>
        </Head>
            <ThemeProvider theme={theme}>
            <Component {...pageProps} domain={domain}/>
            </ThemeProvider>
            </>
    )
}

MyApp.getInitialProps = async (ctx) => {

    return { stars: ctx.router.query }
}


export default MyApp
