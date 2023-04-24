// Write your code here
import {Link} from 'react-router-dom'
import {Component} from 'react'
import './index.css'

class TeamCard extends Component {
  render() {
    const {team} = this.props
    const {name, imageUrl, id} = team

    return (
      <Link to={`/team-matches/${id}`} className="Link-item">
        <li className="team-card">
          <img src={imageUrl} className="team-card-image" alt={`${name}`} />
          <p className="team-card-name">{name}</p>
        </li>
      </Link>
    )
  }
}

export default TeamCard
