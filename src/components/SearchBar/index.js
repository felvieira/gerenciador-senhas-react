import React, { Component } from 'react';

export default class SearchBar extends Component {
  // Callback para pegar input e passar para o Parent
  handleInputChange = e => {
    if (e.target.value.length > 3) {
      this.props.getInputItemInFilter(e.target.value);
    } else {
      this.props.getInputItemInFilter('all');
    }
  };

  componentWillReceiveProps(nextProps) {
    // console.log('LOCAL', this.props.getCountMatchedItems.val);
    // console.log('NEXT', nextProps.getCountMatchedItems.val);

    if (
      this.props.getCountMatchedItems.val &&
      nextProps.getCountMatchedItems.val === ''
    ) {
      this.refs.searchInput.value = '';
    }
  }

  componentDidMount() {
    // console.log('DIDupdate', this.props.passInputValue);
  }

  componentDidUpdate(prevProps, prevState) {
    // if (
    //   this.props.getCountMatchedItems.val !== prevProps.getCountMatchedItems.val
    // ) {
    //   console.log('XXXXXXX');
    // }
    // console.log('TCL: componentDidUpdate -> prevProps', prevProps);
  }

  render() {
    const { getCountMatchedItems } = this.props;
    return (
      <div className="search">
        <form action="">
          <input
            type="text"
            ref="searchInput"
            name=""
            id=""
            defaultValue={getCountMatchedItems.val}
            onChange={e => this.handleInputChange(e)}
            placeholder="Procurar por senhas ..."
          />
          <small>{getCountMatchedItems.length}</small>
        </form>
      </div>
    );
  }
}
