import React from "react";
import AddTopic from './components/AddTopic'
import AddPhoto from './components/AddPhoto'
import TopicsView from './components/TopicsView'
import PhotosView from './components/PhotosView'

import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  
  return (
    <Router>
    <div className="container q w-50">    
    <div className="container pt-4">
    <div>
      <nav className="text-center mb-2 bg-gradient">
          <div className="row">
            <div className="col">
              <Link to="/addtopic">Add Topic</Link>
            </div>            
            <div className="col">           
            <Link to="/addphoto">Add Photo</Link>
            </div>
            <div className="col">
            <Link to="/topicsview">Topics View</Link>
            </div> 
        </div>
      </nav>  
    </div>     
      <div className="row text-center mt-5">
        <h1>Karenina Photography</h1>
      </div>
    </div>        
      
      <div className='d-flex justify-content-center'>           
      <Switch>             
        <Route path="/addtopic">
          <AddTopic />
        </Route>
        <Route path="/addphoto">
          <AddPhoto />
        </Route>        
        <Route path="/topicsview/:topic_id">
          <PhotosView />
        </Route>
        <Route path="/topicsview">
          <TopicsView />
        </Route>
      </Switch>
      </div>
    </div> 
  </Router>
  );
}


