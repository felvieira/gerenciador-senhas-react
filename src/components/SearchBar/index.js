import React, { Component } from 'react';

export default class SearchBar extends Component {
  state = {
    inputValue: '',
  };

  // Callback para pegar input e passar para o Parent
  handleInputChange = e => {
    this.setState({ inputValue: e.target.value });
    if (e.target.value.length > 3) {
      this.props.getInputItemInFilter(e.target.value);
    } else if (e.target.value.length === 3)
      this.props.getInputItemInFilter('all');
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className="search">
        <form action="">
          <input
            type="text"
            name=""
            id=""
            value={inputValue}
            onChange={this.handleInputChange}
            placeholder="Procurar por senhas ..."
          />
          <small>{this.props.getCountMatchedItems}</small>
        </form>
      </div>
    );
  }
}
