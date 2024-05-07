import { IoSearchOutline } from "react-icons/io5";
import { Formik, Field, Form } from "formik";
import toast, { Toaster } from "react-hot-toast";
import css from "./SearchBar.module.css";
export default function SearchBar({ onSearch }) {
  const notify = () => toast("Empty! Write something");
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        if (!values.query.trim()) {
          notify();
        }
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

        <Toaster
          toastOptions={{
            style: {
              background: "orangered",
              color: "white",
              border: "1px solid black",
              fontSize: "18px",
            },
          }}
        />
      </Form>
    </Formik>
  );
}
