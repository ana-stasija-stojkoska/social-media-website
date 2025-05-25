import { Link } from "react-router-dom";

const Register = () => {
  return (
    <section>
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-base-200 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className={`input block w-full rounded-lg p-2.5`}
                  placeholder="name@company.com"
                  required=""
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
                  placeholder="••••••••"
                  className={`input block w-full rounded-lg p-2.5`}
                  required=""
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
                  placeholder="••••••••"
                  className={`input block w-full rounded-lg p-2.5`}
                  required=""
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="termsandconditions"
                      aria-describedby="termsandconditions"
                      type="checkbox"
                      className={`checkbox`}
                      required=""
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
