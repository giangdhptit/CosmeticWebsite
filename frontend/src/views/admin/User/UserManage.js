
import React,  { Component } from "react";
import ModalUser from "./ModalUser"; 
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


class UserManage extends Component {
    constructor(props) {
      super(props);
      this.state = { 
          arrUsers:[],
          isOpenModalUser:false,
          isOpenModalDeleteUser:false,
          UserDelete:{},
          UserEdit:{}
      }
    }

    componentDidMount() {

        this.getAllUsers();
        
    }
    getAllUsers=()=>  {
        const res =  fetch("http://localhost:8080/admin/user/getAllUsers",{
            method : "GET",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }).then((response) => response.json())
        .then((responseJson) => {

            console.log(responseJson);
            if (responseJson){
                this.setState({
                  arrUsers : responseJson
                })
            }

            });
    }
    handleAdd =()=>{
      this.setState({
          isOpenModalUser:true,
          UserEdit:{},
      })
     }
    handleDelete =  (User) =>{
        if (window.confirm("Are you sure ?")) {
                this.doDelete(User);
          }
    }
    handleView =  (User) =>{
        this.setState({
            isOpenModalUser:true,
            UserEdit:User,
        })
        console.log('check view',User)
    }
    toggleUserModal = () => {
      this.setState({
          isOpenModalUser : !this.state.isOpenModalUser,
      })
    }
    toggleDeleteUserModal = () => {
        this.setState({
            isOpenModalDeleteUser : !this.state.isOpenModalDeleteUser,
        })
    }
    doDelete = async (User) =>{
      try{
          let res = await fetch("http://localhost:8080/admin/user/"+User.id+"/delete",{
              method : "GET",
                  headers : {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  }
              }).then((response) => response.json())
                  .then((responseJson) => {

                      console.log(responseJson);
                      if (responseJson.status=='ok'){
                          this.setState({
                              isOpenModalUser:false
                          })
                           this.getAllUsers()
                      }
                      return responseJson.user;
                  });
          console.log('click save',User)
      }catch(e){
          console.log(e)
      }
    }
    doEditUser = async (User) => {
      
      const formData = new FormData();
      // formData.append('id',User.id);
                formData.append('name',User.name);
                formData.append("username",User.username);
                formData.append("role",User.role);
                formData.append("dob",User.dob);


          try{
              
              let res = await fetch("http://localhost:8080/admin/user/"+User.id+"/save",{
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
                                  isOpenModalUser:false
                              })
                              this.getAllUsers()
                          }
                          return responseJson.user;
                      });
              console.log('click save',User)
          }catch(e){
              console.log(e)
          }
        
    }
  
    render(){
      const arrUsers = this.state.arrUsers;
      return (
        <>
          <div className="content">
            {/* <button onClick={()=>{this.handleAdd()}}>Add new</button> */}
                  {
                      this.state.isOpenModalUser &&
                  
                      <ModalUser 
                          isOpen = {this.state.isOpenModalUser}
                          toggleFromParent={this.toggleUserModal}
                          currentUser={this.state.UserEdit}
                          editUser={this.doEditUser}
                      />
                  }
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">All users</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Table responsive>
                      <thead className="text-primary">
                        <tr>
                          <th>No</th>
                          <th>Name</th>
                          <th>User account</th>
                          <th>Role</th>
                          <th>Date of birth</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      
                      <tbody>
                      {
                          arrUsers && arrUsers.map((User)=>{
                              return(
                                  <tr>
                                      <td>{User.id}</td>
                                      <td>{User.name}</td>
                                      <td>{User.username}</td>
                                      <td>{User.role}</td>
                                      <td >{User.dob}</td>
                                    
                                      <td>
                                          <button onClick={()=>{this.handleView(User)}}>View</button>
                                          <button onClick={()=>{this.handleDelete(User)}}>Delete</button> 
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
                    <p className="card-User">
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
