import { Field, ErrorMessage } from "formik";

const TextInput = ({ label, name, placeholder, type = "text" }: any) => {
  return (
    <div className="mb-1 sm:mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="relative">
        <Field
          type={type}
          name={name}
          placeholder={placeholder}
          className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
        />
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
};

export default TextInput;