import React from "react"

const Message = ({ messages, toggleSelect, toggleStar }) => {
  const readClass = messages.read ? 'read' : 'unread'
  const selectedClass = messages.selected ? 'selected' : ""
  const starClass = messages.starred ? 'fa-star' : 'fa-star-o'

  const labels = messages.labels.map((label, i) => (
    <span key={i} className="label label-warning">{label}</span>
  ))

  const starMessage = (e) => {
    e.stopPropagtion()
    toggleStar(messages)
  }

  return (
    <div className={`row message ${readClass} ${selectedClass}`} onClick={() => toggleSelect(messages)}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked={!!messages.selected} readOnly={true} />
          </div>
          <div className="col-xs-2" onClick={starMessage}>
            <i className={`star fa ${starClass}`}></i>
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {labels}
        {messages.subject}
      </div>
    </div>
  )
}
export default Message
