import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { transpileModule } from 'typescript';
import _ from 'lodash';
//import img_ from '../../assets/images/bruce-mars.jpg';
class ModalCategory extends Component {
    

    constructor(props){
        super(props);
        this.state = {
            Category:null,
            id:0,
            name:'',
            SaveDisabled:true,
            EditDisabled:false,
        }
        
    }


    state = {

    }

    componentDidMount() {
        let Category = this.props.currentCategory;
        let id = Category.id;
        if (Category && !_.isEmpty(Category)){ 

           
            this.setState({
                id:Category.id,
                name: Category.name,
            })
        }
        if (Category.id==0){
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
    
    handleSaveCategory = () =>{
        this.setState({
            errMessage:''
        })
        let isValid =this.checkValidInput();
        if (isValid===true){
            this.props.editCategory(this.state);
            //let data = await handleLogin(this.state.username, this.state.password);
            const Category = {
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
                <ModalHeader toggle={()=>{this.toggle()}}>Category Details</ModalHeader>
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
                            Category name
                        </div>
                            <input 
                                type="text" 
                                value = {this.state.name}
                                onChange={(event)=>this.handleOnChangeInputName(event)}
                                class="form-control"
                            />
                    
                </ModalBody>
                <ModalFooter>
                    <button id="buttonSave" color="primary" onClick={()=>{this.handleSaveCategory()}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCategory);


