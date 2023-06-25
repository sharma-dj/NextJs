import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import Layout from '../../components/layout'

export default function SecondPost() {
    return (
        <Layout>
            <Head>
                <title>Second Post</title>
                <Script
                    src="https://connect.facebook.net/en_US/sdk.js"
                    strategy="lazyOnload"
                    onLoad={() =>
                    console.log(`script loaded correctly, window.FB has been populated`)
                    }
                />
            </Head>
            <h1>Second Post</h1>
            Go <Link href="/">back</Link>
        </Layout>
    )
}