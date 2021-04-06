import { Link } from '@reach/router';
import { Component } from 'react';
import { fetchTopics } from '../api';


class NavBar extends Component {
  state = {
    topics: [],
  };
  
  componentDidMount() {
    fetchTopics().then((topics) => {
      this.setState({ topics });
    });
  };

  render () {
    const { topics } = this.state;
    return (
      <nav className="nav-bar">
        <Link key="home" to={"/"}>home
        </Link>
        {topics.map(({ slug }) => {
          return (
            <Link key={slug} to={`/${slug}/articles`}>
            {slug}
            </Link>
          )
        })
        }
      </nav> 
    )
  };
};

export default NavBar;