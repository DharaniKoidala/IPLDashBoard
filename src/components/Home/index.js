// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamData: [], isLoading: true}

  componentDidMount() {
    this.getTeam()
  }

  getTeam = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    console.log(data)
    const updatedData = data.teams.map(each => ({
      id: each.id,
      name: each.name,
      imageUrl: each.team_image_url,
    }))
    this.setState({teamData: updatedData, isLoading: false})
  }

  renderTeam = () => {
    const {teamData} = this.state
    return (
      <ul className="team-list-item">
        {teamData.map(each => (
          <TeamCard key={each.id} team={each} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="Loader-container">
      <Loader type="Rings" color="#00BFFF" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="app-container">
        <div className="ipl-container">
          <div className="head-container">
            <img
              className="ipl-logo"
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
            />
            <h1 className="header-heading">IPL DashBoard</h1>
          </div>
          <div>{isLoading ? this.renderLoader() : this.renderTeam()}</div>
        </div>
      </div>
    )
  }
}

export default Home
