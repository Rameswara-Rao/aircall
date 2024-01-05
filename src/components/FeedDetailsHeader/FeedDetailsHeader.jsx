import React from "react";
import { Flex, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Styles from "./FeedDetailsHeader.module.css";

const FeedDetailsHeader = ({ headerName }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={Styles.header_spacing}>
        <Flex justify={"flex-start"}>
          <Button
            type="link"
            onClick={() => navigate(-1)}
            className={Styles.back_btn}
          >
            <img src="/img/arrow-left.svg" width={20} alt="" />
          </Button>

          <p className={Styles.headerNameStyle}>{headerName}</p>
        </Flex>
      </div>
      <hr className={Styles.hr} />
    </>
  );
};

export default FeedDetailsHeader;
