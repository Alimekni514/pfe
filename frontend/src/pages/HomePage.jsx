import React from "react";
import Navigation from "./Navigation";
import dancing from "../assets/Images/home/dancingman.png";
import saxo from "../assets/Images/home/saxophone.png";
import saxophone from "../assets/Images/home/saxophoone.png";
import { FcMusic } from "react-icons/fc";
import { FaGraduationCap ,FaYoutube} from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaToolbox } from "react-icons/fa";
import { AiFillStar, AiOutlineStar ,AiOutlineInstagram,AiOutlineWhatsApp} from "react-icons/ai";
import { GiMusicalScore } from "react-icons/gi";
import { Ri24HoursFill } from "react-icons/ri";
import {GrFacebookOption} from "react-icons/gr"
import logoconservatoire from "../assets/Images/logoconservatoire.png"
import "../Css/Home/Home.css";
function HomePage() {
  return (
    <>
      <Navigation />
      <div className="fpart">
        <div className="fpartheader">
          <h3>The first online music school in Tunisia</h3>
          <p>
            The most complete music lessons on the web, with renowned teachers
            and artists, with unlimited access. Hundreds of hours of lessons,
            scores and tablatures for all levels.
          </p>

          <div className="fpartbuttons">
            <button>Sign Up</button>
            <button>Our Offers</button>
            <img src={saxo} alt="instrument" className="saxo" />
          </div>
        </div>

        <img src={dancing} alt="dancing" />
      </div>

      <div className="spart">
        <h2>
          <span
            style={{
              display: "inline-block",
              fontSize: "30px",
              color: "#f64f64",
            }}
          >
            &#x1d160;
          </span>
          The most complete tool on the web to start, learn and practice music
          <span
            style={{
              display: "inline-block",
              fontSize: "30px",
              color: "#f64f64",
            }}
          >
            &#x1d160;
          </span>
        </h2>
        <p className="spartp">
          Start, play and progress with a platform designed for all musicians.
          Whether you are a beginner or experienced, amateur or professional,
          student or teacher, enjoy an optimized environment and quality
          content.
        </p>
        <div class="services" id="services">
          <div class="container">
            <div class="box">
              <FcMusic />
              <h3>All styles of music</h3>
              <div class="info">
                <a href="#">Details</a>
              </div>
            </div>
            <div class="box">
              <FaGraduationCap />
              <h3>Online music lessons</h3>
              <div class="info">
                <a href="#">Details</a>
              </div>
            </div>
            <div class="box">
              <BsFillPeopleFill />
              <h3>All levels, from beginner to expert</h3>
              <div class="info">
                <a href="#">Details</a>
              </div>
            </div>
            <div class="box">
              <FaToolbox />
              <h3>Interactive tools for musicians</h3>
              <div class="info">
                <a href="#">Details</a>
              </div>
            </div>
            <div class="box">
              <GiMusicalScore />
              <h3>Partitions</h3>
              <div class="info">
                <a href="#">Design</a>
              </div>
            </div>
            <div class="box">
              <i class="fas fa-bullhorn fa-4x"></i>
              <Ri24HoursFill />
              <h3>Unlimited access 24h/24</h3>
              <div class="info">
                <a href="#">Details</a>
              </div>
            </div>
          </div>
        </div>
        <div className="instrumentsparts">
          <img src={saxophone} alt="instruments" />
          <img src={saxophone} alt="instruments" />
          <h2>
            The widest choice of musical instruments, vocals, studio-MAO, theory
          </h2>
          <p>
            Unlimited access to all courses and content. Start on the instrument
            without prior knowledge of music theory, musical theory is taught as
            you progress. Full theory modules are available if needed.
          </p>
        </div>

        {/* Start Gallery */}
        <div class="gallery" id="gallery">
          <div class="container">
            <div class="box">
              <div class="image">
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/1152/1152179.png"
                  }
                  alt=""
                />
              </div>
              <p>
                An electric guitar is a type of guitar that uses electronic
                amplification to produce sound. Unlike an acoustic guitar, which
                relies solely on the vibration of the strings to create sound,
                an electric guitar uses pickups, a preamp, and an amplifier to
                produce a louder, more distorted, or more nuanced sound.
              </p>
            </div>
            <div class="box">
              <div class="image">
                <img
                  src={
                    "https://cdn-icons-png.flaticon.com/512/4702/4702764.png"
                  }
                  alt=""
                />
              </div>
              <p>
                The piano is a musical instrument that is played by pressing
                keys on a keyboard. It produces sound by using hammers inside
                the instrument to strike strings, which then vibrate and create
                sound. The piano is a versatile instrument that can be used to
                play a wide range of musical styles, from classical and jazz to
                pop and rock.
              </p>
            </div>
            <div class="box">
              <div class="image">
                <img
                  src={
                    "https://cdn0.iconfinder.com/data/icons/musical-instruments-color-set/144/Instruments_1045001-512.png"
                  }
                  alt=""
                />
              </div>
              <p>
                The violin is a string instrument that is played with a bow. It
                has four strings, typically tuned to G, D, A, and E, and
                produces sound by the vibration of the strings when the bow is
                drawn across them. The violin is used in many different musical
                genres, including classical, folk, and pop music.
              </p>
            </div>
            <div class="box">
              <div class="image">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6171/6171044.png"
                  alt=""
                />
              </div>
              <p>
                The trumpet is a brass instrument that is played by buzzing the
                lips into a cup-shaped mouthpiece. It has three valves that,
                when pressed down, change the length of tubing the air travels
                through, allowing the player to produce different notes. The
                trumpet is a versatile instrument that is used in many different
                musical genres, including classical, jazz, and pop music.
              </p>
            </div>
            <div class="box">
              <div class="image">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3582/3582054.png"
                  alt=""
                />
              </div>
              <p>
                The clarinet is a woodwind instrument that is played by blowing
                air through a single reed attached to the mouthpiece. It has a
                cylindrical bore and a flared bell, and produces sound by the
                vibration of the reed when air is blown through it. The clarinet
                has a unique sound and is used in many different musical genres,
                including classical, jazz, and folk music.
              </p>
            </div>
            <div class="box">
              <div class="image">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2972/2972066.png"
                  alt=""
                />
              </div>
              <p>
                Drums are percussion instruments that are played by striking or
                hitting them with sticks, brushes, or the hands. They consist of
                a drumhead, which is stretched over a shell or frame, and
                produce sound by the vibration of the drumhead when it is
                struck. Drums come in many different sizes and shapes, from
                small hand drums to large bass drums.
              </p>
            </div>
          </div>
        </div>
        {/* End Gallery  */}
        {/* <!-- start Features --> */}
        <div class="features" id="features">
          <h2 class="main-title">Features</h2>
          <div class="container">
            <div class="box quality">
              <div class="img-holder">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5625/5625642.png"
                  alt=""
                />
              </div>
              <h2>Make life easier</h2>
              <p>
                Find everything you need to learn and practice music on one
                platform. Connect to your course space and find your progress
                from any computer, tablet or phone. No need for appointments,
                take your lessons when you are available.
              </p>
              <a href="#">More</a>
            </div>
            <div class="box time">
              <div class="img-holder">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/7440/7440927.png"
                  alt=""
                />
              </div>
              <h2>Be better accompanied</h2>
              <p>
                Face-to-face lessons are half an hour or one hour times a week,
                and about thirty weeks a year. You are essentially alone at home
                to practice the instrument. our online lessons accompany you
                every day, our teams are available from Monday to Saturday by
                courier, 52 weeks per year.
              </p>
              <a href="#">More</a>
            </div>
            <div class="box passion">
              <div class="img-holder">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/4305/4305432.png"
                  alt=""
                />
              </div>
              <h2>Gain Time</h2>
              <p>
                Stop wasting your time looking for content on YouTube or the
                web, stop watching ads. If you don't have time to go to a music
                school or conservatory, and still want to learn how to play
                music, our online school is here for you!
              </p>
              <a href="#">More</a>
            </div>
          </div>
        </div>
        {/* <!-- End Features --> */}
        {/* <!-- Start Testimonials --> */}
        <div class="testimonials" id="testimonials">
          <h2 class="main-title">Testimonials</h2>
          <div class="container">
            <div class="box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
                alt=""
              />
              <h3>Mohamed Farag</h3>

              <div class="rate">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>
                I recommend this site to anyone who wants to learn music. I
                wanted to have a little fun playing the harmonica, today I play
                about fifty scores almost by heart.
              </p>
            </div>
            <div class="box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
                alt=""
              />
              <h3>Mohamed Ibrahim</h3>

              <div class="rate">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
                <AiOutlineStar />
              </div>
              <p>
                Thank you very much, the courses are complete and I will learn
                them all (no, it will be difficult but good...)
              </p>
            </div>
            <div class="box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
                alt=""
              />
              <h3>Shady Nabil</h3>

              <div class="rate">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <p>Very good course, very progressive and very well explained!</p>
            </div>
            <div class="box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
                alt=""
              />
              <h3>Amr Hendawy</h3>

              <div class="rate">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <p>
                I am satisfied with the guitar lessons and having the chance to
                learn the chords of Rose's songs.
              </p>
            </div>
            <div class="box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
                alt=""
              />
              <h3>Sherief Ashraf</h3>

              <div class="rate">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>
                Very interesting course for those who already have a good level
                in guitar
              </p>
            </div>
            <div class="box">
              <img
                src="https://cdn-icons-png.flaticon.com/512/5556/5556468.png"
                alt=""
              />
              <h3>Osama Mohamed</h3>

              <div class="rate">
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar />
              </div>
              <p>
                Very good course for those who know the notes on the handle and
                who are intermediate or confirmed in the field of electric and
                acoustic guitar. See you!
              </p>
            </div>
          </div>
        </div>
        {/* <!-- End Testimonials --> */}
      </div>
      <div className="footer" style={{backgroundColor:"#fff",padding:"80px 0px",position:"relative"}}>
            <img src="https://cdn-icons-png.flaticon.com/512/3582/3582054.png" alt="" style={{position:"absolute",right:"0",top:"0",width:"90px"}}/>
          <img src="https://cdn-icons-png.flaticon.com/512/3582/3582054.png" alt="" style={{position:"absolute",left:"0",top:"0",width:"90px",transform: "rotateZ(269deg)"}}/>

        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                <div className="footerf">
                      <img src={logoconservatoire} alt="logo" style={{width:"150px"}}/>
                      <p style={{maxWidth:"400px",color:"#666",lineHeight:"1.6",marginTop:"15px"}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium voluptatem ducimus deserunt veritatis accusamus.</p>
                </div>
                <div className="navigation" >
                  <h5 style={{fontSize:"18px",marginBottom:"20px"}}>Navigation</h5>
                  <ul style={{listStyle:"none"}}>
                  <li style={{padding:"10px"}}><a  style={{ textDecoration:"none",color:"#666"}}href="#">Home</a></li>
                  <li style={{padding:"10px"}}><a  style={{ textDecoration:"none",color:"#666"}}href="#">Contact</a></li>
                  <li style={{padding:"10px"}}><a  style={{ textDecoration:"none",color:"#666"}}href="#">Service</a></li> 
                  <li style={{padding:"10px"}}><a  style={{ textDecoration:"none",color:"#666"}}href="#">SignIn</a></li>
                  </ul>
                 
                </div>
                <div className="contact">
                <h5 style={{fontSize:"18px",marginBottom:"20px"}}>Contact</h5>
                   <p>11 rue 6458 ariana cité gazelle</p>
                    <div style={{display:"flex",justifyContent:"flex-start",alignItems:"center",gap:"15px",margin:"15px 0px"}}>
                          <GrFacebookOption style={{fontSize:"20px"}}/>
                          <AiOutlineInstagram style={{fontSize:"20px"}}/>
                          <FaYoutube style={{fontSize:"20px"}}/>
                          <AiOutlineWhatsApp style={{fontSize:"20px"}}/>
                    </div>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"flex-start"}}>

                    </div>
                </div>
                
        </div>

      </div>
    </>
  );
}

export default HomePage;
