import React from "react"

const Message = ({ messages }) => {
 
  return (
    <div class={`row message read selected textLeft`}>
      <div class="col-xs-1">
        <div class="row">
          <div class="col-xs-2">
            <input type="checkbox" checked="checked" />
          </div>
          <div class="col-xs-2">
            <i class={`star fa starred`} />
          </div>
        </div>
      </div>
      <div class="col-xs-11">
        {/* Labels */}
        
        <a href="#!">{messages.subject}</a>
      </div>
    </div>
  )
}
export default Message
