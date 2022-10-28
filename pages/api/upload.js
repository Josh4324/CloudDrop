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

    (async () => {
      try {
        const response = await fetch(
          `${process.env.database}:main/tables/files/data?columns=id`,
          options
        );

        const data = await response.json();
        return res.status(200).json(data);
      } catch (err) {
        return res.status(500).json({ message: "An error occured" });
      }
    })();
  }
}
