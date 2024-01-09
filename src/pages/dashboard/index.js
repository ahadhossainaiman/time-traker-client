/* eslint-disable @next/next/no-img-element */
import DashboardLayouts from "@/components/Layouts/DashboardLayouts";
import CountdownTimer from "@/components/Ui/CountdownTimer";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlinePreview } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Modal from "@/components/Ui/Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const DashboardPage = () => {
  const [, forceUpdate] = useState();

  const { name, email, photo_url } = useSelector((state) => state.userSlice);
  const { register, handleSubmit, reset } = useForm();
  const [tasks, setTasks] = useState([]);
  const [singleTask, setSingleTask] = useState({});

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://time-trajer-server-production.up.railway.app/tasks?email=${email}`
      );
      const data = await response.json();
      // Update state with the new data
      setTasks(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (email) {
      fetchData();
    }
  }, [email, singleTask]);
  const handleTaskView = (id) => {
    console.log(id);
    document.getElementById("my_modal_3").showModal();
    fetch(`https://time-trajer-server-production.up.railway.app/task?task_id=${id}`)
      .then((res) => res.json())
      .then((data) => setSingleTask(data));
  };
  const handleTaskEdit = (id) => {
    document.getElementById("my_modal_4").showModal();
    fetch(`https://time-trajer-server-production.up.railway.app/task?task_id=${id}`)
      .then((res) => res.json())
      .then((data) => setSingleTask(data));
  };

  const onSubmit = (data) => {
    console.log("aiman", data);
    fetch(`https://time-trajer-server-production.up.railway.app/updateTask/${data?._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          console.log(data);
          toast.success("Task Edit Successfully !", {
            position: toast.POSITION.TOP_CENTER,
          });
          fetchData();
          reset();
          document.getElementById("my_modal_4").close();
        }
      });
  };
  const handleDelete = (id) => {
    console.log(id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://time-trajer-server-production.up.railway.app/task/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              fetchData();
            }
          });
      }
    });
  };

  return (
    <div className="overflow-x-auto h-[100vh]" data-theme="light">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th  className="text-2xl">#</th>
            <th  className="text-2xl">Task Name</th>
            <th  className="text-2xl">Description</th>
            <th  className="text-2xl">Timer Set</th>
            <th  className="text-2xl">Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}

          {tasks.length > 0 ? (
            tasks?.map((task, index) => (
              <>
                <tr key={task._id}>
                  <th className="text-2xl">{index + 1}</th>
                  <td className="text-2xl">{task.task_name}</td>
                  <td className="text-2xl">{task.description.slice(0, 20) + "..."}</td>
                  <td>
                    <CountdownTimer
                      initialDuration={parseInt(task.duration) * 60 * 1000}
                    />
                  </td>
                  <td>
                    <div className="flex gap-2 justify-start">
                      <MdOutlineDeleteForever
                        onClick={() => handleDelete(task?._id)}
                        className="text-red-500 text-3xl"
                      />
                      <MdOutlinePreview
                        onClick={() => handleTaskView(task._id)}
                        className="text-3xl text-blue-500"
                      />
                      <FaRegEdit onClick={() => handleTaskEdit(task._id)}
                      className="text-3xl text-green-500"
                      />
                    </div>
                  </td>
                </tr>
              </>
            ))
          ) : (
            <h1>Data not Found</h1>
          )}
        </tbody>
      </table>

      <Modal modal_id="my_modal_3">
        <div className="flex gap-2 items-center">
          {
            photo_url ? <img
            className="w-[45px] rounded-full border-2 border-green-400"
            src={singleTask?.owner_url}
            alt=""
          />:<img
          className="w-10 border-2 border-green-500 rounded-full"
          src='https://www.shutterstock.com/image-vector/human-icon-people-picture-profile-260nw-1011951676.jpg'
          alt="photo"
        />
          }
          
          <p>
            <span className="py-1 px-2 bg-green-400 rounded-xl font-bold">
              {singleTask?.task_owner}
            </span>
          </p>
        </div>
        <div className="my-3">
          <span>Task Name:</span>
          <br />
          <h1 className="border-2 py-2 text-xl my-2 px-1 rounded-md bg-sky-400">
            {singleTask?.task_name}
          </h1>
          <span>Description:</span>
          <br />
          <article className="bg-purple-400 pb-10 p-1 rounded-md my-1 text-balance">
            {singleTask?.description}
          </article>
          <p>
            <span className="text-2xl">Time Duration: </span>
            <span className="text-2xl">{singleTask?.duration + " Hours"}</span>
          </p>
        </div>
      </Modal>
      <Modal modal_id="my_modal_4">
        <div className="flex gap-2 items-center">
          {
            photo_url ? <img
            className="w-[45px] rounded-full border-2 border-green-400"
            src={singleTask?.owner_url}
            alt=""
          />:<img
          className="w-10 border-2 border-green-500 rounded-full"
          src={photo_url}
          alt="photo"
        />
          }
          
          <p>
            <span className="py-1 px-2 bg-green-400 rounded-xl font-bold">
              {singleTask?.task_owner}
            </span>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            <span>Task ID:</span>

            <input
              type="text"
              value={singleTask?._id}
              className=""
              readOnly
              {...register("_id", { required: true })}
            />
            <br></br>
            <span>Task Name:</span>
            <br />
            <input
              type="text"
              className="border-2 w-full py-2 text-xl my-2 px-1 rounded-md bg-sky-400"
              defaultValue={singleTask?.task_name}
              {...register("task_name", { required: true })}
            />

            <span>Description:</span>
            <br />
            <textarea
              rows="5"
              type="text"
              className="bg-purple-400 w-full pb-10 p-1 rounded-md my-1 text-balance"
              defaultValue={singleTask?.description}
              {...register("description", { required: true })}
            />

            <p>
              <span className="text-2xl">Time Duration: </span>
              <input
                type="number"
                defaultValue={singleTask?.duration}
                className="text-2xl"
                {...register("duration", { required: true })}
              />
            </p>
          </div>
          <div className=" w-[40%] mx-auto">
          <button className=""><input
            className="mx-auto"
            type="submit"
            value="Update Task"
          />
          </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default DashboardPage;
DashboardPage.getLayout = function getLayout(page) {
  return <DashboardLayouts>{page}</DashboardLayouts>;
};
