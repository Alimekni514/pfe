import React from "react";
import Navigation from "./Navigation";
import man from "../assets/Images/About/man.png";
import woman from "../assets/Images/About/woman.png";
import saxo from "../assets/Images/home/saxophone.png";
import { FaGraduationCap, FaYoutube } from "react-icons/fa";
import { GrFacebookOption } from "react-icons/gr";
import logoconservatoire from "../assets/Images/logoconservatoire.png";
import {
  AiFillStar,
  AiOutlineStar,
  AiOutlineInstagram,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import "../Css/About/About.css";

function About() {
  return (
    <div>
      <Navigation />
      <div className="fpart">
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <img src={woman} className="woman" alt="hello" />
          <div className="fpartheader">
            <h3>Ariana Conservatory &#10084;</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A ut
              dolore mollitia iusto quas voluptatum officia sit nesciunt iure
              quaerat quos voluptate deleniti animi tempora voluptatibus, aut
              vero quam enim?
            </p>

            <div className="fpartbuttons">
              <button>Sign Up</button>

              <img src={saxo} alt="instrument" className="saxo" />
            </div>
          </div>

          <img src={man} alt="dancing" className="man" />
        </div>
      </div>
      {/* !-- Start Team --> */}
      <div class="team" id="team">
        <h2 class="teammebers">Team Members</h2>
        <div class="container">
          <div class="box">
            <div class="data">
              <img
                src="https://c.superprof.com/i/a/742724/565160/600/20230117152659/professeur-violon-ecole-musique-propose-cours-violon-niveaux.jpg"
                alt=""
              />
              <div class="social">
                <a href="#">
                  <GrFacebookOption />
                </a>
                <a href="#">
                  <AiOutlineInstagram />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <AiOutlineWhatsApp />
                </a>
              </div>
            </div>
            <div class="info">
              <h3>Salim</h3>
              <p>Jazz</p>
            </div>
          </div>
          <div class="box">
            <div class="data">
              <img
                src="https://professeur-musique.com/sites/default/files/styles/professeurs/public/photos/basse_resolution_%C2%A9annie_ethier_151A3760-Modifier%282%29.jpg?itok=q4IJ8X0T"
                alt=""
              />
              <div class="social">
                <a href="#">
                  <GrFacebookOption />
                </a>
                <a href="#">
                  <AiOutlineInstagram />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <AiOutlineWhatsApp />
                </a>
              </div>
            </div>
            <div class="info">
              <h3>Mostpha</h3>
              <p>Pop / Rock</p>
            </div>
          </div>
          <div class="box">
            <div class="data">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZ4aozd7otV7dG_iAYWwK4PMxm9edgxOaa787p9pkwYvSLDGtNEgqnqk0n5aUR1rdfT1M&usqp=CAU"
                alt=""
              />
              <div class="social">
                <a href="#">
                  <GrFacebookOption />
                </a>
                <a href="#">
                  <AiOutlineInstagram />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <AiOutlineWhatsApp />
                </a>
              </div>
            </div>
            <div class="info">
              <h3>Wael</h3>
              <p>Pop / Rock</p>
            </div>
          </div>
          <div class="box">
            <div class="data">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT06wWA5MwjCkBMLJ0L7MHnpU451XBGdoobJQ&usqp=CAU"
                alt=""
              />
              <div class="social">
                <a href="#">
                  <GrFacebookOption />
                </a>
                <a href="#">
                  <AiOutlineInstagram />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <AiOutlineWhatsApp />
                </a>
              </div>
            </div>
            <div class="info">
              <h3>Salma</h3>
              <p>Violon</p>
            </div>
          </div>
          <div class="box">
            <div class="data">
              <img
                src="https://www.planete-jazz.fr/wp-content/uploads/2022/03/LUISAVERTY.jpg"
                alt=""
              />
              <div class="social">
                <a href="#">
                  <GrFacebookOption />
                </a>
                <a href="#">
                  <AiOutlineInstagram />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <AiOutlineWhatsApp />
                </a>
              </div>
            </div>
            <div class="info">
              <h3>Raouf</h3>
              <p>Metal</p>
            </div>
          </div>
          <div class="box">
            <div class="data">
              <img
                src="https://www.planete-jazz.fr/wp-content/uploads/2022/03/CHRISTIANDUPONT.jpg"
                alt=""
              />
              <div class="social">
                <a href="#">
                  <GrFacebookOption />
                </a>
                <a href="#">
                  <AiOutlineInstagram />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <AiOutlineWhatsApp />
                </a>
              </div>
            </div>
            <div class="info">
              <h3>Raouf</h3>
              <p>Folk</p>
            </div>
          </div>
          <div class="box">
            <div class="data">
              <img
                src="https://www.planete-jazz.fr/wp-content/uploads/2022/03/JIMMYCOCHET.jpg"
                alt=""
              />
              <div class="social">
                <a href="#">
                  <GrFacebookOption />
                </a>
                <a href="#">
                  <AiOutlineInstagram />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <AiOutlineWhatsApp />
                </a>
              </div>
            </div>
            <div class="info">
              <h3>Bilel</h3>
              <p>Afro / Reggae</p>
            </div>
          </div>
          <div class="box">
            <div class="data">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhhSbsWEX2lCOHflNwmm6dra5YGsK61RMQyfKrrgTaMTuo4Lo-SNIpLaWjzqTLiUg_dms&usqp=CAU"
                alt=""
              />
              <div class="social">
                <a href="#">
                  <GrFacebookOption />
                </a>
                <a href="#">
                  <AiOutlineInstagram />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <AiOutlineWhatsApp />
                </a>
              </div>
            </div>
            <div class="info">
              <h3>Roua</h3>
              <p>Coaching vocal / Jazz</p>
            </div>
          </div>
        </div>
      </div>
      <div class="spikes"></div>
      {/* <!-- End Team --> */}
      {/* <!-- start Pricing --> */}
      <div class="pricings">
        <h2 class="pricing-title">Pricings Tables</h2>
        <div class="container">
          <div class="box">
            <h2 class="title">junior pack</h2>
            <img src="imgs/hosting-basic.png" alt="" />
            <div class="price">
              <span class="amount">70 DT</span>
              <span class="period">Per Month</span>
            </div>
            <ul>
              <li>Orchestra once a week</li>
              <li>individual lesson 30 minutes per week</li>
              <li>access 24 hours/24 to the platform</li>
              <li>Basic Support</li>
            </ul>
            <a href="#">Choose Plan</a>
          </div>
          <div class="box popular">
            <h2 class="title">Advanced Pack</h2>
            <span class="mostpopular">Most popular</span>
            <img src="imgs/hosting-basic.png" alt="" />
            <div class="price">
              <span class="amount">120 DT</span>
              <span class="period">Per Month</span>
            </div>
            <ul>
              <li>individual lesson 1 hour per week</li>
              <li>Orchestra once a week</li>
              <li>souffle lesson once a week</li>
              <li>musical history lesson once a week</li>
              <li>access 24 hours/24 to the platform</li>
              <li>Advanced Support</li>
            </ul>
            <a href="#">Choose Plan</a>
          </div>
          <div class="box">
            <h2 class="title">Professional Pack</h2>
            <img src="imgs/hosting-basic.png" alt="" />
            <div class="price">
              <span class="amount">90DT </span>
              <span class="period">Per Month</span>
            </div>
            <ul>
              <li>musical history lesson once a week</li>
              <li>20 Email Adresses</li>
              <li>Orchestra once a week</li>
              <li>access 24 hours/24 to the platform</li>
              <li>Professional Support</li>
            </ul>
            <a href="#">Choose Plan</a>
          </div>
        </div>
      </div>
      {/* <!-- End Pricing --> */}
      {/* start footer  */}
      <div
        className="footer"
        style={{
          backgroundColor: "#fff",
          padding: "80px 0px",
          position: "relative",
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/3582/3582054.png"
          alt=""
          style={{ position: "absolute", right: "0", top: "0", width: "90px" }}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/512/3582/3582054.png"
          alt=""
          style={{
            position: "absolute",
            left: "0",
            top: "0",
            width: "90px",
            transform: "rotateZ(269deg)",
          }}
        />

        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="footerf">
            <img
              src={logoconservatoire}
              alt="logo"
              style={{ width: "150px" }}
            />
            <p
              style={{
                maxWidth: "400px",
                color: "#666",
                lineHeight: "1.6",
                marginTop: "15px",
              }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium voluptatem ducimus deserunt veritatis accusamus.
            </p>
          </div>
          <div className="navigation">
            <h5 style={{ fontSize: "18px", marginBottom: "20px" }}>
              Navigation
            </h5>
            <ul style={{ listStyle: "none" }}>
              <li style={{ padding: "10px" }}>
                <a style={{ textDecoration: "none", color: "#666" }} href="#">
                  Home
                </a>
              </li>
              <li style={{ padding: "10px" }}>
                <a style={{ textDecoration: "none", color: "#666" }} href="#">
                  Contact
                </a>
              </li>
              <li style={{ padding: "10px" }}>
                <a style={{ textDecoration: "none", color: "#666" }} href="#">
                  Service
                </a>
              </li>
              <li style={{ padding: "10px" }}>
                <a style={{ textDecoration: "none", color: "#666" }} href="#">
                  SignIn
                </a>
              </li>
            </ul>
          </div>
          <div className="contact">
            <h5 style={{ fontSize: "18px", marginBottom: "20px" }}>Contact</h5>
            <p>11 rue 6458 ariana cité gazelle</p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "15px",
                margin: "15px 0px",
              }}
            >
              <GrFacebookOption style={{ fontSize: "20px" }} />
              <AiOutlineInstagram style={{ fontSize: "20px" }} />
              <FaYoutube style={{ fontSize: "20px" }} />
              <AiOutlineWhatsApp style={{ fontSize: "20px" }} />
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
