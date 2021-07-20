import React from 'react';
import './App.css';
import {
  HashRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';

class Home extends React.Component
{
  render ()
  { return ( <h2> Welcome to home page </h2> ); }
};
class Todo extends React.Component
{
  constructor(props){
    super(props);
    this.state =
    {
      button:"Add",
      toshow:[ "Walk the dog", "Pick up laundry"], input:"",id: 0
    };
  }

  delete(itemNum){
    var listItems = this.state.toshow;
    listItems.splice(itemNum, 1);
    this.setState({  toshow: listItems }
    );
  }

  edit(num){
    var listItems = this.state.toshow;
    this.setState({ button: "Edit", input: listItems[num], id: num
    });
  }

  renderTodoList(id, num){
    return <li>{id}  <button onClick={this.delete.bind(this, num)}>Delete</button>
    <button onClick={this.edit.bind(this, num)}>Edit</button></li>;
  }

  inputStateChange(event)
  {
    this.setState({input: event.target.value});
  }

  submitFunc() {
    var inputItem = this.state.input;
    var listItems = this.state.toshow;
    var buttons = this.state.button;
    var nbr = this.state.id;
    if(buttons === "Add")
    {
      listItems.push(inputItem);
      this.setState({ toshow: listItems, input: ""});
    }
    else
    {
      listItems[nbr] = inputItem;
      this.setState({ toshow: listItems, input: "", button: "Add", id: 0});
    }
  }

  render ()
  {
    return (
      <div>
        <h2> TODO LIST</h2>
        <input type="text" onChange={this.inputStateChange.bind(this)} value={this.state.input} style={{ marginLeft: '1rem' }} />
        <button style={{ marginLeft: '.5rem' }} onClick={this.submitFunc.bind(this)}>{this.state.button}</button>

        <h2> List </h2>
        <ul> {this.state.toshow.map(this.renderTodoList.bind(this))} </ul>
      </div>
    );
  }
};

class About extends React.Component
{
  render ()
  {
    return ( <h2>My about page</h2> );
  }
};

class Contact extends React.Component
{
  render ()
  {
    return ( <h2>My contact page</h2> );
  }
};

class App extends React.Component{
  render(){
    return(
      <Router>
        <div>
          <ul class ="topBar">
            <li class ="nav"><NavLink exact to="/">Home</NavLink></li>
            <li class ="nav"><NavLink to="todo">TODO</NavLink></li>
            <li class ="nav"><NavLink to="contact">Contact</NavLink></li>
            <li class ="nav"><NavLink to="about">About</NavLink></li>
          </ul>

          <Route exact path="/" component={Home}/>
          <Route path="/todo" component={Todo}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/about" component={About}/>

        </div>
      </Router>
    );
  }
}

export default App;
