import Link from 'next/link'
import Head from 'next/head'
import Script from 'next/script'
import Layout from '../../components/layout'

export default function ThirdPost() {
    return (
        <Layout>
            <Head>
                <title>Third Post</title>
                <Script
                    src="https://connect.facebook.net/en_US/sdk.js"
                    strategy="lazyOnload"
                    onLoad={() =>
                    console.log(`script loaded correctly, window.FB has been populated`)
                    }
                />
            </Head>
            <h1>Third Post</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae est lectus. Mauris pharetra pretium lorem, at euismod eros congue eu. Sed justo lacus, fermentum non semper vitae, vulputate ac orci. Duis ultricies tempor nulla et efficitur. Donec vestibulum dapibus euismod. Curabitur purus risus, imperdiet non sem id, semper ultrices risus. Curabitur in eros ipsum. Etiam pharetra nec neque nec pulvinar. Maecenas gravida quam risus, sit amet egestas tellus blandit sit amet. Morbi euismod vitae diam nec porta. Aliquam interdum ornare molestie. Curabitur imperdiet feugiat mattis. Phasellus nisi metus, placerat at tincidunt vel, dictum id quam.</p>
            Go <Link href="/">back</Link>
        </Layout>
    )
}