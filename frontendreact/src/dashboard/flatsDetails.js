import React, {Component} from 'react'
import axios from 'axios';
import { MDBCard, MDBCardBody, MDBCardHeader, MDBBtn, MDBTable ,MDBDataTable, MDBDropdown, MDBDropdownToggle, MDBDropdownItem, MDBDropdownMenu } from 'mdbreact';
var booked, all, unbooked

class flatsDetails extends Component
{
  constructor(){
    super();
    
    this.state = {
      columns: [

        {
          'label': 'Select',
          'field': 'check',
          'sort': 'asc'
        },
        {
          
          'label': 'Flat Type',
          'field': 'type',
          'sort': 'asc'
        },
        {
          'label': 'Flat#',
          'field': 'flat_num',
          'sort': 'asc'
        },
        {
          'label': 'Floor',
          'field': 'floor',
          'sort': 'asc'
        },
        {
          'label': 'Booked',
          'field': 'isbooked',
          'sort': 'asc'
        },
        {
          'label': 'Sq Area',
          'field': 'covered_area',
          'sort': 'asc'
        },
        {
          'label': 'Price',
          'field': 'price',
          'sort': 'asc'
        },
        {
          'label': 'Corner',
          'field': 'iscorner',
          'sort': 'asc'
        },
        {
          'label': 'West Open',
          'field': 'iswestopen',
          'sort': 'asc'
        },
        {
          'label': 'Road Facing',
          'field': 'isroadfacing',
          'sort': 'asc'
        },
        {
          'label': 'Booked',
          'field': 'isbooked',
          'sort': 'asc'
        }
      ],
      rows: []
    }

    this.print = ()=>{
      window.print();
    }
  }


  componentDidMount(){
    axios.get(`http://localhost:8080/allfd`)
    .then(response => {
      this.setState({rows: response.data});
      all = response.data
    })
    
    axios.get(`http://localhost:8080/booked`)
    .then(response => {
      booked = response.data
    })

    axios.get(`http://localhost:8080/unbooked`)
    .then(response => {
      unbooked = response.data
    })
  }

  handleChange = (Name) => (event) => {
    if(Name === "Booked")
    {
      this.setState({rows: booked})
    }
    else if(Name === "unBooked"){
      this.setState({rows: unbooked})
    }
    else if(Name === "All"){
      this.setState({rows: all})
    }
  };

  
  render(){
    return(
      <MDBCard className="styletables" >
        <MDBCardHeader className="view view-cascade gradient-card-header blue-gradient d-flex justify-content-between align-items-center py-2 px-8   mx-4 mb-3">

            {/* <MDBBtn rounded size="sm" color="white" className="px-2">
              <a href="#win" className="fa fa-th-large mt-0"></a>
            </MDBBtn> */}

            <MDBBtn outline rounded size="sm" color="white" className="px-2">
              <i className="fa fa-columns mt-0"></i>
            </MDBBtn>

            <h4><b className="align-items-center">FLATS DETAILS</b></h4>
            {/* <a href="/" className="white-text mx-3">FLATS DETAILS</a> */}
            <MDBBtn outline rounded size="sm" color="white" className="px-2">
              <i className="fas fa-pencil-alt mt-0"> Edit</i>
            </MDBBtn>

            <MDBBtn outline rounded size="sm" color="white" className="px-2" onClick={this.print}>
              <a href="#printpreview" className="fas fa-trash alt mt-0"> Delete</a>
              
            </MDBBtn>


            <MDBBtn outline rounded size="sm" color="white" className="px-2" onClick={this.print}>
              <a href="#printpreview" className="fas fa-print mt-0"> Print</a>
              
            </MDBBtn>

            

            <MDBBtn outline rounded size="sm" color="white" className="px-2">
              <a href="/postfd"className="fas fa-plus mt-0"> Form</a>
            </MDBBtn>

        </MDBCardHeader>
          
        <MDBDropdown className="d-flex justify-content-center">
          <MDBDropdownToggle  caret color="primary" >
            Select Flat Mode
          </MDBDropdownToggle>
          <MDBDropdownMenu basic>
            <MDBDropdownItem onClick = {this.handleChange("Booked")}> Booked Flats</MDBDropdownItem>
            <MDBDropdownItem onClick = {this.handleChange("unBooked")}> Unbooked Flats</MDBDropdownItem>
            <MDBDropdownItem onClick = {this.handleChange("All")}> All Flats </MDBDropdownItem>
            {/* <MDBDropdownItem divider /> */}
          </MDBDropdownMenu>
        </MDBDropdown>
        


        <MDBCardBody cascade>
          
         <MDBTable btn fixed align="right">
            <MDBDataTable 
            bordered
            small 
            striped
            data={this.state}/>
            {/* <MDBTableHead columns={this.state.columns} />
            <MDBTableBody rows={this.state.rows} />  */}
          </MDBTable>
      
        </MDBCardBody>
      </MDBCard>
    )
  }
}

export default flatsDetails;