import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { transpileModule } from 'typescript';
import _ from 'lodash';
class ModalSignUp extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:'',
            username:'',
            password:'',
            
        }
    }


    state = {

    }

    componentDidMount() {
        
    }

    toggle = ()=>{
        this.props.toggleFromParent();
    }
    checkValidInput = () => {
        let isValid = true;
        if ((!this.state.username)||(!this.state.password)||(!this.state.name) ){
            isValid = false;
            alert('Please fill in the form')
        }
        return isValid;
    }

    handleOnChangeInputUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
        //console.log(props.Book);
        //console.log(this.props.Book.id);
    }
    handleOnChangeInputPassword = (event) => {
        this.setState({
            password: event.target.value,
        })

    }
    handleOnChangeInputName = (event) => {
        this.setState({
            name: event.target.value,
        })

    }
    handleOnChangeInputDOB = (event) => {
        this.setState({
            dob: event.target.value,
        })
    }

    handleSaveAccount = () =>{

        this.setState({
            errMessage:''
        })
        let isValid =this.checkValidInput();
        if (isValid===true){
            
            //let data = await handleLogin(this.state.username, this.state.password);
            // const user = {
            //     username : this.state.username,
            //     password : this.state.password,
            //     name : this.state.name,
            //     role : 'user'
            // };
            this.props.signUp(this.state);
            console.log('state',this.state)
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
                <ModalHeader toggle={()=>{this.toggle()}}>Sign up</ModalHeader>
                <ModalBody>
                    <div className='container'>
                        <div className="row">
                            <div className="col-6 form group">
                                <br />
                                
                                    <div class="input-group-prepend">
                                        Username
                                    </div>
                                    <input 
                                        type="text" 
                                        value = {this.state.username}
                                        onChange={(event)=>this.handleOnChangeInputUsername(event)}
                                        class="form-control"
                                    ></input>
                                
                                <br />
                                
                                    <div class="input-group-prepend">
                                       Password
                                    </div>
                                    <input 
                                        type="password" 
                                        value = {this.state.password}
                                        onChange={(event)=>this.handleOnChangeInputPassword(event)}
                                        class="form-control"
                                    ></input>
                                
                                <br />
                               
                                    <div class="input-group-prepend">
                                        Name
                                    </div>
                                    <input 
                                        type="text" 
                                        value = {this.state.name}
                                        onChange={(event)=>this.handleOnChangeInputName(event)}
                                        class="form-control"
                                    ></input>
                                
                                <div class="input-group-prepend">
                                    Date of birth
                                </div>
                                <input 
                                        type="date" 
                                        value = {this.state.dob}
                                        onChange={(event)=>this.handleOnChangeInputDOB(event)}
                                        class="form-control"
                                    />
                                
                            </div>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>{this.handleSaveAccount()}}>
                        Save
                    </Button>{' '}
                    <Button color="secondary" onClick={()=>{this.toggle()}}>
                        Cancel
                    </Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalSignUp);


