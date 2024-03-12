import { useDispatch, useSelector } from 'react-redux';
import { changeFilter } from 'store/filterSlice';
import css from './Filter.module.css';

export const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter);

  const handleChange = e => {
    return dispatch(changeFilter(e.currentTarget.value));
  };

  return (
    <div className={css.filterWrapper}>
      <label className={css.label}>
        Find contact by name
        <input
          className={css.input}
          type="text"
          placeholder="Enter name"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          value={filter}
          onChange={handleChange}
        />
      </label>
    </div>
  );
};
