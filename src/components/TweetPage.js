import React, { Component } from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";

class TweetPage extends Component {
    render() {
        const { replies, id } = this.props;
        return(
            <div>
                <Tweet id={id} />
                <NewTweet id={id} />

                {replies.length !== 0 && <h3 className="center">Replies</h3>}
                <ul>
                    {replies.map((replyId) => (
                        <li key={replyId}>
                            <Tweet id={replyId} />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps ( { tweets, users, authedUser }, props) {
    const { id } = props.match.params;

    return {
        id,
        replies: !tweets[id]
            ? []
            : tweets[id].replies.sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
      let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component
          {...props}
          router={{ location, navigate, params }}
        />
      );
    }
  
    return ComponentWithRouterProp;
}

export default withRouter(connect(mapStateToProps)(TweetPage));