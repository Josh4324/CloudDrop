// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "GET") {
    const search = req.query.search;
    const options = {
      method: "POST",
      headers: {
        Authorization: process.env.XATA,
        "Content-Type": "application/json",
      },
      body: `{"filter":{"userid":"${search}"},"page":{"size":15}}`,
    };

    (async () => {
      try {
        const response = await fetch(
          `${process.env.database}:main/tables/files/query`,
          options
        );

        const data = await response.json();
        return res.status(200).json(data.records);
      } catch (err) {
        return res.status(500).json({ message: "An error occured" });
      }
    })();
  }
}
