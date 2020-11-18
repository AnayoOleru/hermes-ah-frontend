import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, convertToRaw } from 'draft-js';
import { toast } from 'react-toastify';
import draftToHtml from 'draftjs-to-html';
import uploadToCloudnary from '../../../utils/uploadToCloudnary';
import NewArticleForm from './NewArticleForm/NewArticleForm';
import validateImage from '../../../utils/validateImage';
import NavBar from '../../shared/NavBar/NavBar';
import keywordOptions from './NewArticleForm/keywords';

class NewArticle extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
      keywords: [],
      imageUrl: '',
      editorState: EditorState.createEmpty(),
      body: '',
      title: '',
      abstract: '',
      options: keywordOptions,
    };
  }

  onChange = ({ target }) => {
    this.setState({ [target.name]: target.value.toLowerCase() });
  }

  onEditorStateChange = editorState => {
    const body = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    this.setState({
      body,
      editorState,
    });
  };

  handleAddition = (e, { value }) => {
    return this.setState(prevState => ({
      options: [...prevState.options, { text: value, value }],
    }));
  };

  handleChange = (e, { value }) => {
    return this.setState({ keywords: value });
  };

  saveToCloudinary = async e => {
    const form = new FormData();
    const imageData = e.target.files[0];
    const validFormat = validateImage(imageData);
    if (validFormat.valid) {
      toast.info(validFormat.message, {
        type: toast.TYPE.INFO,
        closeButton: false,
        position: toast.POSITION.TOP_CENTER,
      });
      form.append('file', imageData);
      const res = await uploadToCloudnary(form);
      this.setState({ imageUrl: res.url });
      toast.dismiss();
    } else {
      toast.error(validFormat.message);
      e.target.value = '';
    }
  };

  saveCategory = e => {
    e.preventDefault();
    const categoryData = e.target.attributes.getNamedItem('name').value;
    this.setState({ category: categoryData });
  };

  saveOrPublish = async (e, isDraft) => {
    e.preventDefault();
    const { postArticle } = this.props;
    const { title, abstract, imageUrl, body, keywords, category } = this.state;
    const data = {
      title,
      abstract,
      is_draft: isDraft,
      image_url: imageUrl,
      body,
      keywords,
      category,
    };
    await postArticle(data);
  };

  render() {
    const { editorState, imageUrl, options } = this.state;
    return (
      <React.Fragment>
        <NavBar />
        <NewArticleForm
          saveCategory={this.saveCategory}
          onEditorStateChange={this.onEditorStateChange}
          editorState={editorState}
          onChange={this.onChange}
          saveOrPublish={this.saveOrPublish}
          saveToCloudinary={this.saveToCloudinary}
          headerImage={imageUrl}
          options={options}
          handleChange={this.handleChange}
          handleAddition={this.handleAddition}
        />
      </React.Fragment>
    );
  }
}

NewArticle.propTypes = {
  postArticle: PropTypes.func.isRequired,
};

export default NewArticle;
