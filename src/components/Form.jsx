import { useCallback, useState } from 'react';
import Element from './Element';
import { Stack } from '@shopify/polaris';

function Form({ data }) {
  const [dependencyValue, setDependencyValue] = useState({});

  const changeDependencyValue = useCallback((id, value) => {
    setDependencyValue(prev => ({
      ...prev,
      [id]: value
    }));
  }, []);

  const mapElement = useCallback((item) => {
    const { id, type, props, children, have_dependency, dependency } = item;
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
  }, [changeDependencyValue, dependencyValue]);

  return (
    <>
      <Stack vertical>
        {data && data.reduce((res, el) => {
          if (el.isHalf) {
            if (Array.isArray(res[res.length - 1])) res[res.length - 1].push(el);
            else res.push([el]);
          } else {
            res.push(el);
          }

          return res;
        }, []).map(items => {
            if (Array.isArray(items)) {
              return (
                <Stack distribution='equalSpacing'>
                  {items.map(item => mapElement(item))}
                </Stack>
              )
            }

            return mapElement(items);
          }
        )}
      </Stack>
    </>
  );
}

export default Form;
