import { useCallback, useState } from 'react';
import Element from './Element';
import { Stack } from '@shopify/polaris';

function Form({ data }) {
  console.log('Form render');
  const [dependencyValue, setDependencyValue] = useState({});

  const changeDependencyValue = useCallback((id, value) => {
    setDependencyValue(prev => ({
      ...prev,
      [id]: value
    }));
  }, []);

  return (
    <Stack vertical>
      {data && data.map(
        ({ id, type, props, children, have_dependency, dependency }) => {
          const extraProps = {
            ...(have_dependency && { changeDependencyValue }),
            ...(dependency && { isHidden: !dependencyValue[dependency.field_id] })
          };

          return (
            <Element
              key={id}
              id={id}
              type={type}
              props={props}
              children={children}
              {...extraProps}
            />
          )
        }
      )}
    </Stack>
  );
}

export default Form;
