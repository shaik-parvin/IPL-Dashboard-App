// Write your code here
import './index.css'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import TeamCard from '../TeamCard'

class Home extends Component {
  state = {isLoading: true, teamsData: []}

  componentDidMount() {
    this.getTeamsList()
  }

  getTeamsList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const fetcheddata = data.teams.map(each => ({
      name: each.name,
      imageUrl: each.team_image_url,
      id: each.id,
    }))

    this.setState({teamsData: fetcheddata, isLoading: false})
  }

  renderTeamsList = () => {
    const {teamsData} = this.state
    return (
      <ul className="team-list-items">
        {teamsData.map(each => (
          <TeamCard key={each.id} teamData={each} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="bg-container">
        <div className="ipl-container">
          <div className="header-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="logo"
            />
            <h1 className="heading">IPL Dashboard</h1>
          </div>
          <div>
            {isLoading ? (
              <div testid="loader">
                <Loader type="Oval" color="#ffffff" height={50} width={50} />
              </div>
            ) : (
              this.renderTeamsList()
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default Home
