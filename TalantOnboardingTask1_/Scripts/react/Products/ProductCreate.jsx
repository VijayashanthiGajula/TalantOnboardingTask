import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class ProductCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Success: { Data: '' },
            ProductName: '',
            ProductPrice: '',

        };

        this.onCreateSubmit = this.onCreateSubmit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onChange = this.onChange.bind(this);
    }



    onCreateSubmit(e) {
        e.preventDefault();

        let data = { 'Name': this.state.ProductName, 'Price': this.state.ProductPrice };

        $.ajax({
            url: "/Product/CreateProduct",
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
                    <Modal.Header> Create New Product </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>
                                <label>Name</label>
                                <input type="text" name="ProductName" placeholder='Name' onChange={this.onChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type="text" name="ProductPrice" placeholder='Price' onChange={this.onChange} />

                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>

                        <button onClick={this.props.onClose} className="ui secondary button">Cancel
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