import { connect } from 'react-redux';
import NewArticle from '../presentations/NewArticle';
import { postArticle } from '../../actions/article.actions';

const mapStateToProps = ({ articles }) => ({
  success: articles.success,
  articles,
});

const Article = connect(
  mapStateToProps,
  { postArticle }
)(NewArticle);

export default Article;
