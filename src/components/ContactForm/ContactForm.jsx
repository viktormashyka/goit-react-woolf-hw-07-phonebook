import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from 'store/operations';
import { selectContactsItems } from 'store/selectors';
import { toast } from 'react-toastify';
import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  phone: '',
};

export const ContactForm = () => {
  const [newContact, setNewContact] = useState(INITIAL_STATE);

  const contacts = useSelector(selectContactsItems);
  const dispatch = useDispatch();

  const handleChange = evt => {
    const { name, value } = evt.target;
    setNewContact(prevContact => ({ ...prevContact, [name]: value }));
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (
      contacts.some(
        contact =>
          contact.name.toLocaleLowerCase() ===
          newContact.name.toLocaleLowerCase()
      )
    ) {
      toast.info(`Contact "${newContact.name}" is already in contacts`);
      return;
    }

    dispatch(addContact(newContact));

    setNewContact(INITIAL_STATE);
  };

  const { name, phone } = newContact;
  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        Name
        <input
          className={css.input}
          type="text"
          placeholder="Enter name"
          name="name"
          required
          value={name}
          onChange={handleChange}
        />
      </label>
      <label className={css.label}>
        Number
        <input
          className={css.input}
          type="tel"
          placeholder="Enter phone number"
          name="phone"
          required
          value={phone}
          onChange={handleChange}
        />
      </label>
      <button className={css.button} type="submit">
        Add contact
      </button>
    </form>
  );
};
