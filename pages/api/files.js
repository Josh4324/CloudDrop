// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "GET") {
    const search = req.query.search;
    const options = {
      method: "POST",
      headers: {
        Authorization: "Bearer xau_9D3hVxBgdCRx966VutmQnvwpKgaWSvFc5",
        "Content-Type": "application/json",
      },
      body: `{"filter":{"userid":"${search}"},"page":{"size":15}}`,
    };

    fetch(
      "https://adesanya-joshua-ayodeji-s-workspace-53aqad.eu-west-1.xata.sh/db/CloudDrop:main/tables/files/query",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        res.status(200).json(response.records);
      })
      .catch((err) => console.error(err));
  }
}
