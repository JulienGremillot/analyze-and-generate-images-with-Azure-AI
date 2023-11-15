import React from 'react';

function App() {
  // simple IHM with a title, a text input to enter an image URL and a button to submit the form
  return (
    <div className="App">
      <h1>Image Analysis and Generation App</h1>
      <form>
        <div>
          <label>Image URL or Prompt</label>
          &nbsp;
          <input type="text" />
        </div>
        <div>
          <button>Analyze</button>
          &nbsp;
          <button>Generate</button>
        </div>
      </form>
    </div>
  );
}

export default App;
