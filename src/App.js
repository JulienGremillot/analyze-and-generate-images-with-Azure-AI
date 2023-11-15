import React from 'react';
import { Component } from 'react';
import { analyzeImage, generateImage } from './azure-image-analysis';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: '',
      prompt: ''
    };
  }

  handleAnalyzeImage = async (event) => {
    event.preventDefault();
    const tags = await analyzeImage(this.state.imageUrl);
    this.displayResults(tags);
  };
  handleGenerateImage = async (event) => {
    event.preventDefault();
    const imageUrl = await generateImage(this.state.prompt);
    console.log(imageUrl);
  };
  // method to update the state with the input value
  handleInputChange = (event) => {
    console.log(event.target.name, event.target.value);
    if (event.target.value.toString().startsWith("http://") || event.target.value.toString().startsWith("https://")) {
      this.setState({ imageUrl: event.target.value });
    } else {
      this.setState({ prompt: event.target.value });
    }
  };

  // method to render the component
  render() {  
    return (
      <div className="App">
        <h1>Image Analysis and Generation App</h1>
        <form>
          <div>
            <label>Image URL or Prompt</label>
            &nbsp;
            <input type="text" name="imageUrlOrPrompt" onChange={this.handleInputChange}/>
          </div>
          <div>
            <button onClick={this.handleAnalyzeImage}>Analyze</button>
            &nbsp;
            <button onClick={this.handleGenerateImage}>Generate</button>
          </div>
        </form>
        <div id="results">
        </div>
      </div>
    );
  };
  displayResults = (tags) => {
    // add HTML in the results div
    let html = '<h2>Results</h2>';
    if (this.state.imageUrl) {
      html += `<div>
          <label>Image URL</label>
          &nbsp;
          <input type="text" value=${this.state.imageUrl} />
        </div>`;
      html += '<img src="' + this.state.imageUrl + '" alt="image" width="200" height="200" />';
    } else {
      html += `<div>
          <label>Prompt</label>
          &nbsp;
          <input type="text" value=${this.state.prompt} />
        </div>`;
    }
    html += '<ul>';
    tags.forEach(tag => {
      html += '<li>' + tag + '</li>';
    });
    html += '</ul>';
    document.getElementById('results').innerHTML = html;
  }
}

export default App;
