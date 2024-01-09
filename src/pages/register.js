/* eslint-disable react-hooks/rules-of-hooks */
import { createUser } from "@/redux/features/user/userSlice";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const registerPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const router = useRouter();
  const { error, isError, isLoading, email, name } = useSelector(
    (state) => state.userSlice
  );
  console.log(error, isError, isLoading, email, name);

  const onSubmit = ({ name, email, password, photoURL }) => {
    dispatch(
      createUser({
        name,
        email,
        password,
        photoURL,
      })
    );
    fetch("https://time-trajer-server.vercel.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, photoURL }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          console.log(data);
          console.log("aiman");
          toast.success("Account Create Successfully !", {
            position: toast.POSITION.TOP_CENTER,
          });
          router.push('/login')
          reset();
        }
      });
  };
  //   console.log(errors);
  return (
    <div data-theme="light" >
    {/* <Toaster position="top-right" /> */}
    <header className="hero min-h-screen bg-base-200 bg-[url('https://previews.123rf.com/images/dstarky/dstarky1707/dstarky170700321/83076789-time-management-vector-seamless-pattern-blue-background.jpg')]">

        <div className="min-w-[50%]">

          <form
              style={{ backdropFilter:'saturate(180%) blur(5px)'}}
            className="card-body shadow-2xl p-6 md:mt-16 rounded-2xl border border-black min-w-[70%]"
            onSubmit={handleSubmit(onSubmit)}
          >
              <h1 className=" text-5xl flex justify-center my-2 text-white">Create a new account</h1>
            <div className='flex gap-2 flex-1'>
            <div className="form-control w-[50%]" >
              <input
                type="text"
                placeholder="name"
                {...register("name", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-white">name is required</span>
              )}
            </div>
            <div className="form-control w-[50%]">
              <input
                type="email"
                placeholder="email"
                {...register("email", { required: true })}
                className="input input-bordered"
              />
              {errors.email && (
                <span className="text-white">Email is required</span>
              )}
            </div>
            </div>
              <div className='flex gap-2'>
            <div className="form-control w-[50%]">
              <input
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                //   pattern: /(?=.*[!@#$%^&*])(?=.*[A-Z])/,
                })}
                className="input input-bordered"
              />
              {errors.password?.type === "required" && (
                <p className="text-white">password is required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-white">password must be six character</p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-white">
                  please provide uppercase and special character
                </p>
              )}
            </div>
            <div className="form-control w-[50%]">
              <input
                type="password"
                placeholder="Confirm Password"
                {...register("confirm", { required: true })}
                className="input input-bordered"
              />
              {errors.confirm && (
                <span className="text-white">
                  Please Re-Write your password
                </span>
              )}
            </div>
              </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="Photo URL"
                {...register("photoURL", { required: true })}
                className="input input-bordered"
              />
              {errors.photoURL && (
                <span className="text-white">Photo URL is required</span>
              )}
            </div>
            <div className="form-control mt-6">
             <button> <input
                type="submit"
                value="SIGNUP"
               
              /></button>
            </div>
              <p>
                  <small className="text-white ml-6 text-sm">
                      Already have an account? please{" "}
                      <Link href="/login" className="font-bold">
                          Login
                      </Link>
                  </small>
              </p>
          </form>

          {/* <SocialLogIn></SocialLogIn> */}
        </div>
      </header>

  </div>
  );
};

export default registerPage;
