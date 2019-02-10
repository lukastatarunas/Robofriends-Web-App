import React, {Component} from 'react';
import CardList from './CardList';
import SearchBox from './SearchBox';
import './App.css';

class App extends Component {
		constructor() {
			super()
			this.state = {
				robots: [],
				searchfield: ''
			}
		}

		componentDidMount() {
			fetch('https://jsonplaceholder.typicode.com/users')
				.then(response => response.json())
				.then(users => this.setState({robots: users}));
		}

		onSearchChange = (event) => {
			this.setState({searchfield: event.target.value})
		}

		render() {
			const {robots, searchfield} = this.state;
			const filteredRobots = robots.filter(robot => {
				return robot.name.toLowerCase().includes(searchfield.toLowerCase());
			})
			return (
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={this.onSearchChange} />
				<CardList robots={filteredRobots} />
			</div>
		);
	}
}

export default App;