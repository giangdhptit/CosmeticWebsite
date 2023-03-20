import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { transpileModule } from 'typescript';
import _ from 'lodash';
//import img_ from '../../assets/images/bruce-mars.jpg';
class ModalUser extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            User:null,
            id:0,
            name:'',
            username:'',
            role:'user',
            dob:'',
            SaveDisabled:true,
            EditDisabled:false,
        }
        
    }


    state = {

    }

    componentDidMount() {
        let User = this.props.currentUser;
        let id = User.id;
        if (User && !_.isEmpty(User)){ 

           
            this.setState({
                id:User.id,
                name: User.name,
                username : User.username,
                role : User.role,
                dob : User.dob
            })
        }
        if (User.id==0){
            this.setState({
                EditDisabled:true,
                SaveDisabled:false
            })
        }
        console.log(this.state.imgURL)
    }

    toggle = ()=>{
        this.props.toggleFromParent();
       
    }
    checkValidInput = () => {
        let isValid = true;
        if ((!this.state.name)){
            isValid = false;
            alert('Please fill in all fields !')
        }
        return isValid;
    }

    handleOnChangeInputName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }
    
    handleOnChangeInputUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }

    handleOnChangeInputRole = (event) => {
        this.setState({
            role: event.target.value,
        })
    }

    handleOnChangeInputDOB = (event) => {
        this.setState({
            dob: event.target.value,
        })
    }

    handleSaveUser = () =>{
        this.setState({
            errMessage:''
        })
        let isValid =this.checkValidInput();
        if (isValid===true){
            this.props.editUser(this.state);
            //let data = await handleLogin(this.state.username, this.state.password);
            const User = {
                name : this.state.name,    
            };
        }
    }
    
    render() {
        
        return (
            <Modal 

                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className={'modalClassName'}
                size="lg"
                centered
            >
                <ModalHeader toggle={()=>{this.toggle()}}>User Details</ModalHeader>
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
                            Name
                        </div>
                            <input 
                                type="text" 
                                value = {this.state.name}
                                onChange={(event)=>this.handleOnChangeInputName(event)}
                                class="form-control"
                            />
                    
                        <div class="input-group-prepend">
                            Account name
                        </div>
                            <input 
                                type="text" 
                                value = {this.state.username}
                                onChange={(event)=>this.handleOnChangeInputUsername(event)}
                                class="form-control"
                            />
                    
                        <div class="input-group-prepend">
                            Role
                        </div>
                        <div class="box">
                            <select 
                                defaultValue={this.state.role}
                                onChange={(event)=>this.handleOnChangeRole(event)}
                                
                            >
                                <option value={this.state.role}>
                                    {this.state.role}
                                </option>
                                <option value="admin">
                                    admin
                                </option>
                                <option value="user">user</option>
                            </select>
                        </div> 
                        <div class="input-group-prepend">
                            Date of birth
                        </div>
                                <input 
                                        type="date" 
                                        value = {this.state.dob}
                                        onChange={(event)=>this.handleOnChangeInputDOB(event)}
                                        class="form-control"
                                    />
                    
                </ModalBody>
                <ModalFooter>
                    <button id="buttonSave" color="primary" onClick={()=>{this.handleSaveUser()}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);


