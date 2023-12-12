// Functions & hooks
import { get, ref } from "firebase/database";

// Data & config
import { auth, database } from "../../../firebase";
import { LoaderFunction } from "react-router";

const formFillLoader: LoaderFunction = async ({ params }) => {
  try {
    const uid = params.authorId;
    const formDetails = await get(
      ref(database, `/users/${uid}/forms/${params.formId}`)
    );
    const formFields = await get(
      ref(database, `/users/${uid}/formsFields/${params.formId}`)
    );
    return {
      formDetails: formDetails.val(),
      formFields: formFields.val(),
    };
  } catch (error) {
    console.error(error);
  }
};

export default formFillLoader;
