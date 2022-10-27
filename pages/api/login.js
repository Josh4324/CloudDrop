// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "POST") {
    const email = JSON.parse(req.body).email;
    console.log(email);
    const options = {
      method: "POST",
      headers: {
        Authorization: process.env.XATA,
        "Content-Type": "application/json",
      },
      body: `{"filter":{"email":{"$contains":"${email}"}},"page":{"size":15}}`,
    };

    fetch(
      "https://adesanya-joshua-ayodeji-s-workspace-53aqad.eu-west-1.xata.sh/db/CloudDrop:main/tables/users/query",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return res.status(200).json(response.records);
      })
      .catch((err) => console.error(err));
  } else {
    // Handle any other HTTP method
  }
}
