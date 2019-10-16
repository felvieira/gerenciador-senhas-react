import React, { Component } from 'react';
import Card from '../../components/Card';
import Filter from '../../components/Filter';
import Header from '../../components/Header';
import RoundButton from '../../components/RoundButton';
import api from '../../services/api';
import ItemCard from '../../components/ItemCard';

export default class Main extends Component {
  state = {
    data: [],
    passwords: [],
    showNew: false,
    showEdit: false,
    typeModal: '',
    itemSelected: null,
    index: null,
  };

  filteredItems = pass =>
    pass.filter(
      item =>
        item.type === 'GenericNote' ||
        item.type === 'CreditCard' ||
        item.type === 'Website'
    );

  searchItems = (pass, str) => {
    if (str.includes('all')) {
      return this.state.data;
    }
    return pass.filter(item => {
      if (item.name.includes(str)) return item;
      if (item.type.includes(str)) return item;
      if (item.login_url && item.login_url.includes(str)) return item;
    });
  };

  // Método em callback para pegar input do Children
  handleSearch = inputValueInSearch => {
    const pass = this.searchItems(this.state.passwords, inputValueInSearch);
    this.setState({
      passwords: pass,
    });
  };

  backButton = isNew => {
    if (isNew) {
      this.setState({ showNew: false });
    } else {
      this.setState({ showEdit: false });
    }
    document.body.style.overflow = 'auto';
  };

  getAllPassData = async () => {
    const pass = await api.get('pass');
    return this.filteredItems(pass.data);
  };

  // Metodo para paginar array de objetos
  // ex: paginateArray(arr) ou
  // paginateArray(arr,2) para pegar a 2 pagina
  // paginateArray(arr,2,5) para pegar a 2 pagina e limitar 5 itens de retorno no array
  paginateArray = (items, page, per_page) => {
    page = page || 1;
    per_page = per_page || 10;
    const offset = (page - 1) * per_page;

    const paginatedItems = items.slice(offset).slice(0, per_page);
    const total_pages = Math.ceil(items.length / per_page);
    return {
      page,
      per_page,
      pre_page: page - 1 ? page - 1 : null,
      next_page: total_pages > page ? page + 1 : null,
      total: items.length,
      total_pages,
      data: paginatedItems,
    };
  };

  newItem = type => {
    this.setState({ showNew: true });
    this.setState({ typeModal: type });
    this.setState({ itemSelected: null });
    document.body.style.overflow = 'hidden';
  };

  editItem = (item, i) => {
    this.setState({ showEdit: true });
    this.setState({ typeModal: item.type });
    this.setState({ itemSelected: item });
    this.setState({ index: i });

    document.body.style.overflow = 'hidden';
  };

  getDataHandler = () => {
    const pass = localStorage.getItem('pass');

    if (pass) {
      this.setState({ passwords: JSON.parse(pass) });
      this.setState({ data: JSON.parse(pass) });
    } else {
      // this.getAllPassData().then(res => {
      // const data = this.paginateArray(res);
      //   const data = '';
      //   this.setState({ passwords: data ? data.data : res });
      //   this.setState({ data: data ? data.data : res });
      // });
    }
  };

  componentDidMount() {
    this.getDataHandler();
    document.body.style.overflow = 'auto';
  }

  componentDidUpdate(_, prevState) {
    const { passwords } = this.state;

    if (prevState.passwords !== passwords) {
      localStorage.setItem('pass', JSON.stringify(passwords));
    }
  }

  render() {
    return (
      <>
        {this.state.showNew && (
          <ItemCard
            type={this.state.typeModal}
            isNew
            backButton={this.backButton}
            update={this.getDataHandler}
          />
        )}
        {this.state.showEdit && (
          <ItemCard
            type={this.state.typeModal}
            isNew={false}
            backButton={this.backButton}
            data={this.state.itemSelected}
            index={this.state.index}
            update={this.getDataHandler}
          />
        )}
        <Header
          title="PassTurbo"
          getInputItemInFilter={this.handleSearch}
          getCountMatchedItems={this.state.passwords.length}
        />
        <div className="content">
          <Filter />
          <Card
            list={this.state.passwords}
            newFN={this.newItem}
            editFN={this.editItem}
            update={this.getDataHandler}
          />
        </div>
        <RoundButton action={this.newItem} />
      </>
    );
  }
}
