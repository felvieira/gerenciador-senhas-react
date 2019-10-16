import React, { Component } from 'react';
import { FaChevronLeft } from 'react-icons/fa';

import SearchBar from '../SearchBar';

export default class Header extends Component {
  // Callback para pegar input do componente SearchBar e passar para o Parent
  handleInputChange = str => {
    this.props.getInputItemInFilter(str);
  };

  handleBackButton = () => {
    this.props.backButton();
  };

  render() {
    const haveFilter = this.props.getInputItemInFilter;
    const { title, modal } = this.props;
    return (
      <div className={modal ? 'header md' : 'header'}>
        {modal && (
          <div className="header-back" onClick={this.handleBackButton}>
            <FaChevronLeft />
          </div>
        )}
        <div className="header-title">{title}</div>
        {haveFilter && (
          <SearchBar
            getInputItemInFilter={this.handleInputChange}
            getCountMatchedItems={this.props.getCountMatchedItems}
          />
        )}
      </div>
    );
  }
}
