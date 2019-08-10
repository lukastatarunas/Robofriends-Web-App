import React, { Component } from 'react'
import CardList from './CardList'
import SearchBox from './SearchBox'
import ErrorBoundary from './ErrorBoundary'
import './App.css'
import { setSearchField, requestRobots } from './actions'
import { connect } from 'react-redux'

const mapStateToProps = state => {
	return {
		searchField: state.searchRobots.searchField,
		robots: state.requestRobots.robots,
		isPending: state.requestRobots.isPending,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onSearchChange: event => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

class App extends Component {
		componentDidMount() {
			this.props.onRequestRobots()
		}

		render() {
			const { searchField, onSearchChange, robots, isPending } = this.props
			const filteredRobots = robots.filter(robot => {
				return robot.name.toLowerCase().includes(searchField.toLowerCase())
			})
			return isPending ?
			<h1>Loading</h1> :
			(
			<div className='tc'>
				<h1 className='f1'>RoboFriends</h1>
				<SearchBox searchChange={ onSearchChange } />
				<ErrorBoundary>
					<CardList robots={ filteredRobots } />
				</ErrorBoundary>
			</div>
		)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)