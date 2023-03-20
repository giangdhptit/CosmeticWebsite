import React, { Component,useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { transpileModule } from 'typescript';
import _ from 'lodash';
import './modal.scss';

//import img_ from '../../assets/images/bruce-mars.jpg';
class ModalProduct extends Component {


    constructor(props){
        super(props);
        this.state = {
            Product:null,
            id:0,
            name:'',
            cost:0,
            selling_price:0,
            description:'',
            category_id:1,
            photo_name:'',
            photo:null,
            SaveDisabled:true,
            EditDisabled:false,
            dropdownOpen:false,
            arrCategories:[],
            Cat:{}
        }
        
    }
    getAllCategories=()=>  {
        console.log('function get all cat');
        const res =  fetch("http://localhost:8080/admin/category",{
            method : "GET",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

        }).then((response) => response.json())
        .then((responseJson) => {
            if (responseJson){
                this.setState({
                  arrCategories : responseJson
                })
                
                this.findCategory(this.state.category_id)
            }

            });
    }

    state = {

    }
    findCategory=(cat_id)=>{
        const arrCategories = this.state.arrCategories;
        for (var i in arrCategories){
            
            var x = arrCategories[i];
            if (x.id==cat_id){
                this.setState({
                    Cat : x
                })
                console.log(this.state.Cat)
            }
        }
       
    }

    componentDidMount() {
        
        let Product = this.props.currentProduct;
        let id = Product.id;
        this.getProduct(id);
        this.getAllCategories();
        var arrCategories = this.state.arrCategories;
        //console.log('aarr',arrCategories)
        
        //console.log(this.state.imgURL)
    }
    getProduct=(id)=>  {
        const res =  fetch("http://localhost:8080/admin/product/"+id,{
            method : "GET",
            headers : {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then((response) => response.json())
        .then((responseJson) => {
            
            if (responseJson){
                //console.log('111111')
                this.setState({
                    id:id,
                    name: responseJson.data.name,
                    cost : responseJson.data.cost,
                    selling_price : responseJson.data.selling_price,
                    description : responseJson.data.description,
                    category_id : responseJson.data.category_id,
                    imgURL: "http://localhost:8080/admin/product/"+id+"/"+responseJson.data.photo_name,
                    
                    //photo: new File([],"http://localhost:8080/admin/product/"+id+"/"+responseJson.data.photo_name)
                })
                this.findCategory(this.state.category_id);
                let url = this.state.imgURL;
                console.log('hel',this.state.category_id,this.state.Cat)
                    fetch(url,{
                        method : "GET",
                        headers : {
                            'Accept': 'application/json',
                            //'Content-Type': 'application/json'
                        },
                    }).then((response) => response.blob())
                    .then((responseBlob) => {
                        if (responseBlob){
                            //console.log('respo Blob', responseBlob)
                            this.setState({
                                photo : responseBlob
                            })
                        }
                    })
                    
                console.log('photo state', this.state.photo);
            }
        });
        
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

    handleOnChangeInputCost = (event) => {
        this.setState({
            cost: event.target.value,
        })
    }

    handleOnChangeInputSelling_price = (event) => {
        this.setState({
            selling_price: event.target.value,
        })
    }

    handleOnChangeInputDescription = (event) => {
        this.setState({
            description: event.target.value,
        })
    }

    handleOnChangeCategory = (event) => {
        this.setState({
            category_id: event.target.value,
        })
        this.findCategory(event.target.value);
        console.log('mang cat',this.state.arrCategories)
        console.log('category_id_state',event.target.value)
        console.log('Cat',this.state.Cat)
    }

    handleFileChange = (event) => {
        this.setState({
            photo: event.target.files[0],
            imgURL: window.webkitURL.createObjectURL(event.target.files[0])
        })
        let img_= event.target.files[0].name;
         console.log('IMGG', this.state.imgURL, event.target.files[0]);
    };

    handleSaveProduct = () =>{
        this.setState({
            errMessage:''
        })
        let isValid =this.checkValidInput();
        if (isValid===true){
            this.props.editProduct(this.state);
            //let data = await handleLogin(this.state.username, this.state.password);
            // const Product = {
            //     name : this.state.name,    
            // };
        }
    }
     dropdownToggle = (e) => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
      };
    render() {
        const arrCategories = this.state.arrCategories;
        return (
            <Modal 

                isOpen={this.props.isOpen} 
                toggle={()=>{this.toggle()}} 
                className={'modalClassName'}
                size="lg"
                centered
            >
                <ModalHeader toggle={()=>{this.toggle()}}>Product Details</ModalHeader>
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
                            Product name
                        </div>
                            <input 
                                type="text" 
                                value = {this.state.name}
                                onChange={(event)=>this.handleOnChangeInputName(event)}
                                class="form-control"
                            />
                        
                        <div class="input-group-prepend">
                            Cost
                        </div>
                            <input 
                                type="text" 
                                value = {this.state.cost}
                                onChange={(event)=>this.handleOnChangeInputCost(event)}
                                class="form-control"
                            />

                        <div class="input-group-prepend">
                            Selling price
                        </div>
                            <input 
                                type="text" 
                                value = {this.state.selling_price}
                                onChange={(event)=>this.handleOnChangeInputSelling_price(event)}
                                class="form-control"
                            />

                        <div class="input-group-prepend">
                            Description
                        </div>
                            <input 
                                type="text" 
                                value = {this.state.description}
                                onChange={(event)=>this.handleOnChangeInputDescription(event)}
                                class="form-control"
                            /> 

                        <div class="input-group-prepend">
                            Category
                        </div>
                        <div class="box">
                            <select 
                                defaultValue={this.state.Cat.name}
                                onChange={(event)=>this.handleOnChangeCategory(event)}
                                
                            >
                                <option >
                                    {this.state.Cat.name}
                                </option>
                                {
                                    this.state.arrCategories.map((Category)=>(
                                        <option value={Category.id} >{Category.name}
                                        </option> 
                                    ))
                                }
                            </select>
                         </div> 
                        
                
                    
                            <img src={this.state.imgURL} alt="" />
                    
                            <div>
                                <input type="file" 
                                
                                onChange={(event)=>this.handleFileChange(event)}
                                multiple />


                            </div>
             
                        
                </ModalBody>
                <ModalFooter>
                    <button id="buttonSave" color="primary" onClick={()=>{this.handleSaveProduct()}}>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalProduct);


