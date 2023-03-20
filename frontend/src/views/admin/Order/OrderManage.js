/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Order Page: https://www.creative-tim.com/Order/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,  { Component } from "react";
import ModalOrder from "./ModalOrder"; 
import { connect } from 'react-redux';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";


class OrderManage extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          arrOrders:[],
          isOpenModalOrder:false,
          isOpenModalDeleteOrder:false,
          OrderDelete:{},
          OrderEdit:{}
      }
    }

    componentDidMount() {

        this.getAllOrders();
        
    }
    getAllOrders=()=>  {
        const res =  fetch("http://localhost:8080/admin/order",{
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
                  arrOrders : responseJson
                })
            }

            });
    }
    handleAdd =()=>{
      this.setState({
          isOpenModalOrder:true,
          OrderEdit:{},
      })
     }
    handleDelete =  (Order) =>{
        if (window.confirm("Are you sure ?")) {
                this.doDelete(Order);
          }
    }
    handleView =  (Order) =>{
        this.setState({
            isOpenModalOrder:true,
            OrderEdit:Order,
        })
        console.log('check view',Order)
    }
    toggleOrderModal = () => {
      this.setState({
          isOpenModalOrder : !this.state.isOpenModalOrder,
      })
    }
    toggleDeleteOrderModal = () => {
        this.setState({
            isOpenModalDeleteOrder : !this.state.isOpenModalDeleteOrder,
        })
    }
    doDelete = async (Order) =>{
      try{
          let res = await fetch("http://localhost:8080/admin/Order/"+Order.id+"/delete",{
              method : "DELETE",
                  headers : {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }
              }).then((response) => response.json())
                  .then((responseJson) => {

                      console.log(responseJson);
                      if (responseJson.status=='ok'){
                          this.setState({
                              isOpenModalOrder:false
                          })
                           this.getAllOrders()
                      }
                      return responseJson.user;
                  });
          console.log('click save',Order)
      }catch(e){
          console.log(e)
      }
    }
    doEditOrder = async (Order) => {
      
      const formData = new FormData();
      // formData.append('id',Order.id);
                formData.append('status',Order.status);
        
          try{
              
              let res = await fetch("http://localhost:8080/admin/order/update/"+Order.id,{
                  // mode : 'no-cors',
                  method : "PUT",
                  headers : {
                      'Accept': 'application/json',
                      //'Content-Type': 'multipart/form-data',
                      'Access-Control-Allow-Origin':'*',
                      "Access-Control-Allow-Methods":'PUT'
                  },
                  body : formData
                  }).then((response) => response.json())
                      .then((responseJson) => {

                          console.log('res post:',responseJson);
                          if (responseJson.status=='ok'){
                              this.setState({
                                  isOpenModalOrder:false
                              })
                              this.getAllOrders()
                          }
                          return responseJson.user;
                      });
              console.log('click save',Order)
          }catch(e){
              console.log(e)
          }
        
    }
  
    render(){
      const arrOrders = this.state.arrOrders;
      return (
        <>
          <div className="content">
            {/* <button onClick={()=>{this.handleAdd()}}>Add new</button> */}
                  {
                      this.state.isOpenModalOrder &&
                  
                      <ModalOrder 
                          isOpen = {this.state.isOpenModalOrder}
                          toggleFromParent={this.toggleOrderModal}
                          currentOrder={this.state.OrderEdit}
                          editOrder={this.doEditOrder}
                      />
                  }
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">All orders</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>No</th>
                          <th>User</th>
                          <th>Order date</th>
                          <th>Total</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      
                      <tbody>
                      {
                          arrOrders && arrOrders.map((Order)=>{
                              return(
                                  <tr>
                                      <td>{Order.id}</td>
                                      <td>{Order.user.username}</td>
                                      <td>{Order.order_date}</td>
                                      <td>{Order.total}</td>
                                      <td >{Order.status}</td>
                                    
                                      <td>
                                          <button onClick={()=>{this.handleView(Order)}}>View</button>
                                         
                                      </td>
                                  </tr>
                              )
                            
                          })
                      }

                        
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col md="12">
                <Card className="card-plain">
                  <CardHeader>
                    <CardTitle tag="h4">Table on Plain Background</CardTitle>
                    <p className="card-Order">
                      Here is a subtitle for this table
                    </p>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>Name</th>
                          <th>Country</th>
                          <th>City</th>
                          <th className="text-right">Salary</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Dakota Rice</td>
                          <td>Niger</td>
                          <td>Oud-Turnhout</td>
                          <td className="text-right">$36,738</td>
                        </tr>
                        <tr>
                          <td>Minerva Hooper</td>
                          <td>Curaçao</td>
                          <td>Sinaai-Waas</td>
                          <td className="text-right">$23,789</td>
                        </tr>
                        <tr>
                          <td>Sage Rodriguez</td>
                          <td>Netherlands</td>
                          <td>Baileux</td>
                          <td className="text-right">$56,142</td>
                        </tr>
                        <tr>
                          <td>Philip Chaney</td>
                          <td>Korea, South</td>
                          <td>Overland Park</td>
                          <td className="text-right">$38,735</td>
                        </tr>
                        <tr>
                          <td>Doris Greene</td>
                          <td>Malawi</td>
                          <td>Feldkirchen in Kärnten</td>
                          <td className="text-right">$63,542</td>
                        </tr>
                        <tr>
                          <td>Mason Porter</td>
                          <td>Chile</td>
                          <td>Gloucester</td>
                          <td className="text-right">$78,615</td>
                        </tr>
                        <tr>
                          <td>Jon Porter</td>
                          <td>Portugal</td>
                          <td>Gloucester</td>
                          <td className="text-right">$98,615</td>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col> */}
            </Row>
          </div>
        </>
      );
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderManage);
