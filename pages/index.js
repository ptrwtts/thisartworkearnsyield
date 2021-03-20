import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
      <div class="p-3 text-right justify-end">
            <button type="submit" class="inline-flex justify-center py-4 px-6 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Connect Wallet
            </button>
          </div>
      <div class="flex flex-container justify-center pt-10">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <div class="px-8">
          <img src="https://thisartworkisalwaysonsale.com/static/media/TAIAOS4.3cd60b66.png"></img>
        </div>
        <div class="px-8">
          <div class="flex flex-col">
            <div>To own this artwork, you must deposit what you think it is worth.</div>
            <div>Anyone can buy it off you, by depositing a higher amount.</div>
            <div>Your deposit earns 10.15% interest, split between you & the artist</div>
          </div>
          <div class="flex flex-row py-5 font-semibold">
            <div class="flex flex-col pr-12 border-r border-gray-300">
              <div>Current Price</div>
              <div class="text-4xl py-4">0.123 ETH</div>
              <div class="text-gray-400">$123.45</div>
            </div>
            <div class="flex flex-col pl-12">
              <div>Artist Yield</div>
              <div class="text-4xl py-4">0.131982 ETH</div>
              <div class="text-gray-400">Current Owner Yield: 0.012 ETH</div>
            </div>
          </div>
          <div class="flex flex-row items-center">
            <div>Your Price: </div>
            <div class="px-3">
              <input class="input border border-gray-400 appearance-none rounded w-full px-3 py-3 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" type="number" />
            </div>
            <div>ETH</div>
          </div>
          <div class="py-3 text-left">
            <button type="submit" class="inline-flex justify-center py-4 px-6 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Buy
            </button>
          </div>
        </div>
      </div>
      </div>
        {/* <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>
    </div>
  )
}
