import "./Footer.scss";
import React from "react";
import { Link, withRouter } from "react-router-dom";

// function Footer() {

//   return (
//     <>
//       <div id="footer-wrapper">
//         <h1 id="footer">Footer Placeholder</h1>
//       </div>
//     </>
//   )
// }

// export default Footer;


const Footer = () => {

  return (
    <footer>
      <div className="footer-container">
        <div className="footer-profile-container">
          <div className="footer-col-name">
            <h2>Taowei Li</h2>
            <div className="footer-col-item">
              {" "}
              <a href="https://github.com/TaoweiLi" target="_blank">
                Github
              </a>
              <a href="https://github.com/TaoweiLi" target="_blank">
                Linkedin
              </a>
            </div>
          </div>
          <div className="footer-col-name">
            <h2>TECHNOLOGIES</h2>
            <div>
              <div className="footer-col-item">JavaScript, Ruby, SCSS</div>
              <div className="footer-col-item">Ruby on Rails</div>
              <div className="footer-col-item">React</div>
              <div className="footer-col-item">Redux</div>
              <div className="footer-col-item">Amazon Web Services S3</div>
              <div className="footer-col-item">Google Map API</div>
              <div className="footer-col-item">PostgreSQL</div>
            </div>
          </div>
          <div className="footer-col-name">
            <h2>ABOUT AUTHOR</h2>
            <div>
              <ul className="author-info">
                <li>
                  <a href="https://github.com/TaoweiLi" target="_blank">
                    <i className="fa-brands fa-github fa-3x"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="compliance">
          <ul>
            <li>Terms of Use</li>
            <li>Do Not Sell</li>
            <li>Not a Link</li>
          </ul>
          <p>
            Copyright © 2022 ResTable, Inc. 100 VacateTable Street, San Francisco, CA 10000 -
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default withRouter(Footer);