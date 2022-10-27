// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "POST") {
    const cred = JSON.parse(req.body);
    const options = {
      method: "POST",
      headers: {
        Authorization: process.env.XATA,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cred),
    };

    fetch(
      "https://adesanya-joshua-ayodeji-s-workspace-53aqad.eu-west-1.xata.sh/db/CloudDrop:main/tables/files/data?columns=id",
      options
    )
      .then((response) => response.json())
      .then((response) => res.status(200).json(response))
      .catch((err) => console.error(err));
  } else if (req.method === "GET") {
    const search = req.query.search;

    const options = {
      method: "POST",
      headers: { Authorization: process.env.XATA },
      body: `{"filter":{"userid":{"$contains":"${search}"}},"page":{"size":15}}`,
    };

    fetch(
      "https://adesanya-joshua-ayodeji-s-workspace-53aqad.eu-west-1.xata.sh/db/CloudDrop:main/tables/files/query",
      options
    )
      .then((response) => response.json())
      .then((response) => res.status(200).json(response.records))
      .catch((err) => console.error(err));
    // Handle any other HTTP method
  }
}
