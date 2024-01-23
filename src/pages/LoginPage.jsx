import { useEffect, useState } from "react";
import ToastError from "../components/common/toast/ToastError";
import Loading from "../components/common/loading/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../features/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isError, isSuccess, isLoading, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (user || isSuccess) {
      if (user?.role === "FO") {
        navigate("/fo/letters");
      } else if (user?.role === "KADIS") {
        navigate("/kadis/dashboard");
      } else if (user?.role === "SEKRETARIS") {
        navigate("/secretary/dashboard");
      } else if (user?.role === "DIVISION") {
        navigate("/division/dashboard");
      }
    }
    dispatch(reset());
  }, [user, isSuccess, dispatch, navigate]);

  const Auth = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen bg-gray-100 sm:py-12">
        {isLoading && <Loading />}
        {isError && <ToastError message={message} />}
        <div className="p-10 mx-auto xs:p-0 md:w-full md:max-w-md">
          <h1 className="mb-5 text-2xl font-bold text-center">Your Logo</h1>
          <form onSubmit={Auth}>
            <div className="w-full bg-white divide-y divide-gray-200 rounded-lg shadow">
              <div className="px-5 py-7">
                <label className="block pb-1 text-sm font-semibold text-gray-600">
                  Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"
                />
                <label className="block pb-1 text-sm font-semibold text-gray-600">
                  Kata Sandi
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 mt-1 mb-5 text-sm border rounded-lg"
                />
                <button
                  type="submit"
                  className="transition duration-200 bg-red-500 hover:bg-red-600 focus:bg-red-700 focus:shadow-sm focus:ring-4 focus:ring-red-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
                >
                  Masuk
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
