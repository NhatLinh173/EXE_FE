import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import "../assets/css/AuthCss.css";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
export const Login = (props) => {
  const [userId, setUserId] = useState(null);
  const formsRef = useRef(null); // Sử dụng useRef để tham chiếu đến phần tử HTML có class là "forms"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const history = useHistory();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }
    try {
      const response = await axios.post(
        "https://exe-be.onrender.com/auth/register",
        {
          email,
          password,
        }
      );
      if (response.status === 201) {
        toast.success("Đăng Ký Thành Công", { autoClose: 3000 });
      } else {
        toast.error("Đăng Ký Không Thành Công", { autoClose: 3000 });
      }

      console.log("Register response: ", response.data);
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error(" Đăng Ký Thất Bại", { autoClose: 3000 });
      } else {
        console.error("Register error: ", error);
      }
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      if (response.status === 200) {
        toast.success("Đăng Nhập Thành Công", { autoClose: 3000 });
        localStorage.setItem("token", response.data.token);
      } else if (response.status === 500) {
        toast.success("Đăng Nhập Thất Bại", { autoClose: 3000 });
      }

      console.log("Login response: ", response.data);

      history.push("/");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 500) {
        toast.error("Đăng Nhập Thất Bại", { autoClose: 3000 });
      } else {
        console.error("Login error: ", error);
      }
    }
  };

  useEffect(() => {
    const pwShowHide = document.querySelectorAll(".eye-icon");
    const links = document.querySelectorAll(".link");

    pwShowHide.forEach((eyeIcon) => {
      eyeIcon.addEventListener("click", () => {
        let pwFields =
          eyeIcon.parentElement.parentElement.querySelectorAll(".password");

        pwFields.forEach((password) => {
          if (password.type === "password") {
            password.type = "text";
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return;
          }
          password.type = "password";
          eyeIcon.classList.replace("bx-show", "bx-hide");
        });
      });
    });

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        formsRef.current.classList.toggle("show-signup");
      });
    });
  }, []);
  return (
    <section
      ref={formsRef}
      className="container-login forms"
      style={{ paddingTop: "70px" }}
    >
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      <div className="form login">
        <div className="form-content">
          <header>Đăng Nhập</header>
          <form action="#">
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Mật Khẩu"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bx bx-hide eye-icon" />
            </div>
            <div className="form-link">
              <a href="#" className="forgot-pass">
                Quên Mật Khẩu?
              </a>
            </div>
            <div className="field button-field">
              <button onClick={handleLogin}>Đăng Nhập</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Bạn chưa có tài khoản?{" "}
              <a
                href="#"
                className="link signup-link"
                style={{ textDecoration: "none" }}
              >
                Đăng Ký
              </a>
            </span>
          </div>
        </div>
        <div className="line" />
        <div className="media-options">
          <a href="#" className="field facebook">
            <FontAwesomeIcon
              icon={faFacebook}
              style={{ marginRight: "10px" }}
            />
            <span>Đăng Nhập Với Facebook</span>
          </a>
        </div>
        <div className="media-options" style={{ marginBottom: "10px" }}>
          <a href="#" className="field google">
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: "10px" }} />
            <span>Đăng Nhập Với Google</span>
          </a>
        </div>
      </div>
      {/* Signup Form */}
      <div className="form signup">
        <div className="form-content">
          <header>Đăng Ký</header>
          <form action="#">
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Mật Khẩu "
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="field input-field">
              <input
                type="password"
                placeholder="Xác Nhận Mật Khẩu"
                className="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i className="bx bx-hide eye-icon" />
            </div>
            <div className="field button-field">
              <button onClick={handleRegister}>Đăng Ký</button>
            </div>
          </form>
          <div className="form-link">
            <span>
              Bạn đã có tài khoản?{" "}
              <a
                href="#"
                className="link login-link"
                style={{ textDecoration: "none" }}
              >
                Đăng Nhập
              </a>
            </span>
          </div>
        </div>
        <div className="line" />
        <div className="media-options">
          <a href="#" className="field facebook">
            <FontAwesomeIcon
              icon={faFacebook}
              style={{ marginRight: "10px" }}
            />
            <span>Đăng Nhập Với Facebook</span>
          </a>
        </div>
        <div className="media-options">
          <a href="#" className="field google">
            <FontAwesomeIcon icon={faGoogle} style={{ marginRight: "10px" }} />
            <span>Đăng Nhập Với Google</span>
          </a>
        </div>
      </div>
    </section>
  );
};
