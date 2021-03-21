// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200
  res.json({
    "id": 13,
    "external_url": "https://thisartworkearnsyield.com/",
    "image": "https://thisartworkearnsyield.com/art.png",
    "name": "This Artwork Earns Yield",
    "description": "An NFT that earns royalties for the artist using DeFi yield: https://thisartworkearnsyield.com/"
  })
}
