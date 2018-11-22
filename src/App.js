import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      filteredPosts: '',
      posts: [{
        name: '',
        discussion_url: '',
        tagline: '',
        user: [{
          user: '',
        }],
        screenshot_url: [{
          '300px' : ''
        }]
      }],
    }
  }

  filterProduct = () => {
    let posts = this.state.posts;
    posts = posts.filter((post) => {
      let postName = post.name.toLocaleLowerCase()
      return postName.indexOf(
        postName.toLocaleLowerCase()) !== -1
    })
    this.setState({ posts })
  }

  componentDidMount() {
    fetch('https://api.producthunt.com/v1/posts',{
      method: 'Get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 1235a98f2491b08eeebdc2a992d9286399099c38f32449774f3ab70ebd17d418 ',
        'Host': 'api.producthunt.com',
      },
    }).then(results => { return results.json()
    }).then(post => {
      this.setState({ posts: post.posts })
      console.log(this.state.posts)
    })
    .catch(error => {
      console.log(error)
    })
  }

  renderPosts(){  
    return <div className="content">
      {this.state.posts.map((p, i) => 
        <ul>
          <li>
            <h4>Author: {p.user.name}</h4>
            <h3><a href={p.discussion_url} target="_blank" rel="noopener noreferrer">{p.name}</a></h3>
            <p>{p.tagline}</p>
            <h5>Votes: {p.votes_count}, Comments: {p.comments_count}</h5>
          </li>
        </ul> 
      )}   
    </div>;   
  }

  render() {
    return (
      <div className="App">
      <header>
        RideTo Tech Test
      </header>
        <input type="text" onChange={this.filterProduct.bind(this)} value={this.state.filteredPosts} placeholder="Search here..."/>
         {this.renderPosts()}
      </div>
    );
  }
}

export default App;
