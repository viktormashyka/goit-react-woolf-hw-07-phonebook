import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from 'store/operations';
import {
  selectContactsItems,
  selectContactsIsLoading,
  selectContactsError,
  selectFilter,
} from 'store/selectors';
import { Loader } from 'components/Loader/Loader';
import css from './ContactList.module.css';

export const ContactList = () => {
  const contacts = useSelector(selectContactsItems);
  const isLoading = useSelector(selectContactsIsLoading);
  const error = useSelector(selectContactsError);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  );

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  return (
    <>
      {isLoading && <Loader />}
      {error && <p className={css.text}>{error}</p>}
      {!error && contacts.length > 0 && (
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
