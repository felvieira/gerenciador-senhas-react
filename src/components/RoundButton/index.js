import React, { Component } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

export default class RoundButton extends Component {
  state = {
    submenu: false,
  };

  newItem = (e, type) => {
    e.stopPropagation();
    this.props.action(type);
    this.subMenu();
  };

  subMenu = () => {
    this.setState({
      submenu: !this.state.submenu,
    });
  };

  render() {
    const { submenu } = this.state;
    return (
      <>
        {submenu && (
          <div className="submenu">
            <button
              style={{ backgroundColor: '#15ADF6' }}
              onClick={e => this.newItem(e, 'GenericNote')}
            >
              Nota
            </button>
            <button
              style={{ backgroundColor: '#6155CC' }}
              onClick={e => this.newItem(e, 'Site')}
            >
              Site
            </button>
            <button
              style={{ backgroundColor: '#2EB872' }}
              onClick={e => this.newItem(e, 'CreditCard')}
            >
              Cartão
            </button>
          </div>
        )}
        <div className="roundButton">
          <button onClick={this.subMenu}>
            {submenu ? <FaTimes /> : <FaPlus />}
          </button>
        </div>
      </>
    );
  }
}
