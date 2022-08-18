import { useState, useCallback, useEffect, memo } from 'react';
import { TextField, TextStyle, Checkbox } from '@shopify/polaris';

const componentNames = {
  'text-field': TextField,
  'check-box': Checkbox,
  'text-style': TextStyle,
};

function Element({ id, type, props, children, isHidden, changeDependencyValue }) {
  console.log('Element', id);
  const Component = componentNames[type];
  const [extraProps, setExtraProps] = useState(null);

  const handleChange = useCallback((value) => {
    const data = {};

    switch (type) {
      case 'text-field':
        data.value = value;
        break;
      case 'check-box':
        data.checked = value;
        break;
      default:
        break;
    }

    setExtraProps(prev => ({ ...prev, ...data }));
    if (changeDependencyValue) {
      changeDependencyValue(id, value);
    }
  }, [type, changeDependencyValue, id]);

  useEffect(() => {
    setExtraProps({ onChange: handleChange });
  }, [handleChange])

  return (
    Component && !isHidden &&
    <Component {...props} {...extraProps} >
      {children}
    </Component>
  );
}

export default memo(Element);
