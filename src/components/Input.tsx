import { CheckIcon, XCircleIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import React, { ReactElement, useState } from 'react';

import styles from '../styles/component_styles/Input.module.css';

interface PropType extends React.InputHTMLAttributes<HTMLInputElement> {
  color?: 'default' | 'error' | 'success';
  label?: string;
  showMessage?: Boolean;
  message?: ReactElement;
  value?: string;
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, PropType> =
  function (props, ref) {
    const {
      placeholder,
      className,
      showMessage,
      onChange,
      id,
      label,
      message,
      color,
      value = '',
      ...otherProps
    } = props;
    const [inputState, setInputState] = useState(value);

    const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
      onChange && onChange(e);
      setInputState(e.target.value);
    };

    const clearHandler = () => {
      setInputState('');
    };

    const messageClass = classNames({
      [styles['message-show']]: showMessage,
      [styles['message-hide']]: !showMessage,
    });

    return (
      <div
        className={`${styles['input-div']} ${
          color ? styles['input-' + color] : ''
        } ${className} relative`}
      >
        <label className={`${styles['input-label']}`} htmlFor={id}>
          {label}
        </label>

        <div className={`${styles['input-box']} relative w-full`}>
          <input
            className={`${styles['input']} w-full`}
            id={id}
            placeholder={placeholder}
            onChange={changeHandler}
            ref={ref}
            value={inputState}
            {...otherProps}
          />
          <span className={styles['focus-border']}></span>
          <div className={styles['input-end-icons']}>
            {color == 'success' && (
              <CheckIcon
                stroke="#10B981"
                className={`h-6-w ${styles['input-tick-icon']}`}
              ></CheckIcon>
            )}
            {inputState && inputState.length != 0 ? (
              <XCircleIcon
                fill="lightgray"
                className={`h-6-w mr-12${styles['input-clear-icon']} mb-2 `}
                style={{
                  cursor: 'pointer',
                  display: `${color == 'error' ? 'block' : ''} `,
                  color: 'white',
                }}
                onClick={clearHandler}
              ></XCircleIcon>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className={messageClass}>{message}</div>
      </div>
    );
  };

export default React.forwardRef(Input);
