import React from 'react';



class SearchPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonSelected: 'USER', // Options: 'USER' or 'REP'
            searchText: '',
        }
    }

    handleButtonChange = (e) => {
        this.setState({ buttonSelected: e.target.value });
        
    }

    handleChange = (e) => {
        this.setState({ searchText: e.target.value });
    }

    handleSubmit = (e) => {
        this.props.searchAndButton({
            buttonSelected: this.state.buttonSelected,
            searchText: this.state.searchText
        });
        this.setState({
            searchText: ''
        });
        e.preventDefault();
        console.log(this.state.buttonSelected);
        console.log(this.state.searchText);
    }

    render() {
        return(
            <div>
               <h1 align="center"> GitHub Search</h1>
               <hr></hr>
                <form onSubmit={this.handleSubmit}>
                &nbsp;&nbsp;&nbsp;
                    <input type="text" value={this.state.searchText} onChange={this.handleChange} />
                    &nbsp;&nbsp;&nbsp;
                    <label><input type="radio" name="userorrep" value='USER' checked={this.state.buttonSelected === 'USER'} onChange={this.handleButtonChange} />USER</label>
                    &nbsp;&nbsp;&nbsp;
                    <label><input type="radio" name="userorrep" value='REP' checked={this.state.buttonSelected === 'REP'} onChange={this.handleButtonChange} />REPOSITORY</label>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <input type="submit" value="SEARCH"  className ="btn btn-primary" align="right" />
                </form>
            </div>
        );
    }
}

export default SearchPage;