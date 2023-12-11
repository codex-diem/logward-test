import { Card, Col, Row, Space, Typography, Button } from "antd";
import CommentForm from "../Comment/Comment.form";
import moment from "moment";
import { DeleteOutlined } from "@ant-design/icons";

const CommentList = ({
  commentList,
  onEditComment,
  onReplyComment,
  onDeleteComment,
  onCommentChange,
  onCommentSubmit,
  onEditReply,
  onDeleteReply,
  onReplyChange,
  onReplySubmit,
}) => {
  return (
    <Row gutter={[16, 16]}>
      {commentList?.length > 0 ? (
        commentList.map((item, index) => {
          return (
            <Col key={item.id} span={24}>
              {item.isEditable ? (
                <CommentForm
                  title="Comment"
                  form={item}
                  onChange={onCommentChange(item.id)}
                  submitTitle={"SAVE CHANGES"}
                  onSubmitClick={onCommentSubmit}
                />
              ) : (
                <>
                  <Card style={{ background: "#f2f2f2" }}>
                    <Row gutter={[8, 8]}>
                      <Col span={8}>
                        <Typography.Text
                          style={{ margin: 0, fontWeight: "bold" }}
                        >
                          {item.name}
                        </Typography.Text>
                      </Col>
                      <Col span={16} style={{ textAlign: "right" }}>
                        <Typography.Text style={{ margin: 0 }}>
                          {moment(item.timeStamp).format("Do MMM YYYY, h:mm")}
                        </Typography.Text>
                      </Col>
                      <Col span={24}>
                        <Typography.Paragraph style={{ margin: 0 }}>
                          {item.comment}
                        </Typography.Paragraph>
                      </Col>
                      <Col span={24}>
                        <Space>
                          <Button
                            onClick={(e) => {
                              !!e && e.preventDefault();
                              onReplyComment(item.id);
                            }}
                            style={{ padding: 0 }}
                            type="link"
                          >
                            Reply
                          </Button>
                          <Button
                            onClick={(e) => {
                              e && e.preventDefault();
                              onEditComment(item.id);
                            }}
                            style={{ padding: 0 }}
                            type="link"
                          >
                            Edit
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                    <Button
                      type="default"
                      icon={<DeleteOutlined />}
                      shape="circle"
                      onClick={(e) => {
                        !!e && e.preventDefault();
                        onDeleteComment(item.id);
                      }}
                      style={{
                        padding: 0,
                        position: "absolute",
                        right: -30,
                        top: "50%",
                        transform: "translate(-50%,-50%",
                      }}
                    />
                  </Card>

                  {item?.replies?.length > 0 && (
                    <Row
                      style={{ paddingLeft: 100, paddingTop: 8 }}
                      gutter={[8, 8]}
                    >
                      {item?.replies?.map((reply) => {
                        return (
                          <Col key={reply.id} span={24}>
                            {reply?.isEditable ? (
                              <CommentForm
                                title="Reply"
                                form={reply}
                                onChange={onReplyChange(item.id)(reply.id)}
                                submitTitle={
                                  reply.isNameDisabled ? "SAVE CHANGES" : "POST"
                                }
                                onSubmitClick={onReplySubmit(item.id)}
                              />
                            ) : (
                              <Card style={{ background: "#f2f2f2" }}>
                                <Row gutter={[8, 8]}>
                                  <Col span={8}>
                                    <Typography.Text
                                      style={{ margin: 0, fontWeight: "bold" }}
                                    >
                                      {reply.name}
                                    </Typography.Text>
                                  </Col>
                                  <Col span={16} style={{ textAlign: "right" }}>
                                    <Typography.Text style={{ margin: 0 }}>
                                      {moment(reply.timeStamp).format(
                                        "Do MMM YYYY, h:mm"
                                      )}
                                    </Typography.Text>
                                  </Col>
                                  <Col span={24}>
                                    <Typography.Paragraph style={{ margin: 0 }}>
                                      {reply.comment}
                                    </Typography.Paragraph>
                                  </Col>
                                  <Col span={24}>
                                    <Space>
                                      <Button
                                        onClick={(e) => {
                                          e && e.preventDefault();
                                          onEditReply(item.id)(reply.id);
                                        }}
                                        style={{ padding: 0 }}
                                        type="link"
                                      >
                                        Edit
                                      </Button>
                                      {/* <Button
                                        onClick={(e) => {
                                          !!e && e.preventDefault();
                                          onDeleteReply(item.id)(reply.id);
                                        }}
                                        style={{ padding: 0 }}
                                        type="link"
                                      >
                                        Delete
                                      </Button> */}
                                    </Space>
                                  </Col>
                                </Row>
                                <Button
                                  type="default"
                                  shape="circle"
                                  icon={<DeleteOutlined />}
                                  onClick={(e) => {
                                    !!e && e.preventDefault();
                                    onDeleteReply(item.id)(reply.id);
                                  }}
                                  style={{
                                    padding: 0,
                                    position: "absolute",
                                    right: -30,
                                    top: "50%",
                                    transform: "translate(-50%,-50%",
                                  }}
                                />
                              </Card>
                            )}
                          </Col>
                        );
                      })}
                    </Row>
                  )}
                </>
              )}
            </Col>
          );
        })
      ) : (
        <Col span={24}>
          <Typography.Title>No Comments!</Typography.Title>
          <Typography.Text>
            Comments will start appearing once you post
          </Typography.Text>
        </Col>
      )}
    </Row>
  );
};

export default CommentList;
