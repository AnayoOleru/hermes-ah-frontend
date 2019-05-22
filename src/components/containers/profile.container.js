import { connect } from 'react-redux';
import Profilepage from '../presentations/Profilepage/ProfilePage';
import profileAction from '../../actions/profile.action';
import { getAnArticle } from '../../actions/article.actions';
import fetchArticles from '../../actions/articles-update.actions';
import followeeAction from '../../actions/followee.actions';
import followingAction from '../../actions/following.actions';
import fetchBookmarks from '../../actions/bookmarked.action';
import RequestAction from '../../actions/reviewers-request.action';

const { getProfile, updateProfile, getSuggestions } = profileAction;
const { getFollowee, followUser } = followeeAction;
const { getFollowing, unFollowUser } = followingAction;
const { getUserRequests } = RequestAction;

const mapStateToProps = ({
  user,
  articlesUpdate,
  userFollowee,
  userFollowing,
  userRequests,
  isLoadingReducer,
  bookmarkedArticles,
}) => ({
  user,
  articlesUpdate,
  userFollowee,
  userFollowing,
  userRequests,
  isLoadingReducer,
  bookmarkedArticles,
});

const ProfilepageContainer = connect(
  mapStateToProps,
  {
    getProfile,
    fetchArticles,
    getFollowee,
    getFollowing,
    fetchBookmarks,
    updateProfile,
    getSuggestions,
    getUserRequests,
    unFollowUser,
    getAnArticle,
    followUser,
  }
)(Profilepage);

export default ProfilepageContainer;
