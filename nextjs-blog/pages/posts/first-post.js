import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import Layout from '../../components/layout'

export default function FirstPost() {
    return (
        <Layout>
            <Head>
                <title>First Post</title>
                <Script
                    src="https://connect.facebook.net/en_US/sdk.js"
                    strategy="lazyOnload"
                    onLoad={() =>
                    console.log(`script loaded correctly, window.FB has been populated`)
                    }
                />
            </Head>
            <h1>First Post</h1>
            <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Curabitur sit amet nibh in purus euismod tempor. Nunc molestie dapibus accumsan. Duis id nisl ante. Ut dictum cursus imperdiet. Nulla cursus, nibh sit amet sodales pretium, nisi erat elementum nisl, et porttitor nisi eros id enim. Sed libero metus, suscipit non neque a, feugiat pharetra lacus. Mauris ullamcorper rutrum porttitor. Maecenas ac mi tincidunt, efficitur dui sit amet, auctor mauris. Etiam sed sollicitudin purus. Aliquam erat volutpat. Ut eleifend massa sit amet ornare eleifend. Phasellus tincidunt tortor eu fringilla feugiat.</p>
            Go <Link href="/">back</Link>
        </Layout>
    )
}