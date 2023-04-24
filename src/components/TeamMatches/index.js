// Write your code here
import './index.css'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

class TeamMatches extends Component {
  state = {matchData: [], isLoading: true}

  componentDidMount() {
    this.getMatchData()
  }

  getMatchData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const fetchdata = await response.json()
    console.log(fetchdata)
    const updatedData = {
      teamBannerUrl: fetchdata.team_banner_url,
      latestMatchDetails: {
        id: fetchdata.latest_match_details.id,
        competingTeam: fetchdata.latest_match_details.competing_team,
        competingTeamLogo: fetchdata.latest_match_details.competing_team_logo,
        date: fetchdata.latest_match_details.date,
        firstInnings: fetchdata.latest_match_details.first_innings,
        manOfTheMatch: fetchdata.latest_match_details.man_of_the_match,
        matchStatus: fetchdata.latest_match_details.match_status,
        result: fetchdata.latest_match_details.result,
        secondInnings: fetchdata.latest_match_details.second_innings,
        umpires: fetchdata.latest_match_details.umpires,
        venue: fetchdata.latest_match_details.venue,
      },
      recentMatches: fetchdata.recent_matches.map(eachItem => ({
        umpires: eachItem.umpires,
        result: eachItem.result,
        manOfTheMatch: eachItem.man_of_the_match,
        id: eachItem.id,
        date: eachItem.date,
        venue: eachItem.venue,
        competingTeam: eachItem.competing_team,
        competingTeamLogo: eachItem.competing_team_logo,
        firstInnings: eachItem.first_innings,
        secondInnings: eachItem.second_innings,
        matchStatus: eachItem.match_status,
      })),
    }

    this.setState({matchData: updatedData, isLoading: false})
  }

  renderTeamMatches = () => {
    const {matchData} = this.state
    const {teamBannerUrl, latestMatchDetails} = matchData
    return (
      <div className="team-matches-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatch={latestMatchDetails} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderRecentMatchesList = () => {
    const {matchData} = this.state
    const {recentMatches} = matchData
    return (
      <ul className="recent-matches-list">
        {recentMatches.map(each => (
          <MatchCard match={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="BallTriangle" color="#008fff" height={80} width={80} />
    </div>
  )

  render() {
    const {isLoading} = this.state

    return (
      <div>{isLoading ? this.renderLoader() : this.renderRecentMatches()}</div>
    )
  }
}

export default TeamMatches
