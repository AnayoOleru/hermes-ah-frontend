import React, { Component } from 'react';
import { Grid, Button, Checkbox } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Headercard from '../HeaderCard/Headercard';
import Profilecard from './ProfileCard';
import Reportcard from './ReportedCard';
import FollowCard from '../UserFollwing/FollowCard/Follow-card';
import SuggestedArticleCard from './SuggestedArticleCard';

class Userprofile extends Component {
  constructor(props) {
    super(props);
    const { isReviewer } = this.props;
    this.state = {
      checked: isReviewer,
    };
  }

  componentDidMount = () => {
    const { getReportedArticle, getSuggestions } = this.props;
    getReportedArticle();
    getSuggestions();
  };

  toggle = () => this.setState(prevState => ({ checked: !prevState.checked }));

  render() {
    const { checked } = this.state;
    const {
      user,
      isReviewer,
      reportedArticles,
      updateProfile,
      articles,
    } = this.props;
    const { reportedArticle: profileReports } = reportedArticles;
    const { userProfile, suggestedResearchers } = user;
    const { profile } = userProfile;
    const { articleData } = articles;

    const suggestionList = articleData.filter(item => {
      return item.user_id !== profile.id;
    });

    const reportList =
      profileReports.length &&
      profileReports
        .slice(0, 3)
        .map(item => (
          <Reportcard
            key={item.id}
            topic={item.reporter_reason}
            reason={item.reporter_comment}
            status={item.status}
          />
        ));

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

    const removeResearchersUserFollow = suggestedResearchers.filter(item => {
      return !item.isFollowing;
    });

    const suggestedResearchersList = removeResearchersUserFollow
      .map(item => (
        <FollowCard
          key={item.profile.id}
          imageUrl={item.profile.image_url}
          initials={`${item.profile.first_name
            .charAt(0)
            .toUpperCase()}${item.profile.last_name.charAt(0).toUpperCase()}`}
          bio={item.profile.bio}
          button="Follow"
          btnClass="btn-following"
          name={`${item.profile.first_name} ${item.profile.last_name}`}
        />
      ))
      .slice(0, 3);

    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column computer={8} mobile={16}>
              <Headercard icon="fa fa-user" value="Bio" />
              <Profilecard profile={profile} updateProfile={updateProfile} />

              {isReviewer ? (
                <div>
                  <Headercard icon="far fa-flag" value="Reported Articles" />
                  <div>{reportList}</div>
                  <div>
                    <Button onClick={this.toggle}>Become A Reviewer</Button>
                    <Checkbox checked={checked} />
                  </div>
                </div>
              ) : (
                <div>
                  <h2>Become a reviewer</h2>
                  <div>
                    <Button onClick={this.toggle}>Become A Reviewer</Button>
                    <Checkbox checked={checked} />
                  </div>
                </div>
              )}
            </Grid.Column>

            <Grid.Column computer={8} mobile={16}>
              {suggestedResearchersList.length ? (
                <div className="sgg-rsh-container">
                  <Headercard
                    icon="fa fa-users"
                    value="Suggested Researchers"
                  />
                  {suggestedResearchersList}
                </div>
              ) : null}

              <Headercard icon="far fa-newspaper" value="Suggested Articles" />
              {suggestedArticleList}
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
  getSuggestions: PropTypes.func.isRequired,
};

export default Userprofile;
