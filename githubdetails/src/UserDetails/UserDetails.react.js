import React from 'react';
import axios from 'axios';


class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            userdetails:[]
        }
    }

    componentDidMount(){ 

        axios.get(`https://api.github.com/users/${this.props.username}/repos`)
            .then(response => {
                const data = JSON.parse(JSON.stringify(response.data));
                this.setState({
                    list: data.slice()
                });
                console.log(data);
            })
    }



    render() {
        let list1 = [];
       
        list1 = this.state.list.map(
            (item,index)=>
                <p key={index} className= "bottom">
                <b>Repository name:</b> {item.name}  <br />
                 <b>Owner name: </b> {item.owner.login} <br />
                    
                </p>
        );
       
        return (
            <div>
                <br/>
                <button onClick={this.props.returnToSearchPage} className="fa fa-home">Home </button>
              <h1 align="center"> {this.props.username} </h1>
              <hr></hr>
              <h3>Public Repositories</h3>
              <hr></hr>
                {list1}
            </div>
        );
    }
}

export default UserDetails;