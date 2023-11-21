import clsx from 'clsx';
import { MaterialSymbol } from 'material-symbols';
import { ButtonHTMLAttributes } from 'react';

import classes from './ActionButton.module.css';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  symbol: MaterialSymbol;
}

function ActionButton({ className, symbol, type = 'button', ...rest }: Props) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={clsx(className, 'material-symbols-rounded', classes.action)}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {symbol}
    </button>
  );
}

export default ActionButton;
