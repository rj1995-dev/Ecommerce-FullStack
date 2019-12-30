import React, { Component, useState, useEffect } from "react";

const App = () => {
  const [news, setNews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("react");
  const [url, setUrl] = useState(
    "http://hn.algolia.com/api/v1/search?query=react"
  );
  const [loading, setLoading] = useState(false);
  const fetchNews = () => {
    //Loading state
    setLoading(true);
    fetch(url)
      .then(result => result.json())
      // .then(data => console.log(data))
      .then(data => (setNews(data.hits), setLoading(false)))
      .catch(error => console.log(error));
  };
  useEffect(() => {
    fetchNews();
  }, [url]);
  const handleChange = e => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    setUrl(`http://hn.algolia.com/api/v1/search?query=${searchQuery}`);
  };
  const showLoading = () => (loading ? <h2>Loading...</h2> : "");
  const showForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="text" value={searchQuery} onChange={handleChange} />
      <button>Search</button>
    </form>
  );
  const showResult = () => news.map((n, i) => <p key={i}>{n.title}</p>);
  return (
    <div>
      <h2>News</h2>
      {showLoading()}
      {showForm()}
      {showResult()}
    </div>
  );
};

//Rect Hooks
// const App = () => {
//   const [count, setCount] = useState(0);
//   const increment = () => {
//     setCount(count + 1);
//   };
//   return (
//     <div>
//       <h2>Counter App</h2>
//       <button onClick={increment}>Clicked {count} times</button>
//     </div>
//   );
// };

//React Hooks
// const App = () => {
//   const [count, setCount] = useState(0);
//   const increment = () => {
//     setCount(count + 1);
//   };
//   useEffect(() => {
//     document.title = `Clicked ${count} times`;
//   });
//   return (
//     <div>
//       <h2>Counter App</h2>
//       <button onClick={increment}>Clicked {count} times</button>
//     </div>
//   );
// };

//class component
// class App extends Component {
//   state = {
//     count: 0
//   };
//   increment = () => {
//     this.setState({
//       count: this.state.count + 1
//     });
//   };
//   render() {
//     return (
//       <div>
//         <h2>Counter App</h2>
//         <button onClick={this.increment}>
//           Clicked {this.state.count} times
//         </button>
//       </div>
//     );
//   }
// }

// class component
// class App extends Component {
//   state = {
//     count: 0
//   };
//component mounting
//   increment = () => {
//     this.setState({
//       count: this.state.count + 1
//     });
//   };
//   componentDidMount() {
//     document.title = `Clicked ${this.state.count} times`;
//   }
//   componentDidUpdate() {
//     document.title = `Clicked ${this.state.count} times`;
//   }
//   render() {
//     return (
//       <div>
//         <h2>Counter App</h2>
//         <button onClick={this.increment}>
//           Clicked {this.state.count} times
//         </button>
//       </div>
//     );
//   }
// }

export default App;
