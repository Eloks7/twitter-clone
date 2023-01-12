import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatTweet, formatDate } from '../utils/helpers';
import {TiArrowBackOutline, TiHeartOutline, TiHeartFullOutline} from 'react-icons/ti';
import { handleToggleTweet } from '../actions/tweets';
import { Link } from 'react-router-dom';
import {
    useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";
class Tweet extends Component {

    handleLike = (e) => {
        e.preventDefault()
    
        const { dispatch, tweet, authedUser } = this.props;

        dispatch(handleToggleTweet({
            id: tweet.id,
            hasLiked: tweet.hasLiked,
            authedUser
        }))
    }
    toParent = (e, id) => {
        e.preventDefault()
        // this.props.history.push(`/tweet/${id}`)
        // nextPage = useNavigate();
        const nextPage = this.props.navigate;
        
        return () => nextPage(`/tweet/${id}`);
    }

    render() {
        const { tweet } = this.props;

        if (tweet === null) {
            return <p>This tweet does not exist</p>
        }

        const { name, avatar, timestamp, text, hasLiked, likes, replies, id, parent
        } = tweet;
        const nextPage = this.props.router.navigate;

        console.log(this.props)
        return (
            <Link to={`/tweet/${id}`}>
                <div className="tweet">
                    <img
                        src={avatar}
                        alt={`Avatar of ${name}`}
                        className="avatar"
                    />
                    <div className="tweet-info">
                        <div>
                            <span>{name}</span>
                            <div>{formatDate(timestamp)}</div>
                            {parent && (
                                // <button className="replying-to" onClick={(e) => this.toParent(e, parent.id)}>
                                <button className="replying-to" onClick={() => nextPage(`/tweet/${parent.id}`)}>
                                    Replying to @{parent.author}
                                </button>
                            )}
                            <p>{text}</p>
                        </div>
                        <div className="tweet-icons">
                            <TiArrowBackOutline className="tweet-icon" />
                            <span>{replies !== 0 && replies}</span>
                            <button className="heart-button" onClick={this.handleLike}>
                                {hasLiked === true
                                ? <TiHeartFullOutline color="#e0245e" className="tweet-icon" />
                                : <TiHeartOutline className="tweet-icon" />}
                            </button>
                            <span>{likes !== 0 && likes}</span>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

function mapStateToProps ( { authedUser, users, tweets }, { id }) {
    const tweet = tweets[id];
    const parentTweet = tweet ? tweets[tweet.replyingTo] : null;

    return {
        authedUser,
        tweet: tweet
        ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
        : null
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

export default withRouter(connect(mapStateToProps)(Tweet));