import { Input, Button, Typography, Card, Row, Col } from "antd";

const CommentForm = ({
  title = "Comment",
  form,
  onChange,
  onSubmitClick,
  submitTitle,
}) => {
  return (
    <Card style={{ background: "#f2f2f2" }}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Typography.Paragraph style={{ margin: 0 }}>
            {title}
          </Typography.Paragraph>
        </Col>
        <Col span={24}>
          {form.isNameDisabled ? (
            <Typography.Text style={{ fontWeight: "bold" }}>
              {form.name}
            </Typography.Text>
          ) : (
            <Input
              placeholder="Name"
              value={form.name}
              disabled={form.isNameDisabled}
              onChange={(e) => {
                onChange("name")(e.target.value);
              }}
            />
          )}
        </Col>

        <Col span={24}>
          <Input.TextArea
            placeholder="Comment"
            value={form.comment}
            onChange={(e) => {
              onChange("comment")(e.target.value);
            }}
          />
        </Col>

        <Col span={24} style={{ textAlign: "right" }}>
          <Button
            type="primary"
            disabled={!form.name || !form.comment}
            onClick={(e) => {
              e.preventDefault();
              onSubmitClick(form.id);
            }}
          >
            {submitTitle}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CommentForm;
