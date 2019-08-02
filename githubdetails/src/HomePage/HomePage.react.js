import React from 'react';
import SearchPage from '../SearchPage/SearchPage.react';
import SearchDetails from '../SearchDetails/SearchDetails.react';
import UserDetails from '../UserDetails/UserDetails.react';
import RepositoryInfo from '../RepositoryInfo/RepositoryInfo.react';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayPage: 'SearchPage', // Options: 'SearchPage', 'UserDetails' ,RepositoryInfo
            showSearchDetails: false,
            obj: null,
            userNameForDisplayingRepositories: '',
            repoNameForDisplay:''
        };
    }
   // send as props to search page to set the radio button value and input field value 
    searchAndButton = (obj) => {
        this.setState({
            showSearchDetails: true,
            obj
        })
    }

    pageToDisplay = (obj) => {
        this.setState({
            displayPage: obj.displayPage,
            userNameForDisplayingRepositories: obj.username,
            repoNameForDisplay:obj.repo
        });
    }
     
    // Displaying the list of user or repos
    showSearchDetails = () => {
        if (this.state.showSearchDetails && this.state.obj) {
            return <SearchDetails searchText={this.state.obj.searchText} 
            searchType={this.state.obj.buttonSelected} pageToDisplay={this.pageToDisplay} />
        }
    }
    

    showPage = (page) => {
        switch (page) {
            case 'SearchPage': return <div>
                <SearchPage searchAndButton={(obj) => { this.searchAndButton(obj) }} />
                {this.showSearchDetails()}
            </div>;
            case 'UserDetails': return <UserDetails username = {this.state.userNameForDisplayingRepositories} 
            returnToSearchPage={() => { this.setState({ displayPage: 'SearchPage', showSearchDetails: false, obj: null, userNameForDisplayingRepositories: '',repoNameForDisplay:'' })} }/>
            case 'RepositoryInfo': return <RepositoryInfo  username = {this.state.userNameForDisplayingRepositories} repo={this.state.repoNameForDisplay}
            returnToSearchPage={() => { this.setState({ displayPage: 'SearchPage', showSearchDetails: false, obj: null, userNameForDisplayingRepositories: '',repoNameForDisplay:''  })} }/>
        }
    }
    render() {
        return (
            <div>
                {this.showPage(this.state.displayPage)}
            </div>

        );
    }
}

export default HomePage;