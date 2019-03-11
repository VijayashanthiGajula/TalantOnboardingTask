import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal,Form, Button } from 'semantic-ui-react';

export default class ProductDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }


    onDeleteSubmit(id) {
        $.ajax({
            url: "/Product/DeleteProduct",
            type: "post",
            data: { 'id': id }
        });
        window.location.reload()
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    render() {

        return (

            <React.Fragment>
                <Modal open={this.props.showDeleteModal} onClose={this.props.onClose} size='small'>
                  
                    <Modal.Header>Delete Product</Modal.Header>
                    <Modal.Content>
                        <h4>
                            Are you sure you want to delete this?
                        </h4>
                        <Form className="ui form segment" >
                            <Form.Field>
                                <label>Name:</label>
                                <input  value={this.props.Name} />
                            </Form.Field>
                            <Form.Field>
                                <label>Address: </label>
                                <input  value={this.props.Price} />
                            </Form.Field>

                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                <button onClick={this.props.onClose} class="ui secondary button" >Cancel
                            </button>
                <button onClick={() => this.onDeleteSubmit(this.props.delete)} className="ui red button">Delete
                            <i className="x icon"></i>
                </button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}