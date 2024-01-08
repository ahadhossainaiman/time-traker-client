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
      fetch("http://localhost:5000/tasks", {
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
            // toast.success("Product Added Successfully !", {
            //   position: toast.POSITION.TOP_CENTER,
            // });
            reset();
          }
        });
    } else {
      router.push("/login");
    }
  };

  return (
    <div>
      <Head>
        <title>Task Manager</title>
        <meta
          name="description"
          content="This is news portal of programming hero made by next-js"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-amber-500 p-10 w-[60%] mx-auto rounded-md">
        {email && (
          <div className="flex gap-4 justify-center items-center">
            <img
              className="w-10 border-2 border-green-500 rounded-full"
              src={photo_url}
              alt="photo"
            />
            <p>
              <span className="bg-green-400 px-2 py-1 rounded-xl ">{name}</span>
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
            <input
              className="border-gray-500 border-2 hover:bg-red-600  col-span-2 w-1/3 h-10 mx-auto"
              type="submit"
              value="Create Task"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

HomePage.getLayout = function getLayout(page) {
  return <RootLayouts>{page}</RootLayouts>;
};
