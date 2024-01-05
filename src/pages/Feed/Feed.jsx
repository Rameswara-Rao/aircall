import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../../store/store";
import Header from "../../components/Header/Header";
import FeedCard from "../../components/FeedCard/FeedCard";
import { FloatButton, Spin, Skeleton, Tooltip, Empty } from "antd";
import { MoreOutlined } from "@ant-design/icons";

import Styles from "./FeedStyles.module.css";
import axios from "axios";
import { message } from "antd";
import { BASE_URL } from "../../constants/urls";

const Feed = () => {
  const [loaderArchive, setLoaderArchive] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const {
    activityDataFilter,
    setActivityDataFilter,
    activityType,
    activityData,
    loader,
    fetchActivityData,
    setArchiveDataFilter,
    archiveDataFilter,
  } = useContext(DataContext);

  useEffect(() => {
    setActivityDataFilter(activityData?.filter((e) => !e.is_archived));
    setArchiveDataFilter(activityData?.filter((e) => e.is_archived));
  }, [activityData]);

  const archiveAllCall = async (dataBool) => {
    setLoaderArchive(true);
    try {
      await axios.patch(`${BASE_URL}/reset`, { is_archived: dataBool });
    } catch (err) {
      messageApi.open({
        type: "error",
        content: err.message,
      });
    } finally {
      setLoaderArchive(false);
      fetchActivityData();
    }
  };

  const renderFeedCards = (data) =>
    data.map(
      (actvData) =>
        actvData?.to && <FeedCard key={actvData.id} actvData={actvData} />
    );

  return (
    <div>
      <Header />
      {contextHolder}
      {loader ? (
        <>
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton
              key={index}
              avatar
              className={Styles.skeleton_padding}
              paragraph={{ rows: 2 }}
            />
          ))}
        </>
      ) : activityType === "Active Feed" ? (
        activityDataFilter?.length ? (
          renderFeedCards(activityDataFilter)
        ) : (
          <Empty
            className={Styles.no_data_padding}
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          />
        )
      ) : archiveDataFilter?.length ? (
        renderFeedCards(archiveDataFilter)
      ) : (
        <Empty
          className={Styles.no_data_padding}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      )}

      <FloatButton.Group
        className={Styles.floatBtn_align}
        trigger="click"
        type="primary"
        style={{ right: 94 }}
        icon={<MoreOutlined />}
      >
        <Tooltip placement="leftTop" title="Archive All Calls">
          <FloatButton
            icon={
              loaderArchive ? (
                <Spin size="small" />
              ) : (
                <img src="/img/archive.svg" width={15} alt="" />
              )
            }
            onClick={() => archiveAllCall(false)}
          />
        </Tooltip>
        <Tooltip placement="leftTop" title="UnArchive All Calls">
          <FloatButton
            icon={
              loaderArchive ? (
                <Spin size="small" />
              ) : (
                <img src="/img/archive-rotated.svg" width={15} alt="" />
              )
            }
            onClick={() => archiveAllCall(true)}
          />
        </Tooltip>
      </FloatButton.Group>
    </div>
  );
};

export default Feed;
