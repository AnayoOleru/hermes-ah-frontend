import { connect } from 'react-redux';
import Userprofile from '../presentations/UserProfile/UserProfile';
import reportedArticleAction from '../../actions/reported.actions';

const { getReportedArticle } = reportedArticleAction;

const mapStateToProps = ({ userProfile, reportedArticles }) => ({
  userProfile,
  reportedArticles,
});

const UserprofileContainer = connect(
  mapStateToProps,
  { getReportedArticle }
)(Userprofile);

export default UserprofileContainer;
