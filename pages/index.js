import { useWeb3React } from "@web3-react/core";
import Head from 'next/head'

import useEagerConnect from "../hooks/useEagerConnect";
import { injected } from "../connectors";

export default function Home() {
  const { account, activate, library, chainId } = useWeb3React();

  const triedToEagerConnect = useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!isConnected
          ? <div class="pt-3 pr-3 text-center sm:text-right">
              <div class="inline-flex rounded-md shadow">
                <button onClick={() => chainId == 1 ? activate(injected) : alert("Please switch network to mainnet") } class="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                  Connect Wallet
                </button>
              </div>
            </div>
          : <div class="m-5 pt-3 pr-3 text-center sm:text-right">
              Connected account: {account}
            </div>
        }
        {/* <div class="pt-3 pr-3 text-center sm:text-right">
          <button type="submit" class="inline-flex justify-center py-3 px-5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Connect Wallet
          </button>
        </div> */}
        <div class="flex flex-container justify-center pt-5">
          <div class="grid grid-cols-1 md:grid-cols-2">
            <div class="px-5 lg:pl-32 mb-5">
              <a class="mb-5" target="_blank" href="https://etherscan.io/address/0x997214ec4f289807a6677abbbd97a4cea813296a">
                <img src="/art.png" class="shadow border"></img>
              </a>
            </div>
            <div class="px-5">
              <div class="flex flex-col text-center sm:text-left">
                <div>To own this artwork, you must <span class="italic">deposit what you think it is worth.</span></div>
                <div><span class="italic">Anyone can buy it off you</span>, by depositing a higher amount.</div>
                <div>Your deposit <span class="italic">earns interest</span>, split between you and the artist.</div>
              </div>
              <div class="flex flex-row py-10 font-semibold">
                <div class="flex flex-col pr-12 border-r border-gray-300">
                  <div>Current Price</div>
                  <div class="text-4xl py-4">0.123 ETH</div>
                  <div class="text-gray-400">$123.45</div>
                </div>
                <div class="flex flex-col pl-12">
                  <div>Artist Earnings</div>
                  <div class="text-4xl py-4">0.131982 ETH</div>
                  <div class="text-gray-400">Owner Yield: 0.081712 ETH</div>
                </div>
              </div>
              <div class="rounded shadow border px-8 py-6">
                <div class="pb-4 font-semibold">Purchase and Set New Price: </div>
                <div class="flex flex-row items-center text-lg">
                  <div>
                    <input default="0.13" class="input border border-gray-400 appearance-none rounded w-36 px-3 py-3 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" type="number" />
                  </div>
                  <div class="px-3">ETH</div>
                  <button type="submit" class="inline-flex justify-center ml-5 py-4 px-6 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Buy
                  </button>
                </div>
                <div class="pt-3 text-left text-gray-400 text-smg">
                   - 0.00615 ETH to artist (5% commission)<br />
                   - 0.11685 ETH to current owner<br />
                   - 0.07 ETH refundable deposit (Earns 5.23% APY)
                </div>
              </div>

                 <div class="py-12 ">
                    <h2 class="text-3xl">About</h2>

                    <div class="py-5">As NFTs proliferate, how can we ensure that creators capture appropriate value?</div>

                    <div class="pb-5">This artwork is the result of exploring this question, and looking for alternative ownership models that could answer it. It attempts to improve upon two existing royalty mechanisms:</div>

                    <div class="pb-5">1. Secondary Sales Commissions - While this is a huge step forward, the creator only earns when the item changes hands. How can we increase turnover, or alternatively generate revenue in the absence of sales?</div>

                    <div class="pb-5">2. Harberger Taxes - This mechanism solves the above, by putting the item "always on sale", and charging the owner a tax. But such a mechanism can be unappealing to people who are accustomed to traditional property rights.</div>

                    <div class="pb-5">"This Artwork Earns Yield" combines both of these mechanisms, with a couple of tweaks:</div>
                    <div class="pb-5">
                      - A fixed, refundable deposit, instead of fees that need to be topped up<br />
                      - Royalties paid with DeFi yield, instead of taxes
                    </div>
                    <div class="pb-5">While such a mechanism will not be appropriate for all NFTs, the hope is that the simpler UX may reduce friction enough to make it useful in some applications. </div>

                    <div class="pb-5">We are also excited to start a conversation about how Ethereum's composability can be leveraged to create novel solutions to this challenge.</div>

                    <h2 class="text-3xl pt-5">Credit</h2>

                    <div class="pt-5"> - Made by <a class="underline" target="_blank" href="https://twitter.com/ptrwtts">@ptrwtts</a> and <a class="underline" target="_blank" href="https://github.com/georgeroman">@georgeroman</a></div>

                    <div class="pt-2"> - Inspired by <a class="underline" target="_blank" href="https://thisartworkisalwaysonsale.com/">This Artwork Is Always On Sale</a></div>
                    
                    <div class="pt-2"> - Yield by <a class="underline" target="_blank" href="https://yearn.finance/vaults">Yearn Vaults</a></div>

                    <div class="pt-2"> - Prompted by <a class="underline" target="_blank" href="https://nfthack.ethglobal.co/">NFT Hack</a> (unofficial submission because we forgot to signup 😭)</div>

                    <h2 class="text-3xl pt-10">Disclaimers</h2>

                    <div class="pt-5"> - Please review <a class="underline" target="_blank" href="https://github.com/georgeroman/liquid-nft">contract code</a>. Use at your own risk.</div>

                    <div class="pt-2"> - Yield is not guaranteed to be positive 🙈</div>
                </div>
            </div>
          </div>
        </div>


        
      </main>
    </div>
  )
}
