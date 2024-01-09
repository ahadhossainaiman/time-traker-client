/* eslint-disable @next/next/no-img-element */
import { signInUser } from "@/redux/features/user/userSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";


const login = () => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
      } = useForm();

const dispatch = useDispatch();
const router = useRouter()
const {error,isError,isLoading,email,name} = useSelector((state)=>state.userSlice);
// console.log(error,isError,isLoading,email,name);

      const onSubmit = ({email,password}) => {
        dispatch(signInUser({
            email,password
        }))
        toast.success("Account Create Successfully !", {
          position: toast.POSITION.TOP_CENTER,
        });
        router.push('/', { scroll: false })
        reset()
    }
    return (
      <div data-theme="light">
      {/* <Toaster position="top-right" /> */}
      <div className="hero min-h-screen bg-base-200 bg-[url('https://previews.123rf.com/images/dstarky/dstarky1707/dstarky170700321/83076789-time-management-vector-seamless-pattern-blue-background.jpg')]">



          <div className="min-w-[30%]">
            <form
                style={{ backdropFilter:'saturate(180%) blur(5px)'}}
                className="card-body shadow-2xl p-6 md:mt-16 rounded-2xl border border-black min-w-[30%]"
              onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className=" text-3xl flex justify-center my-3 text-white">Login Your Account</h1>
              
              <div className="form-control">
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
              <div className="form-control">
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
              
           
              <div className="form-control mt-6">
               <button><input
                  type="submit"
                  value="Login"
                 
                />
                </button> 
              </div>
                <p>
                    <small className="text-white ml-6 text-sm">
                        Already have no account? please{" "}
                        <Link href="/register" className="font-bold">
                            Register
                        </Link>
                    </small>
                </p>
            </form>

            {/* <SocialLogIn></SocialLogIn> */}
          </div>

      </div>
    </div>
    );
};

export default login;