const sendEmail = require("../services/sendGrid");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

let schemaUser = mongoose.Schema(
  {
    username: String,
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
  },
  {
    collection: "testo",
  }
);
var privatekey = "this is my secret key djhdk";
let url = "mongodb://localhost:27017/testTawa";
var User = mongoose.model("user", schemaUser);
exports.register = (username, firstname, lastname, email, password, role) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((doc) => {
        if (doc) {
          mongoose.disconnect();
          reject("we have this user in our database ");
        } else {
          bcrypt
            .hash(password, 10)
            .then((hashedpassword) => {
              let user = new User({
                username: username,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: hashedpassword,
                role: role,
              });
              user
                .save()
                .then((doc) => {
                  mongoose.disconnect();
                  resolve(doc);
                })
                .catch((err) => {
                  mongoose.disconnect();
                  reject(err);
                });
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
};
exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((user) => {
        if (!user) {
          mongoose.disconnect();
          reject("we dont have this email in our database!!!!!!");
        } else {
          bcrypt
            .compare(password, user.password)
            .then((same) => {
              if (same) {
                //send token
                const expirationTime = Math.floor(Date.now() / 1000) + 60 * 60;
                // Create the payload with the expiration time
                const payload = {
                  username: user.username, // the user ID
                  exp: expirationTime, // the expiration time as a Unix timestamp
                };
                console.log(payload);
                let token = jwt.sign({ user: user.username }, privatekey, {
                  expiresIn: "20m",
                });

                mongoose.disconnect();
                const paydata = {
                  token: token,
                  expiresIn: "20",
                  datauser: {
                    user: user.username,
                    tata: "tata",
                    role: user.role,
                  },
                };
                resolve(paydata);
                // jwt.decode(token) ken theb yraj3lek data
              } else {
                mongoose.disconnect();
                reject("invalid password or email");
              }
            })
            .catch((err) => {
              mongoose.disconnect();
              reject(err);
            });
        }
      });
  });
};

exports.forgot = (email) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return User.findOne({ email: email });
      })
      .then((OldUser) => {
        if (!OldUser) {
          reject("No User Found");
        } else {
          const secret = privatekey + OldUser.password;
          const token = jwt.sign(
            { email: OldUser.email, id: OldUser._id },
            secret,
            {
              expiresIn: "15m",
            }
          );
          const link = `http://localhost:3000/reset-password/${OldUser._id}/${token}`;
          sendEmail({
            to: OldUser.email,
            from: "ariana.conservatoire@gmail.com",
            subject: "Reset Password",
            text: ` this is your link : ${link}`,
          });
          const data = {
            link: link,
            status: "Email Sent",
          };
          resolve(data);
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};

exports.resetpasswordget = (id, token) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => User.findOne({ _id: id }))
      .then((oldUser) => {
        if (!oldUser) {
          reject("User not Found !!!!");
        } else {
          const secret = privatekey + oldUser.password;
          console.log(secret);
          try {
            const verify = jwt.verify(token, secret);
            resolve("verified");
          } catch (error) {
            console.log(error);
            reject("Not verified");
          }
        }
      })
      .catch((error) => {
        mongoose.disconnect();
        reject(error);
      });
  });
};
exports.resetpassword = (id, token, newpwd) => {
  return new Promise((resolve, reject) => {
    mongoose
      .connect(url)
      .then(() => {
        return User.findOne({ _id: id });
      })
      .then(async (oldUser) => {
        if (!oldUser) {
          reject("User doesn't exist");
        } else {
          const secret = privatekey + oldUser.password;
          try {
            const verify = jwt.verify(token, secret);
            const encryptedPassword = await bcrypt.hash(newpwd, 10);
            await User.updateOne(
              {
                _id: id,
              },
              {
                $set: {
                  password: encryptedPassword,
                },
              }
            );
            resolve("Password changed Successfully!!");
          } catch (error) {
            console.log("errorr", error);
            reject("Something went Wrong !");
          }
        }
      })
      .catch((err) => {
        mongoose.disconnect();
        reject(err);
      });
  });
};
