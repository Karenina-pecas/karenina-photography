import React from 'react';
import AddTopic from './components/AddTopic';
import AddPhoto from './components/AddPhoto';
import TopicsView from './components/TopicsView';
import PhotosView from './components/PhotosView';

import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <nav class='bg-black grid-cols-4 '>
        <div class='max-w-7xl mx-auto px-2 sm:px-6 lg:px-8'>
          <div class='relative flex items-center justify-between h-16'>
            <div class='absolute inset-y-0  flex items-center md:right-1.5'>
              <div class='flex-1 flex items-center justify-center sm:items-stretch sm:justify-start'>
                <div class='flex-shrink-0 flex items-center'>
                  <div class='flex space-x-4'>
                    <div class='text-gray-300 hover:text-white font-medium'>
                      <h1>Karenina Photography</h1>
                    </div>
                    <div class='text-gray-300 hover:text-white font-extralight'>
                      <Link to='/addtopic'>Add Topic</Link>
                    </div>
                    <div class='text-gray-300 hover:text-white font-extralight'>
                      <Link to='/addphoto'>Add Photo</Link>
                    </div>
                    <div class='text-gray-300 hover:text-white font-extralight'>
                      <Link to='/topicsview'>Gallery</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class='d-flex justify-content-center'>
          <Switch>
            <Route path='/addtopic'>
              <AddTopic />
            </Route>
            <Route path='/addphoto'>
              <AddPhoto />
            </Route>
            <Route path='/topicsview/:topic_id'>
              <PhotosView />
            </Route>
            <Route path='/topicsview'>
              <TopicsView />
            </Route>
          </Switch>
        </div>
      </nav>
    </Router>
  );
}
