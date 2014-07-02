/** @jsx React.DOM */

window.DatePicker = React.createClass({
  getInitialState: function() {
    var selected = new DateUtil(moment());

    return {
      focus: false,
      selected: selected,
      value: selected.format("YYYY-MM-DD")
    }
  },

  handleFocus: function() {
    this.setState({
      focus: true
    });
  },

  hideCalendar: function() {
    this.setState({
      focus: false
    });
  },

  handleBlur: function() {
    this._blurTimeout = setTimeout(this.hideCalendar, 20);
  },

  handleSelect: function(date) {
    window.clearTimeout(this._blurTimeout);

    this.setSelected(date);

    this.setState({
      focus: false
    });
  },

  setSelected: function(date) {
    this.setState({
      selected: date,
      value: date.format("YYYY-MM-DD")
    });
  },

  inputValue: function() {
    return this.state.selected.format("YYYY-MM-DD")
  },

  calendar: function() {
    if (this.state.focus) {
      return <Calendar
        selected={this.state.selected}
        onSelect={this.handleSelect} />;
    }
  },

  handleChange: function(event) {
    date = moment(event.target.value, "YYYY-MM-DD")

    this.setState({
      value: event.target.value
    });

    if(date.isValid()) {
      this.setState({
        selected: new DateUtil(date)
      });
    }
  },

  render: function() {
    return (
      <div>
        <input
          type="text"
          onChange={this.handleChange}
          value={this.state.value}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur} />
        {this.calendar()}
      </div>
    );
  }
});