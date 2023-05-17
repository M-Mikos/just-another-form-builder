// Functions & hooks
import { useEffect, useRef, useState } from "react";
import { useFetcher } from "react-router-dom";
import { FORM_AUTOSAVE_DEBOUNCE_TIME } from "../../config";

// Data & config

/**
 * This hook calls form's action on form change. Hook prevents from saving form on initial component render. Hook uses debouncing to reduce quantity af action calls.
 * 
 * @param formElement mutable form element stored in react useRef().
 * @param actionPath path to react router action function.
 */

const useFormSaveOnChange = (formElement:React.MutableRefObject<HTMLFormElement>, actionPath: string) => {
  const [formChangeObserver, setFormChangeObserver] = useState<boolean>(false);
  const initialRender = useRef<boolean>(true);
  const fetcher = useFetcher();

  const saveOnChangeHandler = (): void => {
    setFormChangeObserver((state: boolean): boolean => {
      return !state;
    });
  };

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
    } else {
      const submitForm = setTimeout(() => {
        fetcher.submit(new FormData(formElement.current), {
          method: "PATCH",
          action: actionPath,
        });
      }, FORM_AUTOSAVE_DEBOUNCE_TIME);

      return () => clearTimeout(submitForm);
    }
  }, [formChangeObserver]);

  return saveOnChangeHandler;
};

export default useFormSaveOnChange;
