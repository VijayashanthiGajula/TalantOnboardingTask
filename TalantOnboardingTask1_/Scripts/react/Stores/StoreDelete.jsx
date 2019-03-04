import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal,Form, Button } from 'semantic-ui-react';

export default class StoreDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.onDeleteSubmit = this.onDeleteSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    onDeleteSubmit(id) {
        $.ajax({
            url: "/Store/DeleteStoreList",
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
                    <br />  <br />  <br />    <br />  <br />  <br />
                    <Modal.Header>Delete Store</Modal.Header>
                    <Modal.Content>
                        <h4>
                            Are you sure?
                        </h4>
                        <Form className="ui form segment" >
                            <Form.Field>
                                <label>Name:</label>
                                <input  value={this.props.Name} />
                            </Form.Field>
                            <Form.Field>
                                <label>Address: </label>
                                <input  value={this.props.Address} />
                            </Form.Field>

                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <button onClick={this.props.onClose} class="ui secondary button">Cancel
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