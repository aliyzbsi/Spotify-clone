import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaApple } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

function LoginForm({ setLoggedUser }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });
  const navigate = useNavigate();
  const [clicked, setClicked] = useState(false);

  const submitFn = async (data) => {
    await axios
      .post("https://reqres.in/api/users", data)
      .then((response) => {
        setLoggedUser(response.data.email);
        toast.success(`${response.data.id} idli kullanıcı hoşgeldiniz`);
        navigate("/");
        reset();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Hata !", error);
      });
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4"
      style={{
        background:
          "linear-gradient(0deg, rgba(0,0,0,1) 17%, rgba(29,29,28,1) 28%, rgba(42,42,40,1) 41%, rgba(47,46,44,1) 54%, rgba(66,65,63,1) 67%)",
      }}
    >
      <div className="filter text-white flex flex-col w-full sm:w-3/4 md:mt-20 lg:w-1/3">
        <div className="flex flex-col rounded-xl bg-gray-950 items-center gap-4 p-6 sm:p-10">
          <img
            src="../../public/assets/white-logo.png"
            className="w-11"
            alt="login-logo"
          />
          <h1 className="font-semibold text-2xl sm:text-3xl lg:text-4xl font-barlow text-center">
            Spotify'da oturum aç
          </h1>

          <div className="w-full flex flex-col gap-3 mt-4">
            <button className="flex justify-between items-center border px-4 py-3 rounded-3xl">
              <img
                src="../../public/assets/google-icon-PNG.png"
                className="w-6"
                alt="Google"
              />
              <span className="flex-grow text-center text-sm sm:text-base">
                Google ile devam et
              </span>
            </button>

            <button className="flex justify-between items-center border px-4 py-3 rounded-3xl">
              <img
                src="../../public/assets/facebook.png"
                className="w-6"
                alt="Facebook"
              />
              <span className="flex-grow text-center text-sm sm:text-base">
                Facebook ile devam et
              </span>
            </button>

            <button className="flex justify-between items-center border px-4 py-3 rounded-3xl">
              <FaApple size={25} />
              <span className="flex-grow text-center text-sm sm:text-base">
                Apple ile devam et
              </span>
            </button>
          </div>

          <div className="border border-gray-700 w-full my-4"></div>

          <form
            onSubmit={handleSubmit(submitFn)}
            className="w-full flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2 font-barlow font-semibold">
              <label htmlFor="email" className="text-sm">
                E-posta adresi veya kullanıcı adı
              </label>
              <input
                id="email"
                type="text"
                placeholder="E-posta"
                className="bg-gray-950 border p-2 w-full rounded-md text-sm sm:text-base"
                {...register("email", {
                  required: "Email boş bırakılamaz!",
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: "Geçerli bir email giriniz !",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2 font-barlow font-semibold">
              <label htmlFor="password" className="text-sm">
                Parola
              </label>
              <div className="relative flex items-center">
                <input
                  id="password"
                  type={clicked ? "text" : "password"}
                  placeholder="Parola"
                  className="bg-gray-950 border p-2 w-full pr-10 rounded-md text-sm sm:text-base"
                  {...register("password", {
                    required: "Şifre boş bırakılamaz !",
                    minLength: {
                      value: 6,
                      message: "Şifreniz en az 6 karakterli olmalı !",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,
                      message: "Şifre en az bir harf ve bir sayı içermelidir",
                    },
                  })}
                />

                <button
                  type="button"
                  className="absolute right-2"
                  onClick={() => setClicked(!clicked)}
                >
                  {clicked ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="bg-green-500 text-black w-full p-3 font-bold rounded-full hover:bg-green-400 text-sm sm:text-base"
              >
                Oturum aç
              </button>
            </div>
          </form>

          <button
            onClick={() => navigate("/")}
            className="underline hover:text-green-500 text-sm mt-3"
          >
            Parolanı mı unuttun ?
          </button>

          <div className="text-sm mt-3">
            <p>
              Hesabın Yok mu?{" "}
              <button
                onClick={() => navigate("/")}
                className="underline hover:text-green-500"
              >
                Spotify için kaydol
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
