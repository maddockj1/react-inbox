import React from "react"

const Message = ({ messages }) => {
  console.log(messages)
  return (
    <div className={`row message read selected textLeft`}>
      <div className="col-xs-1">
        <div className="row">
          <div className="col-xs-2">
            <input type="checkbox" checked="checked" />
          </div>
          <div className="col-xs-2">
            <i className={`star fa starred`} />
          </div>
        </div>
      </div>
      <div className="col-xs-11">
        {/* Labels */}

        <a href="#!">{messages.subject}</a>
      </div>
    </div>
  )
}
export default Message
