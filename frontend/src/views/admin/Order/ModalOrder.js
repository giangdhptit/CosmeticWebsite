import React, { Component,useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
        Card,
        CardHeader,
        CardBody,
        CardTitle,
        Table,
        Row,
        Col
      } from "reactstrap";
import { transpileModule } from 'typescript';
import _ from 'lodash';
import './modal.scss';

//import img_ from '../../assets/images/bruce-mars.jpg';
class ModalOrder extends Component {


    constructor(props){
        super(props);
        this.state = {
            Order:null,
            id:0,
            name:'',
            total:0,
            order_date:'',
            status:'',
             
            photo_name:'',
            SaveDisabled:true,
            EditDisabled:false,
            dropdownOpen:false,
            arrOrderQuantities:[],
            arrProducts:[],
            user:{}
        }
        
    }
    getOrder=(order_id)=>  {
        //console.log('function get all cat');
        const res =  fetch("http://localhost:8080/order-detail/"+order_id,{
            method : "GET",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson){
                this.setState({
                  arrOrderQuantities : responseJson.data
                })
                console.log('resp',responseJson)
            }

            });
    }

    state = {

    }
    findProduct=(product_id)=>{
        const arrProducts = this.state.arrProducts;
        for (var i in arrProducts){  
            var x = arrProducts[i];
            console.log('p name', x.name)
            if (x.id==product_id){
                return x.name
            }
        }
       
    }

    componentDidMount() {
        
        let Order = this.props.currentOrder;
        let id = Order.id;
        this.setState({
            id:Order.id,
            user: Order.user,
           // username:Order.user.username,
            order_date:Order.order_date,
            total:Order.total,
            status:Order.status
        })
        this.getOrder(id);
        this.getAllProducts();
        console.log('id',id)
        //this.getAllCategories();
        var arrCategories = this.state.arrCategories;
        //console.log('aarr',arrCategories)
        
        //console.log(this.state.imgURL)
    }
    getAllProducts=()=>  {
        const res =  fetch("http://localhost:8080/admin/product",{
            method : "GET",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }).then((response) => response.json())
        .then((responseJson) => {

            console.log(responseJson);
            if (responseJson){
                //console.log('111111')
                this.setState({
                  arrProducts : responseJson
                })
            }

            });
    }

    toggle = ()=>{
        this.props.toggleFromParent();
       
    }

    handleOnChangeStatus = (event) => {
        this.setState({
            status: event.target.value,
        })
    }

    
    handleSaveOrder = () =>{
        this.setState({
            errMessage:''
        })

            this.props.editOrder(this.state);

    }
     dropdownToggle = (e) => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
      };
    render() {
        const arrOrderQuantities = this.state.arrOrderQuantities;
        return (
            <Modal 

                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className={'modalClassName'}
                size="lg"
                centered
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Order Details</ModalHeader>
                <ModalBody>
                    
                        <div class="input-group-prepend">
                            ID
                        </div>
                            <input 
                                type="number" 
                                value = {this.state.id}                               
                                disabled
                                name="id"                   
                                class="form-control"
                            ></input>
                        
                        
                        <div class="input-group-prepend">
                            Username
                        </div>
                            <input 
                                type="text" 
                                value = {this.state.user.username}
                                disabled
                                class="form-control"
                            />
                        <Col md="12">
                            <Card className="card-plain">
                            <CardHeader>
                                <CardTitle tag="h4">List Products</CardTitle>
                                {/* <p className="card-category">
                                Here is a subtitle for this table
                                </p> */}
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                <thead className="text-primary">
                                    <tr>
                                        <th>No</th>
                                        <th>Product name</th>
                                        <th>Price</th>
                                        <th>Quantity</th>

                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    
                                    arrOrderQuantities && arrOrderQuantities.map((OrderQ,i)=>{
                                        //let  i=0;i++
                                        return(
                                            <tr>
                                                <td>{++i}</td>
                                                <td>{this.findProduct(OrderQ.product_id)}</td>
                                                <td>{OrderQ.price}</td>
                                                <td>{OrderQ.quantity}</td>
                                                
                                        
                                            </tr>
                                        )
                                        
                                    })
                                }

                                </tbody>
                                </Table>
                            </CardBody>
                            </Card>
                        </Col>
                        <div class="input-group-prepend">
                            Total
                        </div>
                            <input 
                                type="text" 
                                value = {this.state.total}
                                disabled
                                class="form-control"
                            />

                        <div class="input-group-prepend">
                            Order date
                        </div>
                                <input 
                                        type="date" 
                                        value = {this.state.order_date}
                                        disabled
                                        class="form-control"
                                    />

                        <div class="input-group-prepend">
                            Status
                        </div>
                        <div class="box">
                            <select 
                                onChange={(event)=>this.handleOnChangeStatus(event)}                                
                            >
                                <option value={this.state.status}>
                                    {this.state.status}
                                </option>
                                <option value="pending">pending</option>
                                <option value="delivering">delivering</option>
                                <option value="shipped">shipped</option>
                                <option value="canceled">canceled</option>
                            </select>
                        </div> 

             
                        
                </ModalBody>
                <ModalFooter>
                    <button id="buttonSave" color="primary" onClick={()=>{this.handleSaveOrder()}}>
                        Save
                    </button>{' '}
                    <button color="secondary" onClick={()=>{this.toggle()}}>
                        Cancel
                    </button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalOrder);


