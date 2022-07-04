import JobList from "../components/JobList";
import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PROJECTS } from "../utils/queries";
import Auth from "../utils/auth";
// import JobForm from "../components/ThoughtForm";

const Dashboard = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_PROJECTS);

  const projects = data?.getProjects || [];
  console.log(projects);
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && "col-lg-8"}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <JobList projects={projects} title="Some Feed for today's Job(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
