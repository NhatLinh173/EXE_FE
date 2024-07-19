import React, { useEffect, useState } from "react";
import axios from "axios";
import backgroundImage from "../assets/img/RSL1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import img from "../assets/img/R2.png";
import { Link } from "react-router-dom";
import "../assets/css/HeaderCss.css";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import Service from "../components/service";
import About from "../components/about";
import Category from "./category";

export const Header = (props) => {
  return (
    <>
      <header id="header" style={{ marginTop: "22px" }}>
        <div className="intro">
          <div
            className="overlay"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1 style={{ fontSize: "42px", lineHeight: "1.2" }}>
                    {" "}
                    <span style={{ color: "#7FFF00" }}>Rau củ</span> từ quê
                    hương,
                    <br />
                    gửi <span style={{ color: "#7FFF00" }}>yêu thương</span> đến
                    thành phố.
                  </h1>
                  <span
                    style={{
                      fontSize: "16px",
                      lineHeight: "1.2",
                      color: "#FFFFFF",
                    }}
                  >
                    Từ những rau củ mà đất quê sản sinh, chúng ta truyền đi
                    không chỉ là thực phẩm bổ dưỡng mà còn là những dòng yêu
                    thương tươi mới, lan tỏa từ vùng quê tới nhịp sống hối hả
                    của thành phố.
                  </span>
                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Service />
      <About />
      <Category />
    </>
  );
};
