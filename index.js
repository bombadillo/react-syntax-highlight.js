import React from 'react';
import ReactDOM from 'react-dom';
import hljs from 'highlight.js';
import PropTypes from 'prop-types';

export default class HighLight extends React.Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired
  }

  componentDidMount = () => {
    // this will only be called once after first time render
    this.updateCodeBlockDOM();
  }

  componentDidUpdate = () => {
    // whenever component is updated
    this.updateCodeBlockDOM();
  }

  render () {
    /*
      * <pre inherit_all_the_props_from_parent >
      *  <code ref='code' className={'hljs ' + this.props.lang}>
      *    to_be_rendered_by_highlight.js
      *  </code>
      * </pre>
      *
      */

    var props = Object.assign({}, this.props);
    delete props.lang;
    delete props.value;

    return (
       React.createElement('pre', props,
          React.createElement('code', {
            ref: 'code',
            className: 'hljs ' + this.props.lang
          })
        )
    );
  }

  updateCodeBlockDOM = () => {
    // update real DOM element after component render
    var ele = ReactDOM.findDOMNode(this.refs.code);

    try {
      ele.innerHTML = hljs.highlight(this.props.lang, this.props.value, true).value;
    } catch (e) {
      console.warn(e);
      ele.innerHTML = this.props.value; // remove syntax highlight
    }
  }
}