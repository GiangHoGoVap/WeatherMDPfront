import React from "react";
import "./about.css";
import pic1 from "./cam_le.jpg";
import pic2 from "./duong_nguyen.jpg";
import pic3 from "./tam_nguyen.jpg";
import pic4 from "./khoi_le.jpg";
import pic5 from "./nam_nguyen.jpg";
import Navbar from "../../components/Navbar/Navbar";
const About = () => {
  return (
    <div className="About">
      <Navbar />
      <div class="about-section">
        <h1>MDP Group</h1>

        <p>
          <q>
            Learn as if you will live forever, live like you will die tomorrow.
          </q>
        </p>
        <address>Mahatma Gandhi</address>
      </div>

      <h2>Team Members</h2>
      <div class="row">
        <div class="column">
          <div class="card">
            <img src={pic1} alt="Cam" width="300" height="310" />
            <div class="container">
              <h2>Le Duc Cam</h2>
              <p class="title">Frontend Developer</p>
              <p>
                A youngster from Vung Tau who is dedicated to learn new things
                and like to hang out with friends.
              </p>
              <p>cam.levt123@hcmut.edu.vn</p>
              <p>
                <a href="https://www.facebook.com/cuoi.trang.92">
                  <button class="button">Contact</button>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img src={pic2} alt="Duong" width="300" height="310" />
            <div class="container">
              <h2>Nguyen Le Nhat Duong</h2>
              <p class="title">Backend Developer</p>
              <p>
                Youngblood from Da Nang city who can speak 5 different
                languages.
              </p>
              <p>duong.nguyen01@hcmut.edu.vn</p>
              <p>
                <a href="https://www.facebook.com/duongnguyennvl">
                  <button class="button">Contact</button>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img src={pic4} alt="Khoi" width="300" height="310" />
            <div class="container">
              <h2>Le Minh Khoi</h2>
              <p class="title">Team Leader/AI Developer</p>
              <p>
                Rich kid from District 7 who tries to hide himself under his
                mask and waits for his chance.
              </p>
              <p>khoi.le.pi2001@hcmut.edu.vn</p>
              <p>
                <a href="https://www.facebook.com/lekhoitdn">
                  <button class="button">Contact</button>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img src={pic5} alt="Nam" width="300" height="310" />
            <div class="container">
              <h2>Nguyen Dinh Nam</h2>
              <p class="title">IoT Developer</p>
              <p>
                A quiet Saigonese who loves food, traveling and is also a music
                producer.
              </p>
              <p>nam.nguyen.2003@hcmut.edu.vn</p>
              <p>
                <a href="https://www.facebook.com/nguyendinhnam20.03">
                  <button class="button">Contact</button>
                </a>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="card">
            <img src={pic3} alt="Tam" width="300" height="310" />
            <div class="container">
              <h2>Nguyen Minh Tam</h2>
              <p class="title">Frontend Developer</p>
              <p>
                A Saigonese who loves cats, basketball and always dreams big.
              </p>
              <p>tam.nguyen2702@hcmut.edu.vn</p>
              <p>
                <a href="https://www.facebook.com/anhtam.272">
                  <button class="button">Contact</button>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
