import './App.css';
import { useState, useEffect } from 'react';
import Form from './components/Form.jsx';

function App() {
  console.log('App rendered');
  const [data] = useState([
    {
      id: 1,
      type: 'text-field',
      label: 'First Name',
      autoComplete: 'off',
      dependency: {
        field_id: 2,
        value: true,
      }
    },
    {
      id: 2,
      type: 'check-box',
      label: 'Checkbox',
      have_dependency: true,
    },
    {
      id: 3,
      type: 'text-style',
      variation: 'code',
      children: 'Hello World',
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
    }
  ]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const dataFormat = data.map(item => {
      const { id, type, dependency, have_dependency, children, ...props } = item;
      return {
        id,
        type,
        dependency,
        have_dependency,
        children,
        props,
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
