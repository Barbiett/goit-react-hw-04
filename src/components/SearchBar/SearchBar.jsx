import { IoSearchOutline } from "react-icons/io5";
import { Formik, Field, Form } from "formik";
import css from "./SearchBar.module.css";
export default function SearchBar({ onSearch }) {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        onSearch(values.query);
        actions.resetForm();
      }}
    >
      <Form className={css.form}>
        <Field className={css.field} name="query" />

        <button type="submit">
          Search
          <IoSearchOutline size={30} className={css.icon} />
        </button>
      </Form>
    </Formik>
  );
}
