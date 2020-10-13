import 'bulma/css/bulma.css'
import Head from 'next/head'
import {useState} from 'react'
import {ThemeProvider, createGlobalStyle} from 'styled-components'
import {textNotSelected} from "../src/styled";
import KCaps from '../public/svgs/caps.svg'
import Capsuline from '../public/svgs/capsuline.svg'


function MyApp({Component, pageProps, stars}) {
    const domain = stars.domain
    var col, Logo, check
    if(domain!='kcaps'){
        col='gold'
        Logo=Capsuline
    }
    else {
        col = '#009E95'
        Logo=KCaps
        check=true
    }
    const theme={main:col}
    return (
        <><Head>
                <title>Size Calculator</title>
            {check? <style>{".logo{margin-top:unset !important; height: 8.2vw !important}; right:0 !important"}</style>:null}
            <style>{"  @font-face {\n    font-family: 'nunito';\n      src: url('/GOTHIC.woff2');\n      src: url('/GOTHICB.woff2')\n  }"}</style>
            <style>{`.pagination div svg path{fill:${col}}html{height:100%;overflow:hidden}#__next{height:100%;overflow:hidden; position:relative}body{height:100%;overflow:hidden}body::-webkit-scrollbar{display:none}@media screen and (max-width: 480px){.logo{display:none}}` }</style>
            {/*<style>{`.logo path{fill:${textNotSelected}; stroke:${textNotSelected}}.logo text{fill:${textNotSelected}; stroke:${textNotSelected}}`}</style>*/}
        </Head>
            <ThemeProvider theme={theme}>
                <Logo className={"logo"} style={{height:70, width:'auto', marginTop:'2vw', position:'absolute', right:'2vw', zIndex:999}}/>
            <Component {...pageProps} domain={domain}/>
            </ThemeProvider>
            </>
    )
}

MyApp.getInitialProps = async (ctx) => {

    return { stars: ctx.router.query }
}


export default MyApp
