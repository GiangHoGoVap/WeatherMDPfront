import React from 'react';
import "./about.css";
import pic from "./hcmut.png";
import Navbar from '../../components/Navbar/Navbar';
const About =() =>{
    return (
    <div className='About'>
        <Navbar/>
        <div class="about-section">
  <h1>About MDP</h1>
  
  <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
</div>

<h2 >Our Team</h2>
<div class="row">
  <div class="column">
    <div class="card">
      <img src={pic}  alt="Cam" width="50" height="50"/>
      <div class="container">
        <h2>Le Duc Cam</h2>
        <p class="title">Member</p>
        <p>Some text that describes me.</p>
        <p>cam.levt123@hcmut.edu.vn</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>
   
   
  <div class="column">
    <div class="card">
      <img src={pic}  alt="Cam" width="50" height="50"/>
      <div class="container">
        <h2>Nguyen Le Nhat Duong</h2>
        <p class="title">Member</p>
        <p>Some text that describes me.</p>
        <p>cam.levt123@hcmut.edu.vn</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src={pic}  alt="Cam" width="50" height="50"/>
      <div class="container">
        <h2>Nguyen Minh Tam</h2>
        <p class="title">Member</p>
        <p>Some text that describes me.</p>
        <p>cam.levt123@hcmut.edu.vn</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src={pic}  alt="Cam" width="50" height="50"/>
      <div class="container">
        <h2>Le Minh Khoi</h2>
        <p class="title">Member</p>
        <p>Some text that describes me.</p>
        <p>cam.levt123@hcmut.edu.vn</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

  <div class="column">
    <div class="card">
      <img src={pic}  alt="Cam" width="50" height="50"/>
      <div class="container">
        <h2>Nam</h2>
        <p class="title">Member</p>
        <p>Some text that describes me.</p>
        <p>cam.levt123@hcmut.edu.vn</p>
        <p><button class="button">Contact</button></p>
      </div>
    </div>
  </div>

</div>
</div>
    );

}
export default About;