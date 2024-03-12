import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'store/operations';
import { selectContacts, selectFilter } from 'store/selectors';
import { Loader } from 'components/Loader/Loader';
import css from './ContactList.module.css';

export const ContactList = () => {
  const { items, isLoading, error } = useSelector(selectContacts);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const filteredContacts = items.filter(contact =>
    contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <p className={css.text}>{error}</p>}
      {!error && items.length > 0 && (
        <table className={css.contactTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Number</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(contact => (
              <tr key={contact.id}>
                <td className={css.text}>{contact.name}</td>
                <td className={css.text}>{contact.phone}</td>
                <td className={css.text}>
                  <button
                    className={css.deleteButton}
                    onClick={() => handleDelete(contact.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
