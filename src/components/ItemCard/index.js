/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import useForm from 'react-hook-form';
import DateTime from 'react-datetime';
import { Button } from './styles';
import Header from '../Header';
import localStorager from '../../services/storage';

import '../../../node_modules/react-datetime/css/react-datetime.css';

// import Cards from 'react-credit-cards';
import { axios } from 'axios';
// github.com/amarofashion/react-credit-cards

const ItemCard = props => {
  const { type, isNew, index } = props;

  const [data, setData] = useState({
    focus: false,
    name: '',
    date: '',
    type: '',
    login_url: '',
    description: '',
    dateReminder: '',
    repeat: '',
    reminder: '',
    identifiers: {
      notes: '',
      username: '',
      password: '',
      cardNumber: '',
      cardType: '',
      cardPass: '',
      nameOnCard: '',
      security_code: '',
      expires: '',
    },
  });

  const [reminder, setReminder] = useState({
    name: '',
    date: '',
    type: '',
    description: '',
    dateReminder: '',
    repeat: '',
    reminder: '',
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
    cardPass: '',
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
      case 'Reminder':
        return {
          label: `${isNew ? 'Novo' : 'Editar'}  Lembrete`,
          color: '#ffc931',
          nameType: 'Lembrete',
        };
      case 'Lembrete':
        return {
          label: `${isNew ? 'Novo' : 'Editar'}  Lembrete`,
          color: '#ffc931',
          nameType: 'Lembrete',
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
    if (data.identifiers) {
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
          cardPass,
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
            cardPass,
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
    } else {
      const {
        name,
        date,
        type,
        description,
        dateReminder,
        repeat,
        reminder,
        login_url,
        username,
        password,
      } = data;

      switch (typeOfCard) {
        case 'Lembrete':
          setReminder({
            name,
            date,
            type,
            description,
            dateReminder,
            repeat,
            reminder,
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
      case 'Reminder':
        return 'Lembrete';
      case 'Lembrete':
        return 'Lembrete';
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
    if (type === 'Lembrete') reminderDateWebPush();
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
      case 'Lembrete':
        setReminder({
          ...reminder,
          date: dt,
          type: typeOfCard,
          [e.target.name]: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  const reminderDateWebPush = () => {
    const getBookedDate = reminder.dateReminder;
    console.log('TCL: reminderDateWebPush -> getBookedDate', getBookedDate);
    const getDeviceIDOneSignal = localStorage.getItem('OSid');
    console.log(
      'TCL: reminderDateWebPush -> getDeviceIDOneSignal',
      getDeviceIDOneSignal
    );
    const dateTime = returnDateToNotify(getBookedDate, 1, 'minutes', 'add');
    updateWebNotification(
      '220978c0-6406-46b8-88bf-5553ae66e3f8',
      'ODM5MzJjYjEtMDdhMi00NDQwLTg4YjItNzUxOTJjNGRhZGY3',
      [getDeviceIDOneSignal],
      dateTime
    );
  };

  const reminderDateUpdateWebPush = () => {
    // const getBookedDate = reminder.dateReminder;
    // const getDeviceIDOneSignal = localStorager.get('OSid');
    // localStorager;
    // removeWebNotification();
    // updateWebNotification();
  };

  const returnDateToNotify = (
    dateBooked,
    quantity = 1,
    period = 'days',
    type = 'subtract',
    locale
  ) => {
    const oldDate = new Date(dateBooked);
    let newDate;
    type === 'add'
      ? (newDate = moment(oldDate).add(quantity, period))
      : (newDate = moment(oldDate).subtract(quantity, period));
    if (locale === 'pt-br') {
      return newDate.locale('pt-br').format('DD/MM/YYYY HH:mm');
    }
    console.log('TCL: newDate._d', newDate._d);
    return newDate._d;
  };

  const updateWebNotification = (
    appID,
    authID,
    senderID,
    dateTime,
    data = { foo: 'bar' },
    contents = { en: 'English Message' }
  ) => {
    axios
      .post(
        'https://onesignal.com/api/v1/notifications',
        {
          app_id: appID,
          include_player_ids: senderID,
          data,
          contents,
          send_after: dateTime,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: authID,
          },
        }
      )
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const removeWebNotification = e => {
    // const getBookedDate =;
    // const getDeviceIDOneSignal =;
  };

  const inputDateTimeHandler = time => {
    setReminder({
      ...reminder,
      date: moment()
        .locale('pt-br')
        .format('DD/MM/YYYY HH:mm'),
      type: 'Lembrete',
      dateReminder: time,
    });
  };

  useEffect(() => {
    if (props.data) {
      loadPropsIfEditMode();
    }
  }, [props.data]);

  useEffect(() => {
    setData({
      ...data,
      id: `-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      name: note.name,
      date: note.date,
      type: note.type,
      identifiers: { notes: note.notes },
    });
  }, [note]);

  useEffect(() => {
    setData({
      ...data,
      id: `-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      name: card.name,
      date: card.date,
      type: card.type,
      identifiers: {
        cardNumber: card.cardNumber,
        cardType: card.cardType,
        nameOnCard: card.nameOnCard,
        security_code: card.security_code,
        expires: card.expires,
        cardPass: card.cardPass,
      },
    });
  }, [card]);

  useEffect(() => {
    setData({
      ...site,
      id: `-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
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

  useEffect(() => {
    setData({
      ...reminder,
      id: `-${Math.random()
        .toString(36)
        .substr(2, 9)}`,
      name: reminder.name,
      date: reminder.date,
      type: reminder.type,
      description: reminder.description,
      dateReminder: reminder.dateReminder,
      repeat: reminder.repeat,
      reminder: reminder.reminder,
    });
  }, [reminder]);

  const getClass = () => {
    if (data.focus === true) {
      return 'form-block focus';
    }
    return 'form-block';
  };

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => console.log(data);
  const typeOfCard = detectType(type);
  const { label, color, nameType } = getTypeNameColor();

  return (
    <div className="modal">
      <Header title={label} modal backButton={backButton} />
      <div className="content">
        {nameType === 'Lembrete' && (
          <form>
            <div className="form-block">
              <label htmlFor="name" style={{ color }}>
                NOME
              </label>

              <input
                type="text"
                value={reminder.name}
                name="name"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                Descrição
              </label>
              <textarea
                id=""
                cols="30"
                rows="10"
                style={{ borderColor: color }}
                value={reminder.description}
                name="description"
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className={getClass()}>
              <label htmlFor="" style={{ color }}>
                Data
              </label>
              <DateTime
                inputProps={{ name: 'dateReminder' }}
                onChange={date => inputDateTimeHandler(date)}
                value={moment(reminder.dateReminder)}
                onFocus={() => setData({ focus: true })}
                onBlur={() => setData({ focus: false })}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                O Evento é recorrente?
              </label>
              <input
                type="text"
                value={reminder.repeat}
                name="repeat"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                Me Lembrar
              </label>
              <input
                type="text"
                value={reminder.reminder}
                name="reminder"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
          </form>
        )}
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
            <div className="form-block">
              <label htmlFor="" style={{ color }}>
                SENHA PARA COMPRAS
              </label>
              <input
                type="text"
                value={card.cardPass}
                name="cardPass"
                style={{ borderColor: color }}
                onChange={event => inputChangedHandler(event)}
              />
            </div>
          </form>
        )}
      </div>
      <div className="footer">
        <Button color={color} onClick={e => sendHandler(index)}>
          {isNew ? 'CADASTRAR' : 'EDITAR'}
        </Button>
      </div>
    </div>
  );
};
export default ItemCard;
