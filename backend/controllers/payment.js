const axios = require("axios");
const headers = { "Content-Type": "application/json" };

module.exports = {
  Add: async (req, res) => {
    const url = "https://developers.flouci.com/api/generate_payment";
    const payload = {
      app_token: "82ac1884-b496-4809-87ec-f608fab2d4ab",
      app_secret: process.env.FLOUCI_SECRET,
      amount: "3000",
      accept_card: "true",
      success_link: "http://localhost:5173/success",
      fail_link: "https://localhost:5173/fail",
      developer_tracking_id: "94c102aa-24ca-428d-9446-d19f4cf07462",
    };
    const headers = {
      "Content-Type": "application/json",
    };
    await axios
      .post(url, payload, { headers })
      .then((result) => {
        res.send(result.data);
      })
      .catch((err) => console.error(err.message));
  },
  verify: async (req, res) => {
    const id_payment = req.params.id;
    console.log(id_payment);
    const url = `https://developers.flouci.com/api/verify_payment/${id_payment}`;

    await axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
          apppublic: "82ac1884-b496-4809-87ec-f608fab2d4ab",
          appsecret: process.env.FLOUCI_SECRET,
        },
      })
      .then((result) => {
        res.send(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  },
};
