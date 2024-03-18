import { useEffect, useState } from "react";
import ToastError from "../components/common/toast/ToastError";
import Loading from "../components/common/loading/Loading";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../features/authSlice";
import Logo from "../assets/ic_logo.png";

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

  useEffect(() => {
    if (isError) {
      const timeoutId = setTimeout(() => {
        dispatch(reset());
      }, 1000);

      // Cleanup the timeout to avoid memory leaks
      return () => {
        clearTimeout(timeoutId);
        dispatch(reset()); // Reset isError when component unmounts
      };
    }
  }, [isError, dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser({ email, password }));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen bg-gray-100 sm:py-12">
        {isLoading && <Loading />}
        {isError && <ToastError message={message} />}
        <img src={Logo} alt="" className="w-32 h-32 mx-auto" />
        <div className="p-10 mx-auto xs:p-0 md:w-full md:max-w-md">
          <form onSubmit={handleLogin}>
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
                <button type="submit" className="w-full uppercase btn-primary">
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
