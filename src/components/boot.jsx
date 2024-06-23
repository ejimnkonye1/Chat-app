import { useState } from 'react';
import 'boxicons/css/boxicons.min.css';
import BackgroundImage from '../../assets/pexels-pixabay-276452.jpg';
import './Login.css'

const LoginRegister = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [isPopupActive, setIsPopupActive] = useState(false);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div
        className="d-flex align-items-center justify-content-center min-vh-100 position-relative"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <header className="position-fixed w-100 top-0 end-0 z-3 bg-primary p-3 d-flex align-items-center justify-content-between">
          <div className="fs-1 fw-bold text-white">BILLIE(NZ) YARN</div>
          <nav className="d-flex align-items-center">
            {['About', 'Services', 'Contact'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white fs-5 fw-medium me-4 position-relative hover-effect"
                style={{ transition: 'all 0.45s' }}
              >
                {item}
              </a>
            ))}
            <button
              onClick={() => setIsPopupActive(!isPopupActive)}
              className="btn btn-outline-light fs-5 fw-medium transition-transform"
              style={{ transform: 'scale(1.1)' }}
            >
              Login
            </button>
          </nav>
        </header>
  
        <div
          className={`container-custom d-flex align-items-center justify-content-center ${
            isPopupActive ? 'scale-100' : 'scale-0'
          }`}
          style={{
            height: '530px',
            width: '460px',
            border: '3px solid rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(25px)',
            boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            transition: 'transform 0.5s',
          }}
        >
          <div className="main-box p-4 w-100">
            <h1 className="text-dark text-center fs-1 fw-bold">
              {isRegister ? 'Registration' : 'Login'}
            </h1>
            <form>
              {isRegister && (
                <div className="mb-3 position-relative">
                  <span
                    className="position-absolute end-0 me-2 fs-5 text-dark"
                    style={{ lineHeight: '55px' }}
                  >
                    <i className="bx bxs-user"></i>
                  </span>
                  <input
                    type="text"
                    name="username"
                    required
                    className="form-control bg-transparent fs-5 fw-semibold text-dark pe-5"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  <label className="form-label">Username</label>
                </div>
              )}
              <div className="mb-3 position-relative">
                <span
                  className="position-absolute end-0 me-2 fs-5 text-dark"
                  style={{ lineHeight: '55px' }}
                >
                  <i className="bx bxs-envelope"></i>
                </span>
                <input
                  type="email"
                  name="email"
                  required
                  className="form-control bg-transparent fs-5 fw-semibold text-dark pe-5"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label className="form-label">Email</label>
              </div>
              <div className="mb-3 position-relative">
                <span
                  className="position-absolute end-0 me-2 fs-5 text-dark"
                  style={{ lineHeight: '55px' }}
                >
                  <i className="bx bxs-lock-alt"></i>
                </span>
                <input
                  type="password"
                  name="password"
                  required
                  className="form-control bg-transparent fs-5 fw-semibold text-dark pe-5"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label className="form-label">Password</label>
              </div>
              {isRegister ? (
                <div className="d-flex justify-content-between text-dark fs-6 fw-medium mb-3">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      className="form-check-input me-1"
                    />
                    I accept all terms & conditions
                  </label>
                </div>
              ) : (
                <div className="d-flex justify-content-between text-dark fs-6 fw-medium mb-3">
                  <label className="form-check-label">
                    <input
                      type="checkbox"
                      className="form-check-input me-1"
                    />
                    Remember me
                  </label>
                  <a href="#" className="text-decoration-none">
                    Forget Password
                  </a>
                </div>
              )}
              <button
                type="submit"
                className="btn btn-dark w-100 fs-5 fw-semibold text-white"
              >
                {isRegister ? 'Register Here' : 'Login'}
              </button>
              <div className="text-center text-dark fs-6 fw-medium mt-3">
                <p>
                  {isRegister
                    ? 'Already have an account?'
                    : "If you don't have an account?"}{' '}
                  <a
                    href="#"
                    onClick={() => setIsRegister(!isRegister)}
                    className="text-decoration-none fw-semibold"
                  >
                    {isRegister ? 'Login!' : 'Register Here'}
                  </a>
                </p>
              </div>
            </form>
          </div>
          <span
            className="position-absolute top-0 start-0 p-2 bg-dark text-white d-flex align-items-center justify-content-center fs-3 cursor-pointer"
            onClick={() => setIsPopupActive(false)}
          >
            <i className="bx bx-x"></i>
          </span>
        </div>
      </div>
    );
};

export default LoginRegister;
