import React, { Component } from "react"

class Toolbar extends Component {
  unreadCount = this.props.messages.filter(message => !message.read).length
  selectedCount = this.props.messages.filter(message => message.selected).length
  openCompose = (ev) => this.props.openComposeCallback()
  render() {
    let selectAllClass
    switch (this.selectedCount) {
      case 0:
        selectAllClass = 'fa-square-o'
        break;
      case this.messages.length:
        selectAllClass = 'fa-check-square-o'
        break;
      default:
        selectAllClass = 'fa-minus-square-o'
    }

    return (
      <div className="row toolbar" >
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge">{this.props.unreadCount}</span>
            unread {this.props.unreadCount === 1 ? 'message' : 'messages'}
          </p>

          <button type="button" className="btn btn-danger" onClick={this.openCompose}>
            <i className="fa fa-plus"></i>
          </button>

          <button className="btn btn-default" onClick={this.props.toggleSelectAll}>
            <i className={`fa ${selectAllClass}`} />
          </button>

          <button className="btn btn-default" onClick={this.props.markAsRead} disabled={this.props.selectedCount === 0}>
            Mark As Read
          </button>

          <button className="btn btn-default" onClick={this.props.markAsUnread} disabled={this.props.selectedCount === 0}>
            Mark As Unread
          </button>

          <select className="form-control label-select" disabled={this.props.selectedCount === 0} onChange={(e) => { this.props.applyLabel(e.target.value); e.target.selectedIndex = 0 }}>
            <option>Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select className="form-control label-select" disabled={this.props.selectedCount === 0} onChange={(e) => { this.props.removeLabel(e.target.value); e.target.selectedIndex = 0 }}>
            <option>Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button className="btn btn-default" onClick={this.props.deleteMessages} disabled={this.props.selectedCount === 0}>
            <i className="fa fa-trash-o" />
          </button>
        </div>
      </div>
    )
  }
}
export default Toolbar
