import Image from "next/image";
import { Inter } from "next/font/google";
import Head from "next/head";
import RootLayouts from "@/components/Layouts/RootLayouts";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import auth from "@/firebase/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/redux/features/user/userSlice";
import { useForm } from "react-hook-form";
import CountdownTimer from "@/components/Ui/CountdownTimer";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const { name, email, photo_url } = useSelector((state) => state.userSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({
            name: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          })
        );
      }
    });
  }, []);
  const onSubmit = (data) => {
    if (email) {
      const result = {
        ...data,
        task_owner: name,
        owner_mail: email,
        owner_url: photo_url,
      };
      fetch("https://task-manager-server-plum-two.vercel.app/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            console.log(data);
            console.log("aiman");
            toast.success("Task Create Successfully !", {
              position: toast.POSITION.TOP_CENTER,
            });
            router.push('/dashboard')
            reset();
          }
        });
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="hero min-h-screen bg-base-200 bg-[url('https://previews.123rf.com/images/dstarky/dstarky1707/dstarky170700321/83076789-time-management-vector-seamless-pattern-blue-background.jpg')]">
      <Head>
        <title>Task Manager</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        email?<div className=" p-10 w-[60%] mx-auto rounded-md h-[60%] my-auto"   style={{ backdropFilter:'saturate(180%) blur(5px)'}}>
        {email && (
          <div className="flex gap-4 justify-center items-center">
            {
              photo_url ? <img
              className="w-16 border-4 border-[#5E08FD] rounded-full"
              src={photo_url}
              alt="photo"
            /> : <img
            className="w-10 border-2 border-green-500 rounded-full"
            src='https://www.shutterstock.com/image-vector/human-icon-people-picture-profile-260nw-1011951676.jpg'
            alt="photo"
          />
            }
            
            <p>
              <span className="bg-[#5E08FD] text-white px-2 py-1 rounded-xl text-xl">{name}</span>
            </p>
          </div>
        )}

        <form className="w-1/2 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-5 mx-5">
            <label htmlFor="" className="flex flex-col">
              Task Name:
              <input
                className="border-gray-500 border-2 h-10 p-1"
                placeholder="Task Name"
                {...register("task_name", { required: true })}
              />
            </label>
            <label htmlFor="" className="flex flex-col">
              Description:
              <textarea
                rows="5"
                cols="50"
                className="border-gray-500 border-2 p-1 "
                placeholder="Task Description"
                {...register("description", { required: true })}
              />
            </label>
            <label htmlFor="" className="flex flex-col">
              Time Duration :
              <input
                type="number"
                className="border-gray-500 border-2 p-1 "
                name=""
                placeholder="Task Duration"
                id=""
                {...register("duration", { required: true })}
              />
            </label>
           <button><input
              // className="border-gray-500 border-2 button hover:bg-red-600  col-span-2 w-1/3 h-10 mx-auto"
              
              type="submit"
              value="Create Task"
            /></button>
          </div>
        </form>
      </div>:<div className=" p-10 w-[60%] mx-auto rounded-md h-[60%] my-auto"   style={{ backdropFilter:'saturate(180%) blur(5px)'}}>
        <div className="mx-auto w-[60%] flex flex-col items-center">
      <TypeAnimation
  sequence={[
    // Same substring at the start will only be typed once, initially
    'Advanced Time Tracking Web Application',
    1000,
    'Already Have Account Please Login',
    1000,
    'Do Not Have Account Please Register',
    1000,
   
  ]}
  speed={50}
  style={{ fontSize: '2em' }}
  repeat={Infinity}
/>
</div>
 <br />
 <Link className="flex justify-center" href='/login'> <button className="w-[50%] ">Login</button></Link>
       
      </div>
      }
      
    </div>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <RootLayouts>{page}</RootLayouts>;
};
