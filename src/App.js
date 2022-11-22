import './App.css';
import { useState, useEffect, useMemo } from 'react';
import Form from './components/Form.jsx';
import { Button, Link, Stack } from '@shopify/polaris';
import CountDown from './components/CountDown';

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

  const options = useMemo(() => {
    const settings = {
      change_variant: true,
      change_quantity: true,
      disable_remove: false,
      haveOneVariant: false,
    };

    const layoutSettings = [
      {
        enable: settings.change_variant && !settings.haveOneVariant,
        isFullWidth: true,
        view: (<Button key="variant">Change variant</Button>)
      },
      {
        enable: settings.change_quantity,
        isFullWidth: true,
        view: (<Button key="quantity">Change quantity</Button>)
      },
      {
        enable: !settings.disable_remove,
        view: (<Button key="remove">Remove</Button>)
      }
    ];

    const layout = layoutSettings.filter(l => l.enable).reduce((res, el) => {
      if (!el.isFullWidth && res.length) {
        res[res.length - 1].push(el);
      } else {
        res.push([el]);
      }

      return res;
    }, []).map(items => {
      const views = items.map(item => item.view);

      return items.length > 1 ? (<Stack distribution='equalSpacing'> {views} </Stack>) : (views)
    });

    return layout.length ? (
      <Stack vertical>
        <Link> Change options </Link>
        {layout}
      </Stack>
    ) : null;
  }, []);

  return (
    <div className="App">
      <Form data={formData} />
      {options}
      <CountDown duration={1/5} />
    </div>
  );
}

export default App;
