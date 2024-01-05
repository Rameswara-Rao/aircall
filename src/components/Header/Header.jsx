import React, { useContext } from "react";
import { Flex, Input, Segmented } from "antd";
import Styles from "./Header.module.css";
import { DataContext } from "../../store/store";

const Header = () => {
  const { activityType, setActivityType } = useContext(DataContext);

  return (
    <>
      <div className={Styles.header}>
        <div className={Styles.header_spacing}>
          <Flex justify={"space-between"}>
            <img src="/img/logowhite.png" width={90} alt="" />
          </Flex>
        </div>
        <div className={Styles.seg_bg}>
          <Segmented
            options={["Active Feed", "Archive"]}
            block
            className={Styles.segmented_styling}
            value={activityType}
            onChange={setActivityType}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
