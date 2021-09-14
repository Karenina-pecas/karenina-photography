import React, { useEffect, useState } from 'react';

const errorMessage = 'There was a problem, please try again later';
const errorMessageDelete = 'You cannot delete this theme because it contains an album';

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
      <div class='md:flex justify-center'>
        <form
          class='w-full max-w-sm shadow-md rounded px-8 pt-6 pb-8 mb-4 border ml-7 mt-3'
          onSubmit={handleSubmit}>
          <div class='w-full max-w-sm text-center'>
            <div class='md:flex md:items-center justify-around mb-4'>
              <h1 class='text-gray-300 font-bold text-lg'>Admin View</h1>
            </div>
          </div>
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

        <div class='rounded-lg'>
          <div class='w-full max-w-sm italic text-center mx-7 mb-3'>
            {error && <div class='text-white'>{error}</div>}

            {message && <div class='text-white'>{message}</div>}
          </div>
          <table class='w-full table-fixed max-w-sm shadow-sm rounded mb-4 mx-7 border text-white'>
            <thead class='grid-cols-1 divide-y divide-white'>
              <tr>
                <th class='text-center'>Theme</th>
                <th class='text-center'>Id</th>
              </tr>
              <tr></tr>
            </thead>
            <tbody class='grid-cols-1 divide-y divide-gray-200'>
              {topics.map((topic, i) => (
                <tr key={i}>
                  <td class='text-center'>{topic.theme}</td>
                  <td class='text-center'>{topic.topic_id}</td>
                  <td>
                    <button
                      onClick={() => deleteTopic(topic.topic_id)}
                      class='inline-flex items-center justify-center mb-1 mt-1 w-6 h-6 mr-2 text-white-100 transition-colors duration-150 bg-gray-500 rounded-lg focus:shadow-outline hover:bg-gray-700 border'>
                      <svg class='w-4 h-4 fill-current' viewBox='0 0 20 20'>
                        <path
                          d='M17.114,3.923h-4.589V2.427c0-0.252-0.207-0.459-0.46-0.459H7.935c-0.252,0-0.459,0.207-0.459,0.459v1.496h-4.59c-0.252,0-0.459,0.205-0.459,0.459c0,0.252,0.207,0.459,0.459,0.459h1.51v12.732c0,0.252,0.207,0.459,0.459,0.459h10.29c0.254,0,0.459-0.207,0.459-0.459V4.841h1.511c0.252,0,0.459-0.207,0.459-0.459C17.573,4.127,17.366,3.923,17.114,3.923M8.394,2.886h3.214v0.918H8.394V2.886z M14.686,17.114H5.314V4.841h9.372V17.114z M12.525,7.306v7.344c0,0.252-0.207,0.459-0.46,0.459s-0.458-0.207-0.458-0.459V7.306c0-0.254,0.205-0.459,0.458-0.459S12.525,7.051,12.525,7.306M8.394,7.306v7.344c0,0.252-0.207,0.459-0.459,0.459s-0.459-0.207-0.459-0.459V7.306c0-0.254,0.207-0.459,0.459-0.459S8.394,7.051,8.394,7.306'
                          clip-rule='evenodd'
                          fill-rule='evenodd'></path>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
