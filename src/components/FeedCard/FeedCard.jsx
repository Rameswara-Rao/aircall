import React, { useContext, useState } from "react";
import { Card, Button, Spin } from "antd";

import Styles from "./FeedCard.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { DataContext } from "../../store/store";
import { message } from "antd";
import { BASE_URL } from "../../constants/urls";

const FeedCard = ({ actvData }) => {
  const { fetchActivityData } = useContext(DataContext);
  const [messageApi, contextHolder] = message.useMessage();
  const [loaderArchive, setLoaderArchive] = useState(false);
  const color = ["#fde3ce", "#eae3ff", "#1677ff2a"];

  const archiveCall = async (dataBool) => {

    setLoaderArchive(true);
    await axios
      .patch(`${BASE_URL}/activities/${actvData?.id}`, {
        is_archived: dataBool,
      })
      .then()
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: err.message,
        }),
          setLoaderArchive(false);
      });
    fetchActivityData();
    setLoaderArchive(false);
  };

  return (
    <div>
      {contextHolder}
      <Card
        key={actvData.id}
        bodyStyle={{ padding: "0", margin: "0" }}
        size="small"
      >
        <div className={Styles.card_mod}>
          <div className={Styles.content_styling}>
            <div
              className={Styles.circle}
              style={{
                background: color[Math.floor(Math.random() * color.length)],
              }}
            >
              {String(actvData.to).match(/\d/)}
            </div>

            <div className={Styles.content_align}>
              <p>{actvData.to}</p>
              <p className={Styles.call_details}>
                <span>
                  {actvData.direction === "outbound" ? (
                    <img src="/img/arrow-up-right.svg" width={8} alt="" />
                  ) : (
                    <img src="/img/arrow-down-left.svg" width={8} alt="" />
                  )}
                </span>
                <span
                  className={`${Styles.call_type} ${
                    actvData.call_type === "missed"
                      ? Styles.call_type_color
                      : ""
                  }`}
                >
                  {actvData.call_type}
                </span>
              </p>
            </div>
          </div>
          <div className={Styles.btn_align}>
            {loaderArchive ? (
              <Spin size="small" />
            ) : (
              <>
                {actvData.is_archived ? (
                  <Button
                    type="dashed"
                    size="small"
                    onClick={() => archiveCall(false)}
                  >
                    <img src="/img/archive.svg" width={15} alt="" />
                  </Button>
                ) : (
                  <Button
                    type="dashed"
                    size="small"
                    onClick={() => archiveCall(true)}
                  >
                    <img src="/img/archive-rotated.svg" width={15} alt="" />
                  </Button>
                )}
              </>
            )}

            <Link className={Styles.detail_btn} to={`/feed/${actvData.id}`}>
              <Button type="dashed" size="small">
                <img src="/img/arrow-up-right.svg" width={10} alt="" />
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FeedCard;
