import React, { Component } from 'react';

import { FaTrashAlt } from 'react-icons/fa';
import { Type, Name, Dates, Site, Colors } from './styles';
import localStorager from '../../services/storage';

const switchType = type => {
  switch (type) {
    case 'GenericNote':
      return 'Nota';
    case 'CreditCard':
      return 'Cartão de crédito';
    case 'Website':
      return 'Site';
    case 'Reminder':
      return 'Reminder';
    default:
      return type;
  }
};

const switchColor = type => {
  switch (type) {
    case 'GenericNote':
      return {
        first: '#15ADF6',
        second: '#9DDCFF',
        third: '#D4D0CE',
      };
    case 'CreditCard':
      return {
        first: '#2EB872',
        second: '#94D5AF',
        third: '#D4D0CE',
      };
    case 'Website':
      return {
        first: '#6155CC',
        second: '#CEC9FF',
        third: '#D4D0CE',
      };
    case 'Nota':
      return {
        first: '#15ADF6',
        second: '#9DDCFF',
        third: '#D4D0CE',
      };
    case 'Cartão de crédito':
      return {
        first: '#2EB872',
        second: '#94D5AF',
        third: '#D4D0CE',
      };
    case 'Site':
      return {
        first: '#6155CC',
        second: '#CEC9FF',
        third: '#D4D0CE',
      };
    case 'Reminder':
      return {
        first: '#ffc931',
        second: '#CEC9FF',
        third: '#D4D0CE',
      };
    default:
      return '#E84A5F';
  }
};

export default class Card extends Component {
  handleEdit = (e, item) => {
    e.stopPropagation();
    const dt = localStorager.get('data');
    const index = dt.findIndex(obj => obj.id == item.id);
    this.props.editFN(item, index);
  };

  eraseHandler = (e, item) => {
    e.stopPropagation();
    const dt = localStorager.get('data');
    const index = dt.findIndex(obj => obj.id == item.id);
    localStorager.delete(index, 'data');
    this.props.update();
  };

  render() {
    return this.props.list.map((item, i) => {
      const cor = switchColor(item.type);
      item.type = switchType(item.type);

      return (
        <div id={`card-${i}`} className="card" key={i}>
          <Colors color={cor.first} />
          <div className="card-content">
            <Type
              color={cor.first}
              style={{ cursor: 'pointer' }}
              onClick={e => this.handleEdit(e, item)}
            >
              {item.type}
            </Type>
            <Name color={cor.second}>{item.name}</Name>
            {item.login_url && (
              <Site>
                <a
                  href={item.login_url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {item.login_url}
                </a>
              </Site>
            )}
            <Dates
              color={cor.third}
              style={{ cursor: 'pointer' }}
              onClick={e => this.handleEdit(e, item)}
            >
              Atualizado em {item.date}
            </Dates>
          </div>
          <div className="card-erase">
            <FaTrashAlt onClick={e => this.eraseHandler(e, item)} />
          </div>
        </div>
      );
    });
  }
}
