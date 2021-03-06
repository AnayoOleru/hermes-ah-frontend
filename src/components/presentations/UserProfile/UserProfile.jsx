import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Headercard from '../HeaderCard/Headercard';
import Profilecard from './ProfileCard';
import Reportcard from './ReportedCard';
import SuggestedArticleCard from './SuggestedArticleCard';
import SuggestedResearchers from './SuggestedResearchers';
import Modal from '../../shared/Modals/Modal';

class Userprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showResearchers: false,
      modalOpen: false,
      reviewerComment: {
        reviewer_comment: '',
      },
      reportedArticleId: null,
      reportid: null,
    };
  }

  handleComment = ({ target }) => {
    const { reviewerComment } = this.state;
    reviewerComment[target.id] = target.value;
    this.setState({ reviewerComment });
  };

  submitComment = async (e, id, data, reportid) => {
    const { reviewArticle } = this.props;
    e.preventDefault();
    await reviewArticle(id, data, reportid);
    this.closeModal();
  };

  componentDidMount = () => {
    const { getReportedArticle } = this.props;
    getReportedArticle();
  };

  toggle = () => {
    const { requestReview } = this.props;
    requestReview();
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  openModal = (id, reportid) => {
    this.setState({ modalOpen: true, reportedArticleId: id, reportid });
  };

  showResearchers = () =>
    this.setState(prevState => ({
      showResearchers: !prevState.showResearchers,
    }));

  render() {
    const {
      showResearchers,
      modalOpen,
      reviewerComment,
      reportedArticleId,
      reportid,
    } = this.state;
    const {
      user,
      isReviewer,
      reportedArticles,
      updateProfile,
      articles,
    } = this.props;
    const { reportedArticle: profileReports } = reportedArticles;
    const { userProfile, suggestedResearchers: allSuggestedResearchers } = user;
    const { profile } = userProfile;
    const { articleData } = articles;

    const suggestionList = articleData.filter(item => {
      return item.user_id !== profile.id;
    });

    const allReportedArticles = profileReports.filter(
      item => item.status === 'pending'
    );

    const reportList =
      profileReports.length &&
      allReportedArticles
        .map(item => (
          <Reportcard
            key={item.id}
            topic={item.reporter_reason}
            reason={item.reporter_comment}
            title={item.article.title}
            status={item.status}
            openReview={() => this.openModal(item.reported_article_id, item.id)}
          />
        ))
        .slice(0, 3);

    const suggestedArticleList = suggestionList
      .slice(0, 3)
      .map(item => (
        <SuggestedArticleCard
          key={item.id}
          title={item.title}
          body={item.abstract}
          readingTime={item.reading_time}
          firstname={item.author.first_name}
          lastname={item.author.last_name}
        />
      ));

    const suggestedResearchers = allSuggestedResearchers.filter(
      researcher => !researcher.isFollowing
    );

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16}>
              <Headercard icon="fa fa-user" value="Bio" />
              <Profilecard profile={profile} updateProfile={updateProfile} />
              <hr />

              {isReviewer ? (
                <div>
                  <Headercard icon="far fa-flag" value="Reported Articles" />
                  <Modal
                    modalOpen={modalOpen}
                    title="Review This Article"
                    closeModal={this.closeModal}
                    openModal={this.openModal}
                  >
                    <form
                      className="edit-profile-form"
                      onSubmit={e =>
                        this.submitComment(
                          e,
                          reportedArticleId,
                          reviewerComment,
                          reportid
                        )
                      }
                    >
                      <label htmlFor="comment">
                        <p>Comment</p>
                        <textarea
                          type="text"
                          id="reviewer_comment"
                          onChange={this.handleComment}
                          placeholder="what is your review?"
                        />
                      </label>
                      <div>
                        <button type="submit" className="edt-btn">
                          Review
                        </button>
                        <button
                          type="button"
                          className="cancel-btn"
                          onClick={this.closeModal}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </Modal>
                  <div>{reportList}</div>
                  <div>
                    <p className="small-text">
                      You can see reported articles because you are a reviewer
                    </p>
                    <Button onClick={this.toggle}>Remove from Reviewers</Button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="small-text">
                    Become a reviewer and review reported articles.
                  </p>
                  <div>
                    <Button onClick={this.toggle}>Become A Reviewer</Button>
                  </div>
                </div>
              )}
            </Grid.Column>

            <Grid.Column computer={8} mobile={16}>
              <Headercard icon="far fa-newspaper" value="Suggested Articles" />
              {suggestedArticleList}

              <Headercard
                icon="fa fa-users"
                value="Suggested Researchers"
                clickFunc={this.showResearchers}
                pointer="pointer"
              />
              {showResearchers ? (
                <div className="sgg-rsh-container">
                  <SuggestedResearchers
                    suggestedResearchers={suggestedResearchers}
                  />
                </div>
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

Userprofile.defaultProps = {
  isReviewer: false,
};

Userprofile.propTypes = {
  user: PropTypes.shape({
    userProfile: PropTypes.shape({}),
    suggestedResearchers: PropTypes.array,
  }).isRequired,
  articles: PropTypes.shape({
    articleData: PropTypes.array,
  }).isRequired,
  isReviewer: PropTypes.bool,
  getReportedArticle: PropTypes.func.isRequired,
  reportedArticles: PropTypes.objectOf(PropTypes.array).isRequired,
  updateProfile: PropTypes.func.isRequired,
  requestReview: PropTypes.func.isRequired,
  reviewArticle: PropTypes.func.isRequired,
};

export default Userprofile;
