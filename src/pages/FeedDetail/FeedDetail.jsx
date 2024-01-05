import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FeedDetailsHeader from "../../components/FeedDetailsHeader/FeedDetailsHeader";
import { Avatar, Flex, Card, Skeleton } from "antd";
import Styles from "./FeedDetailStyle.module.css";
import { message } from "antd";
import { BASE_URL } from "../../constants/urls";

const FeedDetail = () => {
  let { id } = useParams();
  const [activityDetailData, setActivityDetailData] = useState();
  const [loaderFeedDetail, setLoaderFeedDetail] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchFeedDetail = async () => {
    await axios
      .get(`${BASE_URL}/activities/${id}`)
      .then((res) => setActivityDetailData(res.data))
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err.message,
        }),
          setLoaderFeedDetail(false);
      });
    setLoaderFeedDetail(false);
  };

  useEffect(() => {
    fetchFeedDetail();
  }, []);

  return (
    <div>
      {contextHolder}
      <FeedDetailsHeader headerName={"FeedDetail"} />
      {loaderFeedDetail ? (
        <div className={Styles.skeleton_padding}>
          <div className={Styles.skelton_avatar}>
            <Skeleton.Avatar size={70} />
          </div>

          <Skeleton paragraph={{ rows: 10 }} />
        </div>
      ) : (
        <div>
          <Flex justify="center">
            <Flex vertical="true">
              <Avatar
                size={70}
                style={{
                  backgroundColor: "#fde3cf",
                  color: "#f56a00",
                  marginTop: "10px",
                }}
              >
                U
              </Avatar>
              <p className={Styles.phone_num}>{activityDetailData?.to}</p>
            </Flex>
          </Flex>
          <Card className={Styles.details_card_mod}>
            <p>
              <span>
                <img
                  src="/img/time-forward.svg"
                  width={13}
                  style={{ color: "#233142" }}
                  alt=""
                />
              </span>
              <span className={Styles.details_text}>Call Duration:</span>

              <span className={Styles.details_subtext}>
                {(Math.round(activityDetailData?.duration) / 60).toFixed(2)}{" "}
                mins
              </span>
            </p>

            <p className={Styles.padding_top}>
              <span>
                <img
                  src="/img/phone-call.svg"
                  width={15}
                  style={{ color: "#233142" }}
                  alt=""
                />
              </span>
              <span className={Styles.details_text}>Call Type:</span>

              <span className={Styles.details_subtext}>
                {activityDetailData?.call_type}
              </span>
            </p>

            <p className={Styles.padding_top}>
              <span>
                <img
                  src="/img/direction-signal-arrow.svg"
                  width={17}
                  style={{ color: "#233142" }}
                  alt=""
                />
              </span>
              <span className={Styles.details_text}>Direction:</span>

              <span className={Styles.details_subtext}>
                {activityDetailData?.direction}
              </span>
            </p>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FeedDetail;
