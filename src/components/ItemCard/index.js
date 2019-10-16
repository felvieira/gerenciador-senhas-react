import React, { Component } from 'react';
import { Colors } from './styles';
import Header from '../Header';
import localStorager from '../../services/storage';

const info = (type, isnew) => {
  switch (type) {
    case 'GenericNote':
      return {
        label: `${isnew ? 'Nova' : 'Editar'} Nota`,
        color: '#15ADF6',
        nameType: 'Nota',
      };
    case 'Nota':
      return {
        label: `${isnew ? 'Nova' : 'Editar'} Nota`,
        color: '#15ADF6',
        nameType: 'Nota',
      };
    case 'CreditCard':
      return {
        label: `${isnew ? 'Novo' : 'Editar'} Cartão`,
        color: '#2EB872',
        nameType: 'Cartão de crédito',
      };
    case 'Cartão de crédito':
      return {
        label: `${isnew ? 'Novo' : 'Editar'} Cartão`,
        color: '#2EB872',
        nameType: 'Cartão de crédito',
      };
    case 'Site':
      return {
        label: `${isnew ? 'Novo' : 'Editar'} Website`,
        color: '#6155CC',
        nameType: 'Site',
      };
    case 'Website':
      return {
        label: `${isnew ? 'Novo' : 'Editar'}  Website`,
        color: '#6155CC',
        nameType: 'Site',
      };
    default:
      return {
        label: `${isnew}`,
        color: '#6155CC',
        nameType: '',
      };
  }
};

export default class ItemCard extends Component {
  state = {
    data: {
      name: '',
      login_url: '',
      type: 'Nota',
      identifiers: {
        notes: '',
        username: '',
        password: '',
        cardNumber: '',
        cardType: '',
        nameOnCard: '',
        security_code: '',
        expires: '',
      },
      date: '',
    },
    note: {},
    website: '',
    creditCard: '',
  };

  componentDidMount() {
    if (this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  backButton = () => {
    this.props.backButton(this.props.isNew);
  };

  sendHandler = (e, nameType, isNew, index) => {
    if (isNew) {
      localStorager.set('pass', this.state.data);
    } else {
      localStorager.update(index, 'pass', this.state.data);
    }
    this.props.update();
    this.props.backButton(this.props.isNew);
  };

  inputChangedHandler = (e, tgt, nameType) => {
    this.setState({
      data: { ...this.state.data, type: nameType, [tgt]: e.target.value },
    });
  };

  inputNestedChangedHandler = (e, tgt, nameType) => {
    this.setState({
      data: {
        ...this.state.data,
        type: nameType,
        identifiers: { [tgt]: e.target.value },
      },
    });
  };

  render() {
    const { type, isNew, index } = this.props;
    const { label, color, nameType } = info(type, isNew);
    const {
      name,
      login_url,
      identifiers: {
        password,
        username,
        notes,
        cardNumber,
        cardType,
        nameOnCard,
        security_code,
        expires,
      },
    } = this.state.data;

    return (
      <div className="modal">
        <Header title={label} modal backButton={this.backButton} />
        <div className="content">
          {nameType === 'Nota' && (
            <form action="">
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  NOME
                </label>

                <input
                  type="text"
                  defaultValue={name}
                  style={{ borderColor: color }}
                  onChange={event =>
                    this.inputChangedHandler(event, 'name', nameType)
                  }
                />
              </div>
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  NOTA
                </label>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  style={{ borderColor: color }}
                  defaultValue={notes}
                  onChange={event =>
                    this.inputNestedChangedHandler(event, 'notes', nameType)
                  }
                />
              </div>
            </form>
          )}
          {nameType === 'Site' && (
            <form action="">
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  NOME
                </label>
                <input
                  type="text"
                  value={name}
                  style={{ borderColor: color }}
                  onChange={event =>
                    this.inputChangedHandler(event, 'name', nameType)
                  }
                />
              </div>
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  ENDEREÇO DO SITE
                </label>
                <input
                  type="text"
                  value={login_url}
                  style={{ borderColor: color }}
                  onChange={event =>
                    this.inputChangedHandler(event, 'login_url', nameType)
                  }
                />
              </div>
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  USUÁRIO
                </label>
                <input
                  type="text"
                  defaultValue={username}
                  style={{ borderColor: color }}
                  onChange={event =>
                    this.inputNestedChangedHandler(event, 'username', nameType)
                  }
                />
              </div>
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  SENHA
                </label>
                <input
                  type="text"
                  value={password}
                  style={{ borderColor: color }}
                  onChange={event =>
                    this.inputNestedChangedHandler(event, 'password', nameType)
                  }
                />
              </div>
            </form>
          )}

          {nameType === 'Cartão de crédito' && (
            <form action="">
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  NOME
                </label>
                <input
                  type="text"
                  value={name}
                  style={{ borderColor: color }}
                  onChange={event =>
                    this.inputChangedHandler(event, 'name', nameType)
                  }
                />
              </div>
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  NÚMERO DO CARTÃO
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  style={{ borderColor: color }}
                  onChange={event =>
                    this.inputNestedChangedHandler(
                      event,
                      'cardNumber',
                      nameType
                    )
                  }
                />
              </div>
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  EXPIRAÇÃO
                </label>
                <input
                  type="text"
                  value={expires}
                  style={{ borderColor: color }}
                  onChange={event =>
                    this.inputNestedChangedHandler(event, 'expires', nameType)
                  }
                />
              </div>
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  CÓDIGO DE SEGURANÇA
                </label>
                <input
                  type="text"
                  value={security_code}
                  style={{ borderColor: color }}
                  onChange={event =>
                    this.inputNestedChangedHandler(
                      event,
                      'security_code',
                      nameType
                    )
                  }
                />
              </div>
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  NOME NO CARTÃO
                </label>
                <input
                  type="text"
                  value={nameOnCard}
                  style={{ borderColor: color }}
                  onChange={event =>
                    this.inputNestedChangedHandler(
                      event,
                      'nameOnCard',
                      nameType
                    )
                  }
                />
              </div>
              <div className="form-block">
                <label htmlFor="" style={{ color }}>
                  BANDEIRA
                </label>
                <input
                  type="text"
                  value={cardType}
                  style={{ borderColor: color }}
                  onChange={event =>
                    this.inputNestedChangedHandler(event, 'cardType', nameType)
                  }
                />
              </div>
            </form>
          )}
        </div>
        <div className="footer">
          <Colors
            color={color}
            onClick={e => this.sendHandler(e, nameType, isNew, index)}
          >
            {isNew ? 'CADASTRAR' : 'EDITAR'}
          </Colors>
        </div>
      </div>
    );
  }
}
