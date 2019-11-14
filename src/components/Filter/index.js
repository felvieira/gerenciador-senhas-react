import React from 'react';
import Select from 'react-select';

const options = [
  { value: 'all', label: 'Todos' },
  { value: 'GenericNote', label: 'Notas' },
  { value: 'Reminder', label: 'Lembrete' },
  { value: 'Website', label: 'Website' },
  { value: 'CreditCard', label: 'Cartão de Crédito' },
];

export default class Filter extends React.Component {
  state = {
    selectedOption: null,
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption }, () =>
      this.props.getFilterData(selectedOption)
    );
  };

  render() {
    const { selectedOption } = this.state;

    return (
      <div className="filtro">
        Filtro:
        <Select
          placeholder="Selecionar ..."
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
        />
      </div>
    );
  }
}
