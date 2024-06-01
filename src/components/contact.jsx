import { useState } from "react";
import emailjs from "emailjs-com";
import React from "react";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  message: "",
};
export const Contact = (props) => {
  const [{ name, email, message }, setState] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const clearState = () => setState({ ...initialState });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, message);
    const data = {
      email: email,
    };
    axios
      .post("http://localhost:3000/sendEmail", data)
      .then((response) => {
        console.log(response.data);
        clearState();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div id="contact" style={{ padding: "20px 0px 20px 0px" }}>
        <div className="container">
          <div className="col-md-8">
            <div className="row">
              <div className="section-title">
                <h2>Liên Lạc</h2>
                <p>
                  Vui lòng điền vào mẫu dưới đây để gửi email cho chúng tôi và
                  chúng tôi sẽ liên hệ lại với bạn sớm nhất có thể.
                </p>
              </div>
              <form name="sentMessage" validate onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Tên"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                        onChange={handleChange}
                      />
                      <p className="help-block text-danger"></p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Lời Nhắn"
                    required
                    onChange={handleChange}
                  ></textarea>
                  <p className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button type="submit" className="btn btn-custom btn-lg">
                  Gửi Thông Tin
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-3 col-md-offset-1 contact-info">
            <div className="contact-item">
              <h3>Thông Tin Liên Lạc</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Địa Chỉ
                </span>
                <p style={{ color: "#FFF  " }}>Đại Học FPT Đà Nẵng</p>
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Số Điện Thoại
                </span>{" "}
                <p style={{ color: "#FFF" }}>0386405371</p>
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                </span>{" "}
                <p style={{ color: "#FFF" }}>Greenfreshhk16@gmail.com</p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
