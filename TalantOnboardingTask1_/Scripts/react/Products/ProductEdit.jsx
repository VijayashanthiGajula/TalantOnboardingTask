import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form } from 'semantic-ui-react';

export default class ProductEdit extends Component {
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
                    <br />  <br />  <br />    <br />  <br />  <br />
                    <Modal.Header> Edit Product </Modal.Header>
                    <Modal.Content>
                        <Form>
                            <Form.Field>


                                <label>Name</label>
                                <input type="text" name="ProductName" placeholder='Name' defaultValue={this.props.Name} onChange={this.props.onChange} />
                            </Form.Field>
                            <Form.Field>
                                <label>Price</label>
                                <input type="text" name="ProductPrice" placeholder='Price' defaultValue={this.props.Price} onChange={this.props.onChange} />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>

                        <button onClick={this.props.onClose} class="ui secondary button" >Cancel
                        </button>
                        <button onClick={this.props.onUpdateSubmit} className="ui green button">Update
                        <i className="check icon"></i>
                        </button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        )
    }
}