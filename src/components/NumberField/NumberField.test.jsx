import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';
import NumberField from '.';

describe('NumberField', () => {
  it('"minus" button disabled', () => {
    const tree = renderer
      .create(<NumberField label="test" value={0} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('"minus" and "plus" buttons enabled', () => {
    const tree = renderer
      .create(<NumberField label="test" value={101} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should trigger onChange callback on "plus" and "minus" button clicks', () => {
    const onChange = jest.fn();
    let container = document.createElement('div');
    document.body.appendChild(container);
    act(() => {
      ReactDOM.render(<NumberField label="test" value={101} onChange={onChange} />, container);
    });

    act(() => {
      container
        .querySelector('.number-field__button--minus')
        .dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });
    act(() => {
      container
        .querySelector('.number-field__button--plus')
        .dispatchEvent(new MouseEvent('click', {bubbles: true}));
    });

    expect(onChange.mock.calls.length).toBe(2);
    expect(onChange.mock.calls[0][0]).toBe(100);
    expect(onChange.mock.calls[1][0]).toBe(101);

    document.body.removeChild(container);
    container = null;
  });
});
