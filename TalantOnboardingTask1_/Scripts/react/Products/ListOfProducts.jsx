import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import ProductDelete from './ProductDelete.jsx';
import ProductCreate from './ProductCreate.jsx';
import ProductEdit from './ProductEdit.jsx';

export default class ProductTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productlists: [],
            

        };
        // get Products
        this.loadData = this.loadData.bind(this);

        this.handleDelete = this.handleDelete.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);

        this.showCreateModel = this.showCreateModel.bind(this);
        this.closeCreateModel = this.closeCreateModel.bind(this);
        this.onChange = this.onChange.bind(this);
        this.showUpdateModel = this.showUpdateModel.bind(this);
        this.closeUpdateModel = this.closeUpdateModel.bind(this);
        this.onUpdateSubmit = this.onUpdateSubmit.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }


    loadData() {
        $.ajax({
            url: "/Product/ProductList",
            type: "GET",
            success: function (data) { this.setState({ productlists: data }) }.bind(this)
        });

    }

    //Delete    
    handleDelete(id) {

        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });

        $.ajax({
            url: "/Product/GetDeleteProduct",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ ProductId: data.Id, ProductName: data.Name, ProductPrice: data.Price })
            }.bind(this)
        });
    }

    closeDeleteModal() {
        this.setState({ showDeleteModal: false });
        window.location.reload()
    }

    //Create
    showCreateModel() {
        this.setState({ showCreateModel: true });
    }

    closeCreateModel() {
        this.setState({ showCreateModel: false });
        window.location.reload()
    }

    onChange(e) {

        this.setState({ [e.target.name]: e.target.value });
    }

    //Update
    showUpdateModel(id) {
        this.setState({ showUpdateModel: true });
        this.setState({ updateId: id });

        $.ajax({
            url: "/Product/GetEdit",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ ProductId: data.Id, ProductName: data.Name, ProductPrice: data.Price })
            }.bind(this)
        });
    }

    closeUpdateModel() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }
    onUpdateSubmit() {


        let data = { 'Id': this.state.ProductId, 'Name': this.state.ProductName, 'Price': this.state.ProductPrice };

        $.ajax({
            url: "/Product/Edit",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload()
            }.bind(this)
        });


    }


    render() {
        let list = this.state.productlists;
        let tableData = null;
        if (list != "") {
            tableData = list.map(product =>
                < tr key={product.Id}>
                    <td className="four wide">{product.Name}</td>
                    <td className="four wide">{product.Price}</td>
                    <td className="four wide"><button class="ui yellow button" onClick={this.showUpdateModel.bind(this, product.Id)}><i className="edit icon"></i>Edit</button></td>
                    <td className="four wide"><button class="ui red button" onClick={this.handleDelete.bind(this, product.Id)}><i className="delete icon"></i>Delete</button></td>
                </tr>
            )
        }
        return (
            <div>

              <br /> <br />
                <div><button class="ui primary button" onClick={this.showCreateModel}>New Product</button></div>
                <ProductCreate onChange={this.onChange} onClose={this.closeCreateModel} onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />
                <ProductEdit onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModel} onUpdateSubmit={this.onUpdateSubmit} showUpdateModel={this.state.showUpdateModel} Id={this.state.ProductId} Name={this.state.ProductName} Price={this.state.ProductPrice} errors={this.state.errors} />

                <ProductDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} Id={this.state.ProductId} Name={this.state.ProductName} Price={this.state.ProductPrice} />

               
                <table className="ui striped table">
                    <thead>
                        <tr>
                            <th className="four wide">Name</th>
                            <th className="four wide">Price</th>
                            <th className="four wide">Actions</th>
                            <th className="four wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </table>
            </div>
        )

    }
}

