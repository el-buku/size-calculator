import 'bulma/css/bulma.css'
import Head from 'next/head'

function MyApp({Component, pageProps}) {
    return (
        <><Head>
            <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;900&display=swap" rel="stylesheet"/>
                <title>Size Calculator</title>
        </Head>
            <Component {...pageProps} />
            </>
    )
}

export default MyApp
