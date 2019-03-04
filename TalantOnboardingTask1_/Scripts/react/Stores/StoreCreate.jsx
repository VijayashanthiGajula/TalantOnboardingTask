import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class StoreCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },
            StoreName: '',
            StoreAddress: '',

            Sucess: [],
            errors: {}
        };

        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onCreateSubmit(e) {
        e.preventDefault();
        
            let data = { 'Name': this.state.StoreName, 'Address': this.state.StoreAddress };

            $.ajax({
                url: "/Store/CreateStoreList",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })

                    window.location.reload()
                }.bind(this)
            });
        
    }

    onClose() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <React.Fragment>
                <Modal open={this.props.showCreateModel} onClose={this.props.onClose} size='small'>
                    <br /><br /><br /><br /><br />
                    <Modal.Header> Create Store </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="StoreName" placeholder='Name' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.StoreName}
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <label>Address</label>
                                <input type="text" name="StoreAddress" placeholder='Address' onChange={this.onChange} />
                                <div style={{ color: 'red' }}>
                                    {this.state.errors.StoreAddress}
                                </div>
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <button onClick={this.props.onClose} class="ui secondary button" >Cancel
                        </button>
                        <button onClick={this.onCreateSubmit} className="ui green button">Create
                        <i className="check icon"></i>
                        </button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}