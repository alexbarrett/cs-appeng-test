import clsx from 'clsx';

import classes from './Loader.module.css';

/**
 * Renders a simple spinner.
 */
function Loader() {
  return (
    <div className={classes.loader}>
      <span className={clsx(classes.icon, 'material-symbols-rounded')}>
        progress_activity
      </span>
    </div>
  );
}

export default Loader;
