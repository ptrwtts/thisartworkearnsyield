// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200
  res.json({
    "id": 13,
    "external_url": "https://thisartworkearnsyield.com/",
    "image": "https://thisartworkearnsyield.com/art.png",
    "name": "This Artwork Earns Yield",
    "description": "https://thisartworkearnsyield.com/"
  })
}
