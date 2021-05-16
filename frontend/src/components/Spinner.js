import { Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

const Spinner = () => {
  const styles = {
    opacity: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const spinIcon = (
    <Loading3QuartersOutlined style={{ fontSize: 100, color: "white" }} spin />
  );
  return (
    <div style={styles}>
      <Spin indicator={spinIcon} size="large" />
    </div>
  );
};

export default Spinner;
