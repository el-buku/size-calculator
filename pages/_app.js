import 'bulma/css/bulma.css'
import Head from 'next/head'
import {useState} from 'react'
import {ThemeProvider, createGlobalStyle} from 'styled-components'



function MyApp({Component, pageProps, stars}) {
    const domain = stars.domain
    var col
    if(domain!='kcaps')
        col='gold'
    else col = '#009E95'
    const theme={main:col}
    return (
        <><Head>
                <title>Size Calculator</title>
            <style>{"  @font-face {\n    font-family: 'nunito';\n      src: url('/GOTHIC.woff2');\n      src: url('/GOTHICB.woff2')\n  }"}</style>
            <style>{`.pagination div svg path{fill:${col}}html{height:100%;overflow:hidden}#__next{height:100%;overflow:hidden}body{height:100%;overflow:hidden}body::-webkit-scrollbar{display:none}` }</style>
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
