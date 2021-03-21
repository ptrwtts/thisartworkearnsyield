import { useWeb3React } from "@web3-react/core";
import * as ethers from "ethers";
import Head from 'next/head'
import { useEffect, useState } from 'react';

import useEagerConnect from "../hooks/useEagerConnect";
import { injected } from "../connectors";

import ArtStewardAbi from "../abi/ArtSteward.json";

export default function Home() {
  const { account, activate, library, chainId } = useWeb3React();
  useEagerConnect();

  const isConnected = typeof account === "string" && !!library;

  const [artStewardRO, setArtStewardRO] = useState();
  const [artist, setArtist] = useState();
  const [owner, setOwner] = useState();
  const [currentPrice, setCurrentPrice] = useState();
  const [currentPriceDollars, setCurrentPriceDollars] = useState();
  const [artistEarnings, setArtistEarnings] = useState();
  const [ownerEarnings, setOwnerEarnings] = useState();
  const [yearnAPY, setYearnAPY] = useState();
  const [newSellPrice, setNewSellPrice] = useState();
  const [artistShare, setArtistShare] = useState();
  const [ownerShare, setOwnerShare] = useState();
  const [deposit, setDeposit] = useState();
  const [stewardAddress, setStewardAddress] = useState();

  useEffect(async () => {
    const test = false;

    const artStewardAddress = test
      ? "0x4617C9fB73600DC2e5299fE8d01e7b2be34d344D"
      : "0xd57a10c6218901d7f735BfCcA49B7Edb3A62227F";
    setStewardAddress(artStewardAddress);

    const readOnlyProvider = test
      ? new ethers.providers.JsonRpcProvider("https://eth-goerli.alchemyapi.io/v2/qaRch1jm75Vit_6Y1IGPVYenp-gKn_GO")
      : new ethers.providers.JsonRpcProvider("https://eth-mainnet.alchemyapi.io/v2/psgRyOX_y0sFlhP5qNe4W4UrJ6MpOpEd");

    readOnlyProvider.on("block", async () => {
      console.log('new block');

      const currentPrice = await artStewardRO.sellPrice();
      setCurrentPrice(currentPrice);
  
      const coinGeckoPriceData = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
      const priceData = await coinGeckoPriceData.json();
      const usdPrice = priceData[0].current_price;
      setCurrentPriceDollars((usdPrice * Number(ethers.utils.formatEther(currentPrice))).toString());
  
      let ownerEarn = await artStewardRO.totalEarnings(owner);
      let artistEarn = await artStewardRO.totalEarnings(artist);
      const _yield = await artStewardRO.getCurrentYield();
      ownerEarn = ownerEarn.add(_yield.div(2));
      artistEarn = artistEarn.add(_yield.sub(_yield.div(2)))
  
      setArtistEarnings(artistEarn);
      setOwnerEarnings(ownerEarn);
  
      const yearnVaultsData = await fetch("https://vaults.finance/all");
      const vaultsData = await yearnVaultsData.json();
      const yvWETH = vaultsData.filter(data => data.symbol === "yvWETH");
      const apy = (yvWETH[0].apy.recommended * 100).toFixed(2);
      setYearnAPY(apy);
    });

    const artStewardRO = new ethers.Contract(artStewardAddress, ArtStewardAbi, readOnlyProvider);
    setArtStewardRO(artStewardRO);

    const artist = await artStewardRO.artist()
    setArtist(artist);

    const owner = await artStewardRO.owner();
    setOwner(owner);

    const currentPrice = await artStewardRO.sellPrice();
    setCurrentPrice(currentPrice);

    const coinGeckoPriceData = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum');
    const priceData = await coinGeckoPriceData.json();
    const usdPrice = priceData[0].current_price;
    setCurrentPriceDollars((usdPrice * Number(ethers.utils.formatEther(currentPrice))).toString());

    let ownerEarn = await artStewardRO.totalEarnings(owner);
    let artistEarn = await artStewardRO.totalEarnings(artist);
    const _yield = await artStewardRO.getCurrentYield();
    ownerEarn = ownerEarn.add(_yield.div(2));
    artistEarn = artistEarn.add(_yield.sub(_yield.div(2)))

    setArtistEarnings(artistEarn);
    setOwnerEarnings(ownerEarn);

    const yearnVaultsData = await fetch("https://vaults.finance/all");
    const vaultsData = await yearnVaultsData.json();
    const yvWETH = vaultsData.filter(data => data.symbol === "yvWETH");
    const apy = (yvWETH[0].apy.recommended * 100).toFixed(2);
    setYearnAPY(apy);

    const newSellPrice = currentPrice.add(currentPrice.mul(5).div(100));
    setNewSellPrice(newSellPrice);

    const deposit = newSellPrice.gt(currentPrice) ? newSellPrice.sub(currentPrice) : ethers.BigNumber.from(0);
    setDeposit(deposit);

    const ownerShare = currentPrice.mul(95).div(100);
    setOwnerShare(ownerShare);

    const artistShare = currentPrice.sub(ownerShare);
    setArtistShare(artistShare);
  }, []);

  return (
    <div>
      <Head>
        <title>This Artwork Earns Yield</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="This Artwork Earns Yield" />
        <meta name="twitter:description" content="An NFT that earns royalties for the artist using DeFi yield." />
        <meta name="twitter:image" content="https://thisartworkearnsyield.com/art.png" />
      </Head>

      <main>
        {!isConnected
          ? <div className="pt-3 pr-3 text-center sm:text-right">
              <div className="inline-flex rounded-md shadow">
                <button onClick={() => chainId === 1 || chainId === 5 || chainId !== 1337 ? activate(injected) : alert("Please switch network to mainnet") } className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50">
                  Connect Wallet
                </button>
              </div>
            </div>
          : <div className="m-3 pt-3 pr-3 text-center sm:text-right text-gray-400">
              Connected account: {account}
            </div>
        }

        <div className="flex flex-container justify-center pt-5">

          <div className="grid grid-cols-1 md:grid-cols-2">

            <div className="px-5 lg:pl-32 mb-5">
              <a className="mb-5" target="_blank" href="https://etherscan.io/address/0x997214ec4f289807a6677abbbd97a4cea813296a">
                <img src="/art.png" className="shadow border"></img>
              </a>
            </div>

            <div className="px-5">

              <div className="flex flex-col text-center sm:text-left">
                <div>To own this artwork, you must <span className="italic">deposit what you think it is worth.</span></div>
                <div><span className="italic">Anyone can buy it off you</span>, by depositing a higher amount.</div>
                <div>Your deposit <span className="italic">earns interest</span>, split between you and the artist.</div>
              </div>

              <div className="flex flex-row py-10 font-semibold">

                <div className="flex flex-col pr-12 border-r border-gray-300">
                  <div>Current Price</div>
                  <div className="text-4xl py-4">{currentPrice ? `${ethers.utils.formatEther(currentPrice)} ETH` : "Fetching..." }</div>
                  <div className="text-gray-400">{currentPriceDollars ? `$${currentPriceDollars}` : "Fetching..."}</div>
                </div>

                <div className="flex flex-col pl-12">
                  <div>Artist Earnings</div>
                  <div className="text-4xl py-4">{artistEarnings ? `${ethers.utils.formatEther(artistEarnings).slice(0, 12)} ETH` : "Fetching..." }</div>
                  <div className="text-gray-400">Owner Yield: {ownerEarnings ? `${ethers.utils.formatEther(ownerEarnings).slice(0, 12)} ETH` : "Fetching..." }</div>
                </div>

              </div>

              {currentPrice && newSellPrice &&
                <div>
                  <div className="rounded shadow border px-8 py-6">

                    {account !== owner &&
                      <>
                        <div className="pb-4 font-semibold">Purchase and Set New Price: </div>
                        <div className="flex flex-row items-center text-lg">
                          <div>
                            <input
                              defaultValue={ethers.utils.formatEther(newSellPrice)}
                              onInput={(event) => {
                                event.preventDefault();

                                let number = Number(event.target.value);
                                if (isNaN(number)) {
                                  number = 0;
                                }

                                const newSellPrice = ethers.utils.parseEther(number.toString());
                                setNewSellPrice(newSellPrice);

                                const deposit = newSellPrice.gt(currentPrice) ? newSellPrice.sub(currentPrice) : ethers.BigNumber.from(0);
                                setDeposit(deposit);
                              }}
                              className="input border border-gray-400 appearance-none rounded w-36 px-3 py-3 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" type="number" />
                          </div>
                          <div className="px-3">ETH</div>
                          <button
                            onClick={async () => {
                              if (isConnected) {
                                const artSteward = new ethers.Contract(stewardAddress, ArtStewardAbi, library);
                                const totalToPay = currentPrice.add(deposit);
                                await artSteward.connect(library.getSigner()).buy(newSellPrice, { value: totalToPay });
                              }
                            }}
                            type="submit"
                            className="inline-flex justify-center ml-5 py-4 px-6 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Buy
                          </button>
                        </div>
                        {currentPrice && ownerShare && artistShare && deposit &&
                          <div className="pt-3 text-left text-gray-400 text-smg">
                            - {ethers.utils.formatEther(artistShare)} ETH to artist (5% commission)<br />
                            - {ethers.utils.formatEther(ownerShare)} ETH to current owner<br />
                            - {ethers.utils.formatEther(deposit)} ETH refundable deposit {yearnAPY && `(earns ${yearnAPY}% APY)`}
                          </div>
                        }
                      </>
                    }

                    {account === owner &&
                      <>
                        <div className="pb-4 font-semibold">Set New Price: </div>
                        <div className="flex flex-row items-center text-lg">
                          <div>
                            <input
                              defaultValue={ethers.utils.formatEther(newSellPrice)}
                              onInput={(event) => {
                                event.preventDefault();

                                let number = Number(event.target.value);
                                if (isNaN(number)) {
                                  number = 0;
                                }

                                const newSellPrice = ethers.utils.parseEther(number.toString());
                                setNewSellPrice(newSellPrice);

                                const deposit = newSellPrice.gt(currentPrice) ? newSellPrice.sub(currentPrice) : ethers.BigNumber.from(0);
                                setDeposit(deposit);
                              }}
                              className="input border border-gray-400 appearance-none rounded w-36 px-3 py-3 focus focus:border-indigo-600 focus:outline-none active:outline-none active:border-indigo-600" type="number" />
                          </div>
                          <div className="px-3">ETH</div>
                          <button
                            onClick={async () => {
                              if (isConnected) {
                                const artSteward = new ethers.Contract(stewardAddress, ArtStewardAbi, library);
                                await artSteward.connect(library.getSigner()).setPrice(newSellPrice, { value: deposit });
                              }
                            }}
                            type="submit"
                            className="inline-flex justify-center ml-5 py-4 px-6 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Set Price
                          </button>
                        </div>
                      </>
                    }

                    {account === artist || account === owner &&
                      <div>
                        <div className="pt-4 pb-4 font-semibold">Collect Yield: </div>
                        <div className="text-lg">
                          <button
                              onClick={async () => {
                                const artSteward = new ethers.Contract(stewardAddress, ArtStewardAbi, library);
                                await artSteward.connect(library.getSigner()).collectYield();
                              }}
                              type="submit"
                              className="inline-flex justify-center py-4 px-6 border border-transparent shadow-sm text-md font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                              Collect
                          </button>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }

              <div className="py-12 ">
                <h2 className="text-3xl">About</h2>

                <div className="py-5">As NFTs proliferate, how can we ensure that creators capture appropriate value?</div>

                <div className="pb-5">This artwork is the result of exploring this question, and looking for alternative ownership models that could answer it. It attempts to improve upon two existing royalty mechanisms:</div>

                <div className="pb-5">1. Secondary Sales Commissions - While this is a huge step forward, the creator only earns when the item changes hands. How can we increase turnover, or alternatively generate revenue in the absence of sales?</div>

                <div className="pb-5">2. Harberger Taxes - This mechanism solves the above, by putting the item "always on sale", and charging the owner a tax. But such a mechanism can be unappealing to people who are accustomed to traditional property rights.</div>

                <div className="pb-5">"This Artwork Earns Yield" combines both of these mechanisms, with a couple of tweaks:</div>
                <div className="pb-5">
                  - A fixed, refundable deposit, instead of fees that need to be topped up<br />
                  - Royalties paid with DeFi yield, instead of taxes
                </div>
                <div className="pb-5">While such a mechanism will not be appropriate for all NFTs, the hope is that the simpler UX may reduce friction enough to make it useful in some applications. </div>

                <div className="pb-5">We are also excited to start a conversation about how Ethereum's composability can be leveraged to create novel solutions to this challenge.</div>

                <h2 className="text-3xl pt-5">Credit</h2>

                <div className="pt-5"> - Made by <a className="underline" target="_blank" href="https://twitter.com/ptrwtts">@ptrwtts</a> and <a className="underline" target="_blank" href="https://github.com/georgeroman">@georgeroman</a></div>

                <div className="pt-2"> - Inspired by <a className="underline" target="_blank" href="https://thisartworkisalwaysonsale.com/">This Artwork Is Always On Sale</a></div>
                
                <div className="pt-2"> - Yield by <a className="underline" target="_blank" href="https://yearn.finance/vaults">Yearn Vaults</a></div>

                <div className="pt-2"> - Prompted by <a className="underline" target="_blank" href="https://nfthack.ethglobal.co/">NFT Hack</a> (unofficial submission because we forgot to signup 😭)</div>

                <h2 className="text-3xl pt-10">Disclaimers</h2>

                <div className="pt-5"> - Please review <a className="underline" target="_blank" href="https://github.com/georgeroman/this-artwork-earns-yield">contract code</a>. Use at your own risk.</div>

                <div className="pt-2"> - Yield is not guaranteed to be positive 🙈</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
