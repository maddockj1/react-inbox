import React from 'react'

const Compose = ({ composeMessageCallback }) => {
    const composeMessage = (ev) => {
        ev.preventDefault()
        let post = {
            subject: ev.target[0].value,
            body: ev.target[1].value
        }
        composeMessageCallback(post)
    }
    return (
        <div>
            <form className="form-horizontal well" onSubmit={composeMessage}>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <h4>Compose Message</h4>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
                    <div className="col-sm-8">
                        <input type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="body" className="col-sm-2 control-label">Body</label>
                    <div className="col-sm-8">
                        <textarea name="body" id="body" className="form-control"></textarea>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-sm-8 col-sm-offset-2">
                        <input type="submit" value="Send" className="btn btn-primary" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Compose