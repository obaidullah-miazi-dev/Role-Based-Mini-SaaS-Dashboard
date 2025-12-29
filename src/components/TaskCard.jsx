import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Pencil, Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios from "axios";

const TaskCard = (taskInfo) => {
  const { task } = taskInfo;
  const { user } = useContext(AuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();
  const { mutate: editTask } = useMutation({
    mutationFn: async (taskInfo) => {
      const res = await axios.patch(
        `http://localhost:3000/editTask/${task?._id}`,
        taskInfo
      );
      return res.data;
    },
    onSuccess: (data) => {
      // console.log(data)
      if (data.modifiedCount) {
        alert("task edited successfully");
        queryClient.invalidateQueries(["allTask"]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: DeleteTask } = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `http://localhost:3000/deleteTask/${task?._id}`
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log(data);
      if (data.deletedCount) {
        alert("task deleted successfully");
        queryClient.invalidateQueries(["allTask"]);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const onSubmit = (data) => {
    editTask(data);
    console.log(data);
    reset();
    setIsModalOpen(false);
  };

  const deleteTask = () => {
    DeleteTask();
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full mx-auto border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-xl font-bold text-gray-900 mb-2">{task?.name}</h3>
      <p className="text-gray-700 mb-4">{task?.description}</p>
      <div className="flex justify-between items-center">
        <span
          className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
            task?.active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {task?.active ? "Active" : "Inactive"}
        </span>
        {user?.role === "admin" && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex justify-center items-center gap-2 bg-green-100 px-3 py-1 rounded-full text-green-700 font-semibold"
            >
              {" "}
              <Pencil size={16} /> Edit
            </button>

            <button
              onClick={() => deleteTask()}
              className="flex justify-center items-center gap-2 bg-red-50 px-3 py-1 rounded-full text-red-700 font-semibold"
            >
              {" "}
              <Trash size={16} /> Delete
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full mx-4">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Edit Task Challenge
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  id="name"
                  defaultValue={task?.name}
                  {...register("name", { required: true })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Enter challenge name"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  defaultValue={task?.description}
                  {...register("description")}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                  placeholder="Enter challenge description"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="active"
                  {...register("active")}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="active"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Active
                </label>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-300 transition duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-200 font-medium shadow-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
