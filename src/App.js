import './App.css';
import { useState, useEffect } from 'react';
import Form from './components/Form.jsx';

function App() {
  console.log('App rendered');
  const [data] = useState([
    {
      id: 6,
      type: 'check-box',
      label: 'First',
      have_dependency: true,
      isHalf: true,
    },
    {
      id: 7,
      type: 'check-box',
      label: 'Last',
      have_dependency: true,
      isHalf: true,
    },
    {
      id: 8,
      type: 'text-style',
      variation: 'code',
      children: 'Hello World',
    },
    {
      id: 2,
      type: 'text-field',
      label: 'Last Name',
      autoComplete: 'off',
      dependency: {
        field_id: 7,
        value: false,
      },
      isHalf: true,
    },
    {
      id: 3,
      type: 'text-field',
      label: 'Alo',
    },
    {
      id: 4,
      type: 'text-style',
      variation: 'subdued',
      children: 'aLOOOOO',
    },
    {
      id: 5,
      type: 'check-box',
      label: 'ABC',
    },
    {
      id: 1,
      type: 'text-field',
      label: 'First Name',
      autoComplete: 'off',
      dependency: {
        field_id: 6,
        value: false,
      },
      isHalf: true,
    },
  ]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const dataFormat = data.map(item => {
      const { id, type, dependency, have_dependency, children, isHalf, ...props } = item;
      return {
        id,
        type,
        dependency,
        have_dependency,
        children,
        props,
        isHalf
      }
    });

    setFormData(dataFormat);
  }, [data])

  return (
    <div className="App">
      <Form data={formData} />
    </div>
  );
}

export default App;
