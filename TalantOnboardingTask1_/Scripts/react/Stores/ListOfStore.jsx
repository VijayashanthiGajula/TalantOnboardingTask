import React, { Component } from 'react';

import ReactDOM from 'react-dom';
import { Modal, Button } from 'semantic-ui-react';
import StoreDelete from './StoreDelete.jsx';
import StoreCreate from './StoreCreate.jsx';
import StoreEdit from './StoreEdit.jsx';


export default class Storetable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storelists: [],
           

            StoreId: '',
            StoreName: '',
            StoreAddress: '',

        

        };



        //get Products

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
            url: "/Store/StoreList",
            type: "GET",
            success: function (data) { this.setState({ storelists: data }) }.bind(this)
        });
    }

    //Delete    
    handleDelete(id) {

        this.setState({ showDeleteModal: true });
        this.setState({ deleteId: id });

        $.ajax({
            url: "/Store/GetDeleteStoreList",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                var obj = JSON.parse(data);
                this.setState({ StoreId: obj.Id, StoreName: obj.Name, StoreAddress: obj.Address })

               // this.setState({ StoreId: data.Id, StoreName: data.Name, StoreAddress: data.Address })
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
            url: "/Store/GetEdit",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                var obj = JSON.parse(data);
                this.setState({ StoreId: obj.Id, StoreName: obj.Name, StoreAddress: obj.Address })


               // this.setState({ StoreId: data.Id, StoreName: data.Name, StoreAddress: data.Address })
            }.bind(this)
        });
    }

    closeUpdateModel() {
        this.setState({ showUpdateModel: false });
        window.location.reload()
    }
    

    onUpdateSubmit() {
       

            let data = { 'Id': this.state.StoreId, 'Name': this.state.StoreName, 'Address': this.state.StoreAddress };

            $.ajax({
                url: "/Store/Edit",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })

                    window.location.reload()
                }.bind(this)
            });
        
    }
    render() {

        let list = this.state.storelists;
        let tableData = null;
        if (list != "") {
            tableData = list.map(store =>
                < tr key={store.Id}>
                    <td className="four wide">{store.Name}</td>
                    <td className="four wide">{store.Address}</td>
                    <td className="four wide">

                        <div><button class="ui yellow button" onClick={this.showUpdateModel.bind(this, store.Id)}><i className="edit icon"></i>Edit</button></div></td>

                    <td className="four wide">

                        <div><button class="ui red button" onClick={this.handleDelete.bind(this, store.Id)}><i className="delete icon"></i>Delete</button></div>
                    </td>

                </tr>

            )



        }
        return (



            <div>
                <br /> <br />

                <StoreCreate onChange={this.onChange} onClose={this.closeCreateModel} onCreateSubmit={this.onCreateSubmit} showCreateModel={this.state.showCreateModel} />
                <StoreDelete />


                <div><button class="ui primary button" onClick={this.showCreateModel}>New Store</button></div>
                <StoreEdit onChange={this.onChange} update={this.state.updateId} onClose={this.closeUpdateModel} onUpdateSubmit={this.onUpdateSubmit} showUpdateModel={this.state.showUpdateModel} Id={this.state.StoreId} Name={this.state.StoreName} Address={this.state.StoreAddress}  />

                <StoreDelete delete={this.state.deleteId} onClose={this.closeDeleteModal} onDeleteSubmit={this.onDeleteSubmit} showDeleteModal={this.state.showDeleteModal} Id={this.state.StoreId} Name={this.state.StoreName} Address={this.state.StoreAddress} />

                <table className="ui striped table">
                    <thead>
                        <tr>
                            <th className="four wide">Name</th>
                            <th className="four wide">Address</th>
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

