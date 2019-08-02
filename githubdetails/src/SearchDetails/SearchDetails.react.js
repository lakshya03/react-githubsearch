import React from 'react';
import axios from 'axios';



class SearchDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            loaded:false
        }
    }

    componentDidMount() {
        this.fetchAPI();
    }
   // calling the api by updated value
    componentDidUpdate() {
        this.fetchAPI();
    }

    fetchAPI = () => {
        let type = this.props.searchType === 'USER' ? 'users' : 'repositories';
        fetch(`https://api.github.com/search/${type}?q=${this.props.searchText}&per_page=10`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    list: responseJson.items.slice(),loaded:true
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }


    render() {
        let list = [];
        if(!this.state.loaded)
        {
            
            return (
                <div className='showprofile_wrapper'>
                 
                 <h1>Server Down</h1>
                 </div>
            );
        }
        else{
        if (this.state.list && this.props.searchType === 'USER') {
            list = this.state.list.map(
                (item,index)=>
                
                    <p className="bottom" onClick={() => { this.props.pageToDisplay({ displayPage: 'UserDetails', username: item.login, repo:'' }) }} key={index}>
                       
                        <img src={item.avatar_url} height="40px" width="40px" align="right" /><br/>
                     <b>User Name: </b>{item.login} <br/>
                        
                    </p>
            );
        } else if (this.state.list) {
            list = this.state.list.map(
                (item,index) =>
                    <p  className="bottom" onClick={() => { this.props.pageToDisplay({ displayPage: 'RepositoryInfo', username: item.owner.login, repo:item.name }) }} key={index}>
                     <b>Repository name: </b>{item.name} <br />
                     <b>Owner name: </b>{item.owner.login} <br />
                        
                    </p>
            );
        }

        return (
            <div>
                {list}
            </div>
        );
        }
    }
}

export default SearchDetails;