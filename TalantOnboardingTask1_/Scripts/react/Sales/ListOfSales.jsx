
import React, { Component } from 'react';
import ReactDOM from 'react-dom';




export default class Saletable extends Component {
    constructor() {
        super();
        this.state = {
            salelists: [],
            success: { Data: '' },

            Id: '',
            ProductId: '',
            StoreId: '',
            CustomerId: '',
            DateSold: '',



        };



        //get Products

        this.loadData = this.loadData.bind(this);

        this.DateConverter = this.DateConverter.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }


    loadData() {

        $.ajax({
            url: "/Sale/SalesList",
            type: "GET",
            success: function (data) { this.setState({ Id: data.Id, DateSold: data.DateSold,}) }.bind(this)
        });
    }
    DateConverter(tempdate) {

        var converted = parseInt((tempdate.replace("/Date(", "").replace(")/", "")))

        var temp = new Date(converted)
        var date = (temp.getFullYear() + "-" + ((temp.getMonth()) + 1) + "-" + temp.getDate())
        return date

    }


    render() {

        let list = this.state.salelists;
        let tableData = null;
        if (list != "") {
            tableData = list.map(sale =>
                < tr key={sale.Id}>
                    <td classname="two wide">{sale.CustomerId}</td>
                    <td classname="two wide">{sale.ProductId}</td>
                    <td classname="two wide">{sale.StoreID}</td>
                    <td classname="two wide">{this.DateConverter(sale.DateSold)}</td>


                   
                    <td className="four wide">

                     <button class="ui yellow button"><i className="edit icon"></i>Edit</button>
                            </td>

                        <td className="four wide">

                            <div><button class="ui red button"><i className="delete icon"></i>Delete</button></div>
                        </td>

                </tr>

                    )
        
        
        
                }
                return (
        
        
            <React.Fragment>

                        <br /> <br />

                        <div>

                            <div><button class="ui primary button">New Sales</button></div>
                            <table className="ui striped table">
                                <thead>
                                    <tr>
                                        <th className="two wide">Customer</th>
                                        <th className="two wide">Product</th>
                                        <th className="two wide">Store</th>
                                        <th className="three wide">DateSold</th>
                                        <th className="three wide">Actions</th>
                                        <th className="three wide">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tableData}
                                </tbody>
                            </table>
                        </div>
                    </React.Fragment>

                    )
            
                }
            }
            
