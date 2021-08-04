import React, { useEffect, useState } from 'react';

const errorMessage = 'There was a problem, please try again later';
const errorMessageDelete = 'You cannot delete this topic because it contains an album';

export default function AddTopic() {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [topics, setTopics] = useState([]);
  const [values, setValues] = useState({
    theme: '',
    image: '',
    description: ''
  });

  useEffect(() => {
    getTopics();
  }, []);

  const handleInputChange = ({ target }) => {
    const { value, name } = target;

    setValues((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addTopic();
  };

  const addTopic = async () => {
    setError('');
    setMessage('');
    try {
      const response = await fetch('/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      });
      const json = await response.json();
      if (!response.ok) {
        throw { message: json.msg };
      }
      setMessage(json.msg);
      getTopics();
    } catch (error) {
      setError(error.message);
    }
  };

  const getTopics = async () => {
    setError('');
    try {
      const response = await fetch('/topics');
      if (!response.ok) throw { message: errorMessage };

      const json = await response.json();
      setTopics(json);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteTopic = async (topic_id) => {
    setError('');
    setMessage('');

    try {
      const response = await fetch(`/topics/${topic_id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw { message: errorMessageDelete };

      const json = await response.json();
      setMessage(json.msg);

      getTopics();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <div class='md:flex md:justify-center'>
        <div class='md:flex max-w-sm'>
          <h1 class='text-gray-300'>Admin Dashboard</h1>
        </div>

        <form class='w-full max-w-sm shadow-md rounded px-8 pt-6 pb-8 mb-4' onSubmit={handleSubmit}>
          <div class='md:flex md:items-center mb-6'>
            <div class='md:w-1/3'>
              <label class='block text-gray-500 font-bold md:text-rigth mb-1 md:mb-0 pr-4' for='inline-theme'>
                Theme
              </label>
            </div>
            <div class='md:w-2/3'>
              <input
                id='inline-theme'
                class='bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2'
                name='theme'
                type='text'
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div class='md:flex md:items-center mb-6'>
            <div class='md:w-1/3'>
              <label class='block text-gray-500 font-bold md:text-rigth mb-1 md:mb-0 pr-4' for='inline-image'>
                Image
              </label>
            </div>
            <div class='md:w-2/3'>
              <input
                id='inline-image'
                class='bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 mb-2'
                type='text'
                name='image'
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div class='md:flex md:items-center mb-6'>
            <div class='md:w-1/3'>
              <label
                class='block text-gray-500 font-bold md:text-rigth mb-1 md:mb-0 pr-4'
                for='inline-description'>
                Description
              </label>
            </div>
            <div class='md:w-2/3'>
              <textarea
                id='inline-description'
                class='bg-gray-50 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                type='text'
                name='description'
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div class='md:flex'>
            <button class='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-2'>
              Add Topic
            </button>
          </div>
        </form>
      </div>

      {error && <div class='alert font-monospace mb-md-0 mt-3 mt-lg-auto small  text-warning'>{error}</div>}

      {message && (
        <div class='alert font-monospace mb-md-0 mt-3 mt-lg-auto small text-success'>{message}</div>
      )}

      <div class='list-group text-center'>
        <div class='row'>
          <div class='col'>
            <label class='text-secondary small'>Theme</label>
          </div>
          <div class='col text-center'>
            <label class='text-secondary small'>Topic Id</label>
          </div>
          <div class='col'></div>
        </div>

        {topics.map((topic, i) => (
          <div class='justify-content-between mb-4' key={i}>
            <div class='row'>
              <div class='col'>
                <label class='text-white-50'>{topic.theme}</label>
              </div>
              <div class='col text-center'>
                <label class='text-white-50'>{topic.topic_id}</label>
              </div>
              <div class='col'>
                <button
                  onClick={() => deleteTopic(topic.topic_id)}
                  class='btn btn-sm btn-light bg-transparent text-white-50'>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
