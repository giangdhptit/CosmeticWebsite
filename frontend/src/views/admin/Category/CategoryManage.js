/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React,  { Component } from "react";
import ModalCategory from "./ModalCategory"; 
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


class CategoryManage extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          arrCategories:[],
          isOpenModalCategory:false,
          isOpenModalDeleteCategory:false,
          CategoryDelete:{},
          CategoryEdit:{}
      }
    }

    componentDidMount() {

        this.getAllCategories();
        
    }
    getAllCategories=()=>  {
        const res =  fetch("http://localhost:8080/admin/category",{
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
                  arrCategories : responseJson
                })
            }

            });
    }
    handleAdd =()=>{
      this.setState({
          isOpenModalCategory:true,
          CategoryEdit:{},
      })
     }
    handleDelete =  (Category) =>{
        if (window.confirm("Are you sure ?")) {
                this.doDelete(Category);
          }
    }
    handleView =  (Category) =>{
        this.setState({
            isOpenModalCategory:true,
            CategoryEdit:Category,
        })
        console.log('check view',Category)
    }
    toggleCategoryModal = () => {
      this.setState({
          isOpenModalCategory : !this.state.isOpenModalCategory,
      })
    }
    toggleDeleteCategoryModal = () => {
        this.setState({
            isOpenModalDeleteCategory : !this.state.isOpenModalDeleteCategory,
        })
    }
    doDelete = async (Category) =>{
      try{
          let res = await fetch("http://localhost:8080/admin/category/"+Category.id+"/delete",{
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
                              isOpenModalCategory:false
                          })
                           this.getAllCategories()
                      }
                      return responseJson.user;
                  });
          console.log('click save',Category)
      }catch(e){
          console.log(e)
      }
    }
    doEditCategory = async (Category) => {
      const json = JSON.stringify({
        "name":Category.name,
      })

          try{
              
              let res = await fetch("http://localhost:8080/admin/category/"+Category.id+"/save",{
                  method : "PUT",
                  headers : {
                      'Accept': 'application/json',
                     'Content-Type': 'application/json',
                      // mode : 'no-cors',
                  },
                  body : json
                  }).then((response) => response.json())
                      .then((responseJson) => {

                          console.log('res post:',responseJson);
                          if (responseJson.status=='ok'){
                              this.setState({
                                  isOpenModalCategory:false
                              })
                              this.getAllCategories()
                          }
                          return responseJson.user;
                      });
              console.log('click save',Category)
          }catch(e){
              console.log(e)
          }
      
      }
  
    render(){
      const arrCategories = this.state.arrCategories;
      return (
        <>
          <div className="content">
            <button onClick={()=>{this.handleAdd()}}>Add new</button>
                  {
                      this.state.isOpenModalCategory &&
                  
                      <ModalCategory 
                          isOpen = {this.state.isOpenModalCategory}
                          toggleFromParent={this.toggleCategoryModal}
                          currentCategory={this.state.CategoryEdit}
                          editCategory={this.doEditCategory}
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
                          <th>Category name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      
                      <tbody>
                      {
                          arrCategories && arrCategories.map((Category)=>{
                              return(
                                  <tr>
                                      <td>{Category.id}</td>
                                      <td>{Category.name}</td>
                                      <td>
                                          <button onClick={()=>{this.handleView(Category)}}>View</button>
                                          <button onClick={()=>{this.handleDelete(Category)}}>Delete</button> 
                                      </td>
                                  </tr>
                              )
                            
                          })
                      }
                        <tr>
                          <td>Dakota Rice</td>
                          <td>Niger</td>
                          <td className="text-right">$36,738</td>
                        </tr>
                        
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col md="12">
                <Card className="card-plain">
                  <CardHeader>
                    <CardTitle tag="h4">Table on Plain Background</CardTitle>
                    <p className="card-category">
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

export default connect(mapStateToProps, mapDispatchToProps)(CategoryManage);
