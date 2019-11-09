import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import useForm from 'react-hook-form';
import { Colors } from './styles';
import Header from '../Header';
import localStorager from '../../services/storage';

// import Cards from 'react-credit-cards';
// https://github.com/amarofashion/react-credit-cards

const ItemCard = props => {
  const { type, isNew, index } = props;

  const [data, setData] = useState({
    name: '',
    date: '',
    type: '',
    login_url: '',
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
  });

  const [note, setNote] = useState({
    name: '',
    date: '',
    type: '',
    notes: '',
  });

  const [card, setCard] = useState({
    name: '',
    date: '',
    type: '',
    cardNumber: '',
    cardType: '',
    nameOnCard: '',
    security_code: '',
    expires: '',
  });

  const [site, setSite] = useState({
    name: '',
    date: '',
    type: '',
    login_url: '',
    username: '',
    password: '',
  });

  const loadPropsIfEditMode = () => {
    if (!isNew) {
      setPropsToStateMap(props.data);
    }
  };

  const getTypeNameColor = () => {
    switch (typeOfCard) {
      case 'GenericNote':
        return {
          label: `${isNew ? 'Nova' : 'Editar'} Nota`,
          color: '#15ADF6',
          nameType: 'Nota',
        };
      case 'Nota':
        return {
          label: `${isNew ? 'Nova' : 'Editar'} Nota`,
          color: '#15ADF6',
          nameType: 'Nota',
        };
      case 'CreditCard':
        return {
          label: `${isNew ? 'Novo' : 'Editar'} Cartão`,
          color: '#2EB872',
          nameType: 'Cartão de crédito',
        };
      case 'Cartão de crédito':
        return {
          label: `${isNew ? 'Novo' : 'Editar'} Cartão`,
          color: '#2EB872',
          nameType: 'Cartão de crédito',
        };
      case 'Site':
        return {
          label: `${isNew ? 'Novo' : 'Editar'} Website`,
          color: '#6155CC',
          nameType: 'Site',
        };
      case 'Website':
        return {
          label: `${isNew ? 'Novo' : 'Editar'}  Website`,
          color: '#6155CC',
          nameType: 'Site',
        };
      default:
        return {
          label: `${isNew}`,
          color: '#6155CC',
          nameType: '',
        };
    }
  };

  const backButton = () => {
    props.backButton(props.isNew);
  };

  const setPropsToStateMap = data => {
    const {
      name,
      login_url,
      date,
      type,
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
    } = data;

    switch (typeOfCard) {
      case 'Nota':
        setNote({ name, date, type, notes });
        break;
      case 'Cartão de crédito':
        setCard({
          name,
          date,
          type,
          cardNumber,
          cardType,
          nameOnCard,
          security_code,
          expires,
        });
        break;
      case 'Site':
        setSite({
          name,
          date,
          type,
          login_url,
          username,
          password,
        });
        break;
      default:
        break;
    }
  };

  const detectType = type => {
    switch (type) {
      case 'GenericNote':
        return 'Nota';
      case 'Nota':
        return 'Nota';
      case 'CreditCard':
        return 'Cartão de crédito';
      case 'Cartão de crédito':
        return 'Cartão de crédito';
      case 'Site':
        return 'Site';
      case 'Website':
        return 'Site';
      default:
        return '';
    }
  };
  const sendHandler = index => {
    if (isNew) {
      localStorager.set('data', data);
    } else {
      localStorager.update('data', index, data);
    }
    props.update();
    props.backButton(props.isNew);
  };

  const inputChangedHandler = e => {
    const dt = moment()
      .locale('pt-br')
      .format('DD/MM/YYYY HH:mm');
    const { name, value } = e.target;
    switch (typeOfCard) {
      case 'Nota':
        setNote({
          ...note,
          date: dt,
          type: typeOfCard,
          [name]: value,
        });
        break;
      case 'Cartão de crédito':
        setCard({
          ...card,
          date: dt,
          type: typeOfCard,
          [e.target.name]: e.target.value,
        });
        break;
      case 'Site':
        setSite({
          ...site,
          date: dt,
          type: typeOfCard,
          [e.target.name]: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (props.data) {
      loadPropsIfEditMode();
    }
  }, [props.data]);

  useEffect(() => {
    setData({
      ...data,
      name: note.name,
      date: note.date,
      type: note.type,
      identifiers: { notes: note.notes },
    });
  }, [note]);

  useEffect(() => {
    setData({
      ...data,
      name: card.name,
      date: card.date,
      type: card.type,
      identifiers: {
        cardNumber: card.cardNumber,
        cardType: card.cardType,
        nameOnCard: card.nameOnCard,
        security_code: card.security_code,
        expires: card.expires,
      },
    });
  }, [card]);

  useEffect(() => {
    setData({
      ...site,
      name: site.name,
      date: site.date,
      type: site.type,
      identifiers: {
        login_url: site.login_url,
        username: site.username,
        password: site.password,
      },
    });
  }, [site]);

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  const typeOfCard = detectType(type);
  const { label, color, nameType } = getTypeNameColor();

  return (
    <div className="modal">
      <Header title={label} modal backButton={backButton} />
      <div className="content">
        {nameType === 'Nota' && (
          <form>
            <div className="form-block">
              <label htmlFor="name" style={{ color }}>
                NOME
              </label>

              <input
                type="text"
                value={note.name}
                name="name"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                NOTA
              </label>
              <textarea
                id=""
                cols="30"
                rows="10"
                style={{ borderColor: color }}
                value={note.notes}
                name="notes"
                onChange={event => inputChangedHandler(event)}
              />
            </div>
          </form>
        )}
        {nameType === 'Site' && (
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                NOME
              </label>
              <input
                type="text"
                value={site.name}
                name="name"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                ENDEREÇO DO SITE
              </label>
              <input
                type="text"
                value={site.login_url}
                name="login_url"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                USUÁRIO
              </label>
              <input
                type="text"
                value={site.username}
                name="username"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                SENHA
              </label>
              <input
                type="text"
                value={site.password}
                name="password"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
          </form>
        )}

        {nameType === 'Cartão de crédito' && (
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                NOME
              </label>
              <input
                type="text"
                value={card.name}
                name="name"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                NÚMERO DO CARTÃO
              </label>
              <input
                type="text"
                value={card.cardNumber}
                name="cardNumber"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                EXPIRAÇÃO
              </label>
              <input
                type="text"
                value={card.expires}
                name="expires"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                CÓDIGO DE SEGURANÇA
              </label>
              <input
                type="text"
                value={card.security_code}
                name="security_code"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                NOME NO CARTÃO
              </label>
              <input
                type="text"
                value={card.nameOnCard}
                name="nameOnCard"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                BANDEIRA
              </label>
              <input
                type="text"
                value={card.cardType}
                name="cardType"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
          </form>
        )}
      </div>
      <div className="footer">
        <Colors color={color} onClick={e => sendHandler(index)}>
          {isNew ? 'CADASTRAR' : 'EDITAR'}
        </Colors>
      </div>
    </div>
  );
};
export default ItemCard;
