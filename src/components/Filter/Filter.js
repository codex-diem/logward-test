import { Button, Row, Col } from "antd";
import ArrowUpOutlined from "@ant-design/icons/ArrowUpOutlined";
import ArrowDownOutlined from "@ant-design/icons/ArrowDownOutlined";
import { clearStorage } from "../../utils/localstorage.utils";

const CommentFilter = ({ onSortClick, isAscending, onClear }) => {
  return (
    <Row style={{ textAlign: "right", marginTop: "1em", marginBottom: "1em" }}>
      <Col span={24}>
        <Button
          type="text"
          onClick={(e) => {
            !!e && e.preventDefault();
            onClear();
          }}
        >
          Clear All
        </Button>
        <Button type="text" onClick={(e) => onSortClick(e)}>
          Sort By: Date & Time{" "}
          {!isAscending ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
        </Button>
      </Col>
    </Row>
  );
};

export default CommentFilter;
