/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/Product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,  { Component } from "react";
import ModalProduct from "./ModalProduct"; 
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


class ProductManage extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          arrProducts:[],
          isOpenModalProduct:false,
          isOpenModalDeleteProduct:false,
          ProductDelete:{},
          ProductEdit:{}
      }
    }

    componentDidMount() {

        this.getAllProducts();
        
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
    handleAdd =()=>{
      this.setState({
          isOpenModalProduct:true,
          ProductEdit:{},
      })
     }
    handleDelete =  (Product) =>{
        if (window.confirm("Are you sure ?")) {
                this.doDelete(Product);
          }
    }
    handleView =  (Product) =>{
        this.setState({
            isOpenModalProduct:true,
            ProductEdit:Product,
        })
        console.log('check view',Product)
    }
    toggleProductModal = () => {
      this.setState({
          isOpenModalProduct : !this.state.isOpenModalProduct,
      })
    }
    toggleDeleteProductModal = () => {
        this.setState({
            isOpenModalDeleteProduct : !this.state.isOpenModalDeleteProduct,
        })
    }
    doDelete = async (Product) =>{
      try{
          let res = await fetch("http://localhost:8080/admin/product/"+Product.id+"/delete",{
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
                              isOpenModalProduct:false
                          })
                           this.getAllProducts()
                      }
                      return responseJson.user;
                  });
          console.log('click save',Product)
      }catch(e){
          console.log(e)
      }
    }
    doEditProduct = async (Product) => {
      
      const formData = new FormData();
      // formData.append('id',Product.id);
                formData.append('name',Product.name);
                formData.append("cost",Product.cost);
                formData.append("selling_price",Product.selling_price);
                formData.append("category_id",Product.category_id);
                formData.append("photo",Product.photo);
                formData.append("description", Product.description);

                
        const json = JSON.stringify({
                  "name":Product.name,
                  "cost":Product.cost,
                  "selling_price":Product.selling_price,
                  "description":Product.description,
                  "category_id":Product.category_id,
                  "photo":Product.photo,
        })
        console.log('js',json)
        if (Product.id==0){
          try{
              
            let res = await fetch("http://localhost:8080/admin/product/add",{
                // mode : 'no-cors',
                method : "POST",
                headers : {
                    'Accept': 'application/json',
                    // //'Content-Type': 'multipart/form-data',
                    // 'Access-Control-Allow-Origin':'*',
                    // "Access-Control-Allow-Methods":'PUT'
                },
                body : formData
                }).then((response) => response.json())
                    .then((responseJson) => {

                        console.log('res post:',responseJson);
                        if (responseJson.status=='ok'){
                            this.setState({
                                isOpenModalProduct:false
                            })
                            this.getAllProducts()
                        }
                        return responseJson.user;
                    });
            console.log('click save',Product)
          }catch(e){
              console.log(e)
          }
        }else{
          try{
              
              let res = await fetch("http://localhost:8080/admin/product/"+Product.id+"/save",{
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
                                  isOpenModalProduct:false
                              })
                              this.getAllProducts()
                          }
                          return responseJson.user;
                      });
              console.log('click save',Product)
          }catch(e){
              console.log(e)
          }
        }
    }
  
    render(){
      const arrProducts = this.state.arrProducts;
      return (
        <>
          <div className="content">
            <button onClick={()=>{this.handleAdd()}}>Add new</button>
                  {
                      this.state.isOpenModalProduct &&
                  
                      <ModalProduct 
                          isOpen = {this.state.isOpenModalProduct}
                          toggleFromParent={this.toggleProductModal}
                          currentProduct={this.state.ProductEdit}
                          editProduct={this.doEditProduct}
                      />
                  }
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Simple Table</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>No</th>
                          <th>Product name</th>
                          <th>Cost</th>
                          <th>Price</th>
                          <th>Description</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      
                      <tbody>
                      {
                          arrProducts && arrProducts.map((Product)=>{
                              return(
                                  <tr>
                                      <td>{Product.id}</td>
                                      <td>{Product.name}</td>
                                      <td>{Product.cost}</td>
                                      <td>{Product.selling_price}</td>
                                      <td >{Product.description}</td>
                                    
                                      <td>
                                          <button onClick={()=>{this.handleView(Product)}}>View</button>
                                          <button onClick={()=>{this.handleDelete(Product)}}>Delete</button> 
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
                    <p className="card-Product">
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
