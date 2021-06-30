import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>tulo.js | Home</title>
        <meta
          name='description'
          content='Making service workers easy so that your app is fast and reliable, even offline.'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
    </>
  );
}
