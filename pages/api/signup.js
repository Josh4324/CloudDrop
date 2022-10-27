// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "POST") {
    const cred = JSON.parse(req.body);

    const coptions = {
      method: "POST",
      headers: {
        Authorization: process.env.XATA,
        "Content-Type": "application/json",
      },
      body: `{"filter":{"email":{"$contains":"${cred.email}"}},"page":{"size":15}}`,
    };
    const options = {
      method: "POST",
      headers: {
        Authorization: process.env.XATA,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cred),
    };

    fetch(
      "https://adesanya-joshua-ayodeji-s-workspace-53aqad.eu-west-1.xata.sh/db/CloudDrop:main/tables/users/query",
      coptions
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("here", response);
        if (response) {
          return res.status(400).json({ message: "User already exists" });
        } else {
          console.log("2");
          fetch(
            "https://adesanya-joshua-ayodeji-s-workspace-53aqad.eu-west-1.xata.sh/db/CloudDrop:main/tables/users/data?columns=id",
            options
          )
            .then((response) => response.json())
            .then((response) => res.status(200).json(response))
            .catch((err) => console.error(err));
        }
      })
      .catch((err) => console.error(err));
  } else {
    // Handle any other HTTP method
  }
}
