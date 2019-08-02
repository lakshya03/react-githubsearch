import React from 'react';
import axios from 'axios';


class RepositoryInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount(){
       
        axios.get(`https://api.github.com/repos/${this.props.username}/${this.props.repo}`)
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
                <p key={index} className= "bottom" >
                 <img src={item.avatar_url} height="40px" width="40px" align="center" /><br/>   
                 <b>Owner name: </b> {item.forks} <br />
                 <b>Open Issues:</b>{item.open_issues} <br/>
                 <b>Watchers: </b>{item.watchers}<br/>   
                </p>
        );
        return (
            <div>
                <br/>
                <button onClick={this.props.returnToSearchPage} className="fa fa-home">Home </button>
              <h1 align="center"> {this.props.repo} </h1>
              <hr></hr>
                {list1}
            </div>
        );
    }
}

export default RepositoryInfo;