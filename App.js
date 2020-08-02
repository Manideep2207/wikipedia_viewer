import React from 'react';
import logo from './logo.svg';
import './App.css';
class RandomWiki extends React.Component {
  render() {
    return(
      <div id = "RandomWikiclass">
      <a href = "https://en.wikipedia.org/wiki/Special:Random" className = "RandomWiki" target = "_blank">Random
      <i class="fa fa-random" aria-hidden="true"></i>
</a>
      </div>
      );
}
}
const ResultList = ({ resultList }) => {

  return (
    <article className="result-list">
      
      <a href={`https://en.wikipedia.org/wiki/${resultList.title}`} className="result-button" target="_blank"><h2>{resultList.title}</h2>
      <p dangerouslySetInnerHTML={{__html: `${resultList.snippet}...`}}></p></a>
    </article>
  );
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      wikiList: [],
      errorMessage: '',
      errorStyle: {display: 'none'}
      };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetinput = this.resetinput.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  handleSubmit(event) {
    event.preventDefault()
    this.setState({
      wikiList : [],
      errorStyle: {display: 'none'}
    });
    const root = "https://en.wikipedia.org//w/api.php?origin=*&action=query&format=json&list=search&srsearch=";
    fetch(`${root}${this.state.input}`)
    .then(response => response.json())
    .then(wikiData => {
      this.setState({
        wikiList : wikiData.query.search,
        });
      if(this.state.wikiList.length === 0)
      {
        this.setState({
          errorMessage: ` Unable to find results for "${this.state.input}". Consider revising your search.`,
          errorStyle: {display: 'block'}
        });
      }
    })
    .catch((error) => {
      this.setState({
        errorMessage: ' Unable to load Wikipedia search results at this time.',
          errorStyle: {display: 'block'}
        });
      });
    }
  resetinput() {
    this.setState(state => ({
      input: ''
    }))
  }
  render() {
  return (
    <div className="App">
    <div className="page-container">
    <header>
          <h1>Wikipedia Viewer</h1>
        </header>
        <div id = "same-line">
     <RandomWiki />
     <div className = "SearchBar">
      <form onSubmit = {this.handleSubmit}>
        <div className = "SearchBarInput">
        <span className="fa fa-search search-icon"></span>
        <input className = "SearchInputText" type = 'text' placeholder = "Type here..." value = {this.state.input} onChange = {this.handleChange}  />
        <span className = "reset" onClick = {this.resetinput} >X</span>
        </div>
        </form>
      </div>
      <div>
        <button onClick = {this.handleSubmit} className = "button" type='submit'>Search Wiki!</button>
        </div>
      </div>
          <div className = "wikiresults"> {this.state.wikiList.map((resultList, index) => <ResultList key={index} resultList={resultList} />)} </div>
  <p className="message error-message" style={this.state.errorStyle}><span className="fa fa-exclamation-circle fa-lg fa-fw"></span>{this.state.errorMessage}</p>
  </div>
  <footer className = "footer">By <a href = "https://github.com/Manideep2207">@Manideep2207</a></footer>
    </div>
  );
}
}

export default App;
