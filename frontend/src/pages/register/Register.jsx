import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register as registerUser } from "../../services/authService";

import tempProfilePicture from "../../assets/temp-profile-picture.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [profilepicture, setProfilePicture] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

     const finalProfilePicture =
      profilepicture && profilepicture.trim() !== ""
        ? profilepicture.trim()
        : tempProfilePicture;

    try {
      await registerUser({ email, password, name, city, finalProfilePicture });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-base-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Create an account
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-md font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className={`input block w-full rounded-lg p-2.5`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="First Last"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className={`input block w-full rounded-lg p-2.5`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-md font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="••••••••"
                  className={`input block w-full rounded-lg p-2.5`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="confirmpassword"
                  className="block mb-2 text-md font-medium"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirmpassword"
                  id="confirmpassword"
                  required
                  placeholder="••••••••"
                  className={`input block w-full rounded-lg p-2.5`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-md font-medium"
                >
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  required
                  className={`input block w-full rounded-lg p-2.5`}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
              </div>

              <div>
                <label
                  htmlFor="profilepicture"
                  className="block mb-2 text-md font-medium"
                >
                  Profile Picture URL (optional)
                </label>
                <input
                  type="text"
                  name="profilepicture"
                  id="profilepicture"
                  className="input block w-full rounded-lg p-2.5"
                  value={profilepicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  placeholder="https://example.jpg"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="termsandconditions"
                      aria-describedby="termsandconditions"
                      type="checkbox"
                      required
                      className={`checkbox`}
                    />
                  </div>
                  <div className="ml-3 text-md">
                    <label htmlFor="termsandconditions" className="">
                      I accept the{" "}
                      <a
                        href="#"
                        className="font-medium text-primary hover:underline"
                      >
                        Terms and Conditions
                      </a>
                    </label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className={`btn btn-primary btn-block rounded-lg`}
              >
                Create an account
              </button>

              {error && <p style={{ color: "red" }}>{error}</p>}

              <p className="text-md font-light">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-primary hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
