import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { DataContext } from "./store/store";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Feed from "./pages/Feed/Feed";
import FeedDetail from "./pages/FeedDetail/FeedDetail";
import { message } from "antd";
import { BASE_URL } from "./constants/urls";

const App = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const [activityData, setActivityData] = useState();
  const [activityDataFilter, setActivityDataFilter] = useState();
  const [archiveDataFilter, setArchiveDataFilter] = useState();
  const [activityType, setActivityType] = useState("Active Feed");
  const [messageApi, contextHolder] = message.useMessage();

  const fetchActivityData = async () => {
    await axios
      .get(`${BASE_URL}/activities`)
      .then((res) => setActivityData(res.data))
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err.message,
        }),
          setLoader(false);
      });
    setLoader(false);
  };

  useEffect(() => {
    fetchActivityData();
    if (location?.pathname === "/") {
      navigate("/feed");
    }
  }, []);

  return (
    <DataContext.Provider
      value={{
        activityType,
        setActivityType,
        activityDataFilter,
        activityData,
        setActivityType,
        setActivityDataFilter,
        loader,
        fetchActivityData,
        archiveDataFilter,
        setArchiveDataFilter,
      }}
    >
      <div className="app">
        <div className="container">
          {contextHolder}
          <Routes>
            <Route path="/feed" element={<Feed />} />
            <Route path="/feed/:id" element={<FeedDetail />} />
          </Routes>
          hello
        </div>
      </div>
    </DataContext.Provider>
  );
};

export default App;
