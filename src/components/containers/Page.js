import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import CommentForm from "../Comment/Comment.form";
import CommentFilter from "../Filter/Filter";
import { clearStorage, getData, setData } from "../../utils/localstorage.utils";
import CommentList from "../CommentList";
import { Col, Row } from "antd";

const Page = () => {
  const initialFormState = {
    id: uuidv4(),
    name: "",
    comment: "",
    timeStamp: "",
    isEditable: true,
    isNameDisabled: false,
    replies: [],
  };

  const [newForm, setNewForm] = useState(initialFormState);

  const [allComments, setAllComments] = useState(getData("allComments") || []);
  const [isAscending, setIsAscending] = useState(false);

  const newFormHandlers = {
    onChange: (field) => (value) => {
      setNewForm((currentState) => {
        return {
          ...currentState,
          [field]: value,
        };
      });
    },
    onSubmit: (id) => {
      const payload = {
        ...newForm,
        id: id,
        timeStamp: new Date(),
        isEditable: false,
        isNameDisabled: true,
      };

      let payloadData = allComments || [];
      payloadData = [...payloadData, payload];
      setAllComments(payloadData);
      setData("allComments", payloadData);

      setNewForm(initialFormState);
    },
  };

  const commentFormHandlers = {
    onEditComment: async (id) => {
      await setAllComments((currentState) => {
        let finalState = currentState.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              isEditable: true,
              isNameDisabled: true,
            };
          } else return item;
        });

        return finalState;
      });
    },

    onReplyComment: (id) => {
      setAllComments((currentState) => {
        return currentState.map((item, index) => {
          if (item.id === id) {
            return {
              ...item,
              replies: [initialFormState, ...item.replies],
            };
          } else return item;
        });
      });
    },

    onDeleteComment: async (id) => {
      await setAllComments((currentState) => {
        setData(
          "allComments",
          currentState.filter((item) => item.id !== id)
        );
        return currentState.filter((item) => item.id !== id);
      });
    },

    onChange: (id) => (field) => (value) => {
      setAllComments((currentState) => {
        return currentState.map((item, index) => {
          if (item.id === id) {
            return {
              ...item,
              [field]: value,
            };
          } else return item;
        });
      });
    },

    onSubmit: (id) => {
      setAllComments((currentState) => {
        const finalState = currentState.map((item, index) => {
          if (item.id === id) {
            return {
              ...item,
              timeStamp: new Date(),
              isEditable: false,
              isNameDisabled: true,
            };
          } else return item;
        });

        setData("allComments", finalState);
        return finalState;
      });
    },
  };

  const replyFormHandlers = {
    onEditClick: (commentId) => (replyId) => {
      setAllComments((currentState) => {
        const commentIndex = currentState.findIndex(
          (comment) => comment.id === commentId
        );

        const replyIndex = currentState[commentIndex].replies.findIndex(
          (reply) => reply.id === replyId
        );

        if (replyIndex !== -1) {
          currentState = currentState.map((item) => {
            if (commentId === item.id) {
              return {
                ...item,
                replies: item.replies.map((itemReply, index) => {
                  if (index === replyIndex) {
                    return {
                      ...itemReply,
                      isEditable: true,
                      isNameDisabled: true,
                    };
                  }
                  return itemReply;
                }),
              };
            }
            return item;
          });
        }
        return currentState;
      });

      //   setAllComments((currentState) => {
      //     return currentState.map((comment) => {
      //       if (comment.id === commentId) {
      //         return comment.replies.map((reply) => {
      //           if (reply.id === replyId) {
      //             return {
      //               ...reply,
      //               isEditable: true,
      //               isNameDisabled: false,
      //             };
      //           } else return reply;
      //         });
      //       } else return comment;
      //     });
      //   });
    },

    onChange: (commentId) => (replyId) => (field) => (value) => {
      setAllComments((currentState) => {
        const commentIndex = currentState.findIndex(
          (comment) => comment.id === commentId
        );

        const replyIndex = currentState[commentIndex].replies.findIndex(
          (reply) => reply.id === replyId
        );

        if (replyIndex !== -1) {
          currentState = currentState.map((item) => {
            if (commentId === item.id) {
              return {
                ...item,
                replies: item.replies.map((itemReply, index) => {
                  if (index === replyIndex) {
                    return {
                      ...itemReply,
                      [field]: value,
                    };
                  }
                  return itemReply;
                }),
              };
            }
            return item;
          });
        }
        return currentState;
      });
    },
    onDeleteClick: (commentId) => (replyId) => {
      setAllComments((currentState) => {
        const commentIndex = currentState.findIndex(
          (comment) => comment.id === commentId
        );

        const replyIndex = currentState[commentIndex].replies.findIndex(
          (reply) => reply.id === replyId
        );

        if (replyIndex !== -1) {
          currentState = currentState.map((item) => {
            if (commentId === item.id) {
              return {
                ...item,
                replies: item.replies.filter(
                  (replyItem) => replyItem.id !== replyId
                ),
              };
            }
            return item;
          });
        }
        setData("allComments", currentState);
        return currentState;
      });
    },
    onSubmitClick: (commentId) => (replyId) => {
      setAllComments((currentState) => {
        const commentIndex = currentState.findIndex(
          (comment) => comment.id === commentId
        );

        const replyIndex = currentState[commentIndex].replies.findIndex(
          (reply) => reply.id === replyId
        );

        if (replyIndex !== -1) {
          currentState = currentState.map((item) => {
            if (commentId === item.id) {
              return {
                ...item,
                replies: item.replies.map((itemReply, index) => {
                  if (index === replyIndex) {
                    return {
                      ...itemReply,
                      timeStamp: new Date(),
                      isEditable: false,
                      isNameDisabled: false,
                    };
                  }
                  return itemReply;
                }),
              };
            }
            return item;
          });
        }
        setData("allComments", currentState);
        return currentState;
      });
    },
  };

  const handleSort = (e) => {
    !!e && e.preventDefault();

    setIsAscending(!isAscending);
  };

  const getSortedComments = (list) => {
    const byDateAscending = (a, b) =>
      new Date(a.timeStamp) - new Date(b.timeStamp);

    const byDateDescending = (a, b) =>
      new Date(b.timeStamp) - new Date(a.timeStamp);

    if (isAscending) {
      list.sort(byDateAscending).forEach((element) => {
        if (element?.replies?.length > 0) {
          return { ...element, replies: element.replies.sort(byDateAscending) };
        } else return element;
      });
      return list;
    } else {
      list.sort(byDateDescending).forEach((element) => {
        if (element?.replies?.length > 0) {
          return {
            ...element,
            replies: element.replies.sort(byDateDescending),
          };
        } else return element;
      });
      return list;
    }
  };

  return (
    <Row
      style={{
        width: "100%",
        marginLeft: 0,
        marginRight: 0,
        padding: "2em 20em",
      }}
      gutter={[16, 16]}
    >
      <Col span={24}>
        <CommentForm
          form={newForm}
          title="Comment"
          onChange={newFormHandlers?.onChange}
          submitTitle={"POST"}
          onSubmitClick={newFormHandlers?.onSubmit}
        />
      </Col>
      <Col span={24}>
        <CommentFilter
          onSortClick={handleSort}
          isAscending={isAscending}
          onClear={() => {
            clearStorage();
            setAllComments([]);
          }}
        />
      </Col>
      <Col span={24}>
        <CommentList
          commentList={getSortedComments(allComments, isAscending)}
          onEditComment={commentFormHandlers.onEditComment}
          onReplyComment={commentFormHandlers.onReplyComment}
          onDeleteComment={commentFormHandlers.onDeleteComment}
          onCommentChange={commentFormHandlers.onChange}
          onCommentSubmit={commentFormHandlers.onSubmit}
          onEditReply={replyFormHandlers.onEditClick}
          onDeleteReply={replyFormHandlers.onDeleteClick}
          onReplyChange={replyFormHandlers.onChange}
          onReplySubmit={replyFormHandlers?.onSubmitClick}
        />
      </Col>
    </Row>
  );
};

export default Page;
