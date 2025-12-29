import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import TaskCard from "../components/TaskCard";

const Home = () => {
  const { data: allTask } = useQuery({
    queryKey: ["allTask"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/taskGet?status=true");
      return res.data;
    },
  });
  return (
    <div className="px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
        {allTask?.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Home;
