import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class StoreEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

        this.onClose = this.onClose.bind(this);
    }

    onClose() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }

    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showUpdateModel} onClose={this.props.onClose} size='small'>
                    <Modal.Header> Edit Store </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="StoreName" placeholder='Name' defaultValue={this.props.Name} onChange={this.props.onChange} />
                               
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type="text" name="StoreAddress" placeholder='Address' defaultValue={this.props.Address} onChange={this.props.onChange} />
                               
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <button onClick={this.props.onClose} class="ui secondary button" >Cancel
                        </button>
                        <button onClick={this.props.onUpdateSubmit} className="ui green button">Edit
                        <i className="check icon"></i>
                        </button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}