import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import { Modal, Form, Button } from 'semantic-ui-react';

export default class CustomerDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };

        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onDeleteSubmit(id) {
        $.ajax({
            url: "/Customer/DeleteCustomer",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ success: data })
                window.location.reload()
            }.bind(this)
        });
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        //window.location.reload()
    }

    render() {
        return (
            <React.Fragment>

                <Modal open={this.props.showDeleteModal} size="small">
              
                    <Modal.Header>Delete Customer</Modal.Header>
                    <Modal.Content>
                        <h4>
                            Are you sure you want to delete this?
                        </h4>
                        <Form className="ui form segment" >
                            <Form.Field>
                                <label>Name:</label>
                                <input name="CustomerName" value={this.props.Name} />
                            </Form.Field>
                            <Form.Field>
                                <label>Address: </label>
                                <input name="CustomerAddress" value={this.props.Address} />
                            </Form.Field>

                        </Form>
                    </Modal.Content>
                
                    <Modal.Actions>
                        <Button class="ui secondary button" onClick={this.props.onClose} >Cancel
                            </Button>
                        <Button onClick={() => this.onDeleteSubmit(this.props.delete)} className="ui red button">Delete
                            <i className="x icon"></i>
                        </Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}