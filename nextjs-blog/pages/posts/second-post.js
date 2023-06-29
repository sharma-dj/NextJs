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
            <p>Duis molestie lacinia massa sed sollicitudin. Praesent turpis leo, facilisis in felis non, tempor luctus ligula. Praesent auctor leo ut condimentum vehicula. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla vitae interdum orci. Praesent sit amet purus sit amet lectus ultricies egestas et vel urna. Nunc a erat id leo condimentum tristique. Ut dolor velit, porta et nisi tempus, pretium posuere magna. Vestibulum rhoncus finibus consectetur. In lacus lorem, facilisis ut ultrices et, vehicula eu felis. Mauris varius lacinia magna id ultricies.</p>
            Go <Link href="/">back</Link>
        </Layout>
    )
}