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
    list: [],
    paginateList: [],
    showNew: false,
    showEdit: false,
    typeModal: '',
    itemSelected: null,
    index: null,
    page: 1,
    scroll: true,
  };

  filteredItems = pass => {
    const types = [
      'GenericNote',
      'Nota',
      'CreditCard',
      'Cartão de crédito',
      'Website',
      'Site',
    ];
    const data = pass.filter(item => types.includes(item.type));
    return this.orderByDate(data);
  };

  orderByDate = data => {
    return data.sort((a, b) => {
      a = new Date(a.date);
      b = new Date(b.date);
      if (a > b) return -1;
      if (a < b) return 1;
    });
  };

  repeteadNamedItems = pass => {
    let names = [];
    const combinedPass = [];

    pass.forEach(function(user) {
      names.push(user.name);
    });

    names = [...new Set(names)];
    names.forEach(name => {
      let passMatchedName = pass.filter(passObj => {
        return name === passObj.name;
      });

      if (passMatchedName.length > 1) {
        passMatchedName = Object.assign(passMatchedName[0], passMatchedName[1]);
        combinedPass.push(passMatchedName);
      } else {
        combinedPass.push(passMatchedName[0]);
      }
    });
    return combinedPass;
  };

  searchItems = (pass, str) => {
    str = str.toLowerCase();

    return pass.filter(item => {
      if (item.name.toLowerCase().includes(str)) return item;
      if (item.type.toLowerCase().includes(str)) return item;
      if (item.login_url) {
        if (
          item.login_url.toLowerCase() &&
          item.login_url.toLowerCase().includes(str)
        )
          return item;
      }
    });
  };

  // Método em callback para pegar input do Children
  handleSearch = inputValueInSearch => {
    let pass = '';
    if (inputValueInSearch === 'all') {
      this.setState({
        scroll: true,
      });
      pass = this.state.paginateList;
    } else {
      this.setState({
        scroll: false,
      });
      pass = this.searchItems(this.state.data, inputValueInSearch);
    }

    this.setState({
      list: pass,
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

  getFilterData = selectedValue => {
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
    this.handleSearch(detectType(selectedValue.value));
  };

  getAllPassData = async () => {
    const pass = await api.get('pass');
    return pass.data;
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

  getDataHandler = async () => {
    const pass = localStorage.getItem('pass');
    const dt = localStorage.getItem('data');

    if (dt) {
      if (pass) await this.setState({ list: JSON.parse(pass) });
      if (dt) await this.setState({ data: JSON.parse(dt) });

      if (this.state.scroll) {
        const filteredData = await this.filteredItems(this.state.data);

        if (this.state.page > 1) {
          const data = await this.paginateArray(filteredData, this.state.page);
          this.setState({
            list: [...this.state.list, ...data.data],
          });
        } else {
          const data = await this.paginateArray(filteredData, 1);
          this.setState({
            list: [...data.data],
          });
        }

        this.setState({
          paginateList: this.state.list,
        });
      }
    } else {
      try {
        const pass = api.get('pass');
        pass.then(res => {
          res = res.data;
          const filteredData = this.filteredItems(res);
          this.setState({ data: filteredData });

          if (this.state.page > 1) {
            const data = this.paginateArray(filteredData, this.state.page);
            this.setState({
              list: [...this.state.list, ...data.data],
            });
          } else {
            const data = this.paginateArray(filteredData, 1);
            this.setState({
              list: [...data.data],
            });
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  loadMoreHandler() {
    this.setState({ page: this.state.page + 1 });
  }

  handleScroll = () => {
    if (this.hasReachedBottom()) {
      this.loadMoreHandler();
    }
  };

  hasReachedBottom() {
    const distanceScrolledFromTop =
      document.scrollingElement || document.documentElement;
    return (
      parseInt(
        distanceScrolledFromTop.scrollTop + distanceScrolledFromTop.clientHeight
      ) ===
      distanceScrolledFromTop.scrollHeight - 1
    );
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    this.getDataHandler();
    document.body.style.overflow = 'auto';
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }

  componentDidUpdate(_, prevState) {
    const { list, page, data } = this.state;

    if (prevState.list !== list) {
      localStorage.setItem('pass', JSON.stringify(list));
    }

    if (prevState.data !== data) {
      localStorage.setItem('data', JSON.stringify(data));
    }

    if (prevState.page !== page) {
      this.getDataHandler();
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
          title="Anota Fácil"
          getInputItemInFilter={this.handleSearch}
          getCountMatchedItems={this.state.list.length}
        />
        <div className="content">
          <Filter getFilterData={this.getFilterData} />
          <Card
            list={this.state.list}
            newFN={this.newItem}
            editFN={this.editItem}
            update={this.getDataHandler}
          />
        </div>
        {this.state.scroll && <RoundButton action={this.newItem} />}
      </>
    );
  }
}
