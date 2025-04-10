import { Field, ErrorMessage } from "formik";

const SelectInput = ({ label, name, options }: any) => {
  return (
    <div className="mb-1 sm:mb-4">
      <label className="mb-2.5 block font-medium text-black dark:text-white">
        {label}
      </label>
      <div className="relative z-20 bg-transparent dark:bg-form-input">
        <Field
          as="select"
          name={name}
          className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input text-black dark:text-white"
        >
          <option value="" disabled>
            Select your {label}
          </option>
          {options.map((opt: string, idx: number) => (
            <option key={idx} value={opt}>
              {opt}
            </option>
          ))}
        </Field>
        <ErrorMessage
          name={name}
          component="div"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </div>
  );
};

export default SelectInput;