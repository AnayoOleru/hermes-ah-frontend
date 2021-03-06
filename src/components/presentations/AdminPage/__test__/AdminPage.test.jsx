import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ReportedArticles from '../ReportedArticles';
import ReviewedArticles from '../../ReviewedArticles/ReviewedArticles';
import AdminPage from '../AdminPage';
import RequestList from '../../ReviewerRequests/Requests/Requests';
import ReviewerRequestCard from '../../ReviewerRequests/ReviewersCard/Reviewers-card';
import mock from '../../../../utils/testMocks';

const { reportedArticleProps, reviewerRequestProps } = mock;

const props = {
  getUserRequests: jest.fn(),
  getReportedArticle: jest.fn(),
  adminAcceptRequest: jest.fn(),
  adminRejectRequest: jest.fn(),
  reviewerRequestProps,
  reportedArticleProps,
  reportedArticle: [],
};

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const store = mockStore({});

const AdminPageCont = (
  <Provider store={store}>
    <AdminPage {...props} />
  </Provider>
);

describe('AdminPage component', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(AdminPageCont);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Admin page without crashing', () => {
    const wrapper = shallow(<AdminPage {...props} />);
    const event = {
      preventDefault: jest.fn(),
      target: { id: 'reviewer_comment', value: 'comment' },
    };
    expect(wrapper.find('NavBar'));
    wrapper.instance().changeTab('request-section');
    wrapper.instance().adminAcceptRequest(1);
    wrapper.instance().adminRejectRequest(2);
    expect(wrapper.instance().openModal(1));
    expect(wrapper.instance().closeModal());
    expect(wrapper.instance().handleComment(event));
    expect(wrapper.instance().submitComment(event, 1, {}, 1));
  });

  it('should render ReviewerRequest without crashing', () => {
    const wrapper = shallow(<RequestList {...reviewerRequestProps} />);
    expect(wrapper.find('div'));
  });

  it('should render ReviewedArticles without crashing', () => {
    const wrapper = shallow(<ReviewedArticles {...props} />);
    expect(wrapper.find('div'));
  });

  it('should render ReportedArticles without crashing', () => {
    const wrapper = shallow(<ReportedArticles {...reportedArticleProps} />);
    expect(wrapper.find('div'));
    const event = {
      preventDefault: jest.fn(),
      target: { id: 'reviewer_comment', value: 'comment' },
    };
    expect(wrapper.instance().openModal(1, 1));
    expect(wrapper.instance().closeModal());
    expect(wrapper.instance().handleComment(event));
    expect(wrapper.instance().submitComment(event, 1, {}, 1));
  });
});
describe('<REQUEST CARD />', () => {
  it('should render request card', () => {
    const wrapper = shallow(
      <ReviewerRequestCard
        initials=""
        imageUrl=""
        bio=""
        name=""
        button=""
        button1=""
        btnClass1=""
        btnClass=""
        adminAcceptRequest=""
        adminRejectRequest=""
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div'));
  });
});
