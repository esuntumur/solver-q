import React, { Component } from "react";
import { connect } from "react-redux";
import UpdateComment from "./UpdateComment";
import {
  getCommentsByPageNumber,
  voteComment,
  sendComment,
  deleteComment,
  updateComment,
  updateCommentToggle,
} from "../../../redux/actions/commentAction";

import "./commentList.scss";

export class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentWillMount() {
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }
  async componentDidMount() {
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }

  async sendCommentAsync(event) {
    event.preventDefault();
    await this.props.sendComment(this.props.selectedQuestion, event.target.answer.value);
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }
  async voteCommentAsync(comment) {
    await this.props.voteComment(
      comment,
      this.props.user_id,
      this.props.getCommentsByPageNumber
    );
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }
  async deleteCommentAsync(comment) {
    await this.props.deleteComment(comment);
    await this.props.getCommentsByPageNumber(
      this.props.selectedQuestion,
      this.props.currentPageComment
    );
  }
  async updateCommentAsync(event) {
    // await this.props.updateComment(comment);
    // await this.props.getCommentsByPageNumber(
    //   this.props.selectedQuestion,
    //   this.props.currentPageComment
    // );
  }
  render() {
    const { getCommentsByPageNumber, comments, updateCommentToggle } = this.props;
    let {
      currentPageComment,
      maxPageComment,
      selectedQuestion,
      user_id,
      selectedCommentId,
    } = this.props;

    user_id *= 1;

    return (
      <div>
        <link
          rel="stylesheet"
          href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css"
          type="text/css"
        />
        {/* //* Create COMMENT */}
        <form onSubmit={this.sendCommentAsync.bind(this)} className="flex-column">
          <h4>Comment: </h4>
          <div className="d-flex align-items-center">
            <div className="q-comment">
              <input type="text" name="answer" className="w-100 " />
            </div>
            <div className="q-submit-btn">
              <button className="btn comment-btn" type="submit">
                <i className="fa fa-paper-plane comment-plane"></i>
              </button>
            </div>
          </div>
        </form>

        {/* //* Comment LIST */}
        <div className="comments">
          {comments.map((comment, idx) => (
            <div className="card mb-4" key={idx}>
              <div className="card-group">
                {/* //* Comment -> VOTE, count && user name, profile */}
                <div className="card-1 text-white rounded">
                  <div className="card-body">
                    {/* <img src="..." alt="..." /> */}
                    <div>{comment.votes.length}votes</div>
                    <div>
                      {/* //* VOTE Comment */}
                      {!comment.votes.includes(user_id) ? (
                        <button
                          className="btn btn-info vote-btn"
                          onClick={() => {
                            this.voteCommentAsync.bind(this)(comment);
                          }}
                        >
                          Vote
                        </button>
                      ) : (
                        <button className="btn btn-info vote-btn" disabled>
                          Voted
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* //* Comment -> Answer TEXT */}
                <div className="card rounded card-2">
                  <div className="card-body">
                    <h5 className="card-title">{comment.answer}</h5>
                  </div>
                </div>

                <div className="card align-items-center">
                  {/* //* Comment -> Delete, Update -> buttons */}
                  {comment.user.id === user_id && (
                    <div className="col-1.5">
                      <div className="row">
                        <button
                          className="comment-del-up rounded btn btn-info shadow"
                          type="button"
                          onClick={() => {
                            this.deleteCommentAsync.bind(this)(comment);
                          }}
                        >
                          Delete
                        </button>{" "}
                      </div>
                      <div className="row ">
                        {" "}
                        <button
                          className="comment-del-up rounded btn btn-info shadow"
                          type="button"
                          onClick={() => {
                            updateCommentToggle(comment.id);
                          }}
                        >
                          Update
                        </button>{" "}
                        <div className="d-flex">
                          {selectedCommentId === comment.id ? (
                            <UpdateComment selectedCommentId={selectedCommentId} />
                          ) : null}
                          {comment.id}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* //* comment PAGINATION - prev, next buttons  */}
        <div className="text-center">
          <div className="flex btn-group btn-group-toggle pg-buttons">
            {currentPageComment >= 2 ? (
              <button
                className="btn btn-dark pg-btn-prev"
                onClick={() => {
                  getCommentsByPageNumber(selectedQuestion, --currentPageComment);
                }}
              >
                <span aria-hidden="true">&laquo;</span>
              </button>
            ) : null}
               
            <button type="button" className="btn btn-secondary" disabled>
              {currentPageComment} 
            </button>
             
            {currentPageComment >= maxPageComment ? null : (
              <button
                className="btn btn-dark pg-btn-next"
                onClick={() => {
                  getCommentsByPageNumber(
                    this.props.selectedQuestion,
                    ++currentPageComment
                  );
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.question.comments,
    maxPageComment: state.question.maxPageComment,
    currentPageComment: state.question.currentPageComment,
    selectedCommentId: state.question.selectedCommentId,
  };
};

let mapDispatchToProps = {
  getCommentsByPageNumber,
  voteComment,
  sendComment,
  deleteComment,
  updateComment,
  updateCommentToggle,
};
// ;
const Container = connect(mapStateToProps, mapDispatchToProps)(CommentList);
export default Container;
