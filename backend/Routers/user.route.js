const routeModel = require("../models/user.model");
const route = require("express").Router();

route.post("/register", (req, res) => {
  routeModel
    .register(
      req.body.username,
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      req.body.password,
      req.body.role
    )
    .then((user) => res.status(200).json({ user: user, msg: "registred!!!" }))
    .catch((err) => res.json({ error: err }));
});
route.post("/login", (req, res) => {
  routeModel
    .login(req.body.email, req.body.password)
    .then((data) =>
      res.status(200).json({
        token: data.token,
        expiresIn: data.expiresIn,
        datauser: data.datauser,
      })
    )
    .catch((err) => res.status(201).json({ error: err }));
});
route.post("/forgot-password", async (req, res) => {
  routeModel
    .forgot(req.body.email)
    .then((data) => {
      res.status(200).json({
        status: data.status,
        link: data.link,
      });
    })
    .catch((err) => res.status(400).json({ error: err }));
});
route.post("/reset-password/:id/:token", async (req, res) => {
  routeModel
    .resetpassword(req.params.id, req.params.token, req.body.password)
    .then((data) => {
      res.status(200).json({
        status: data,
      });
    })
    .catch((err) => res.json({ error: err }));
});
route.get("/reset-password/:id/:token", async (req, res) => {
  routeModel
    .resetpasswordget(req.params.id, req.params.token)
    .then((data) => {
      res.json({ data: data });
    })
    .catch((err) => res.json({ error: err }));
});

module.exports = route;
