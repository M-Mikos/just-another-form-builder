// Functions & hooks
import { get, ref } from "firebase/database";

// Data & config
import { auth, database } from "../../../firebase";
import { LoaderFunction } from "react-router";

const formAnswersLoader: LoaderFunction = async ({ params }) => {
  try {
    // Get current user unique ID
    const user = auth.currentUser;

    if (user) {
      const uid = user.uid;
      const formDetails = await get(
        ref(database, `/users/${uid}/forms/${params.formId}`)
      );
      const formFields = await get(
        ref(database, `/users/${uid}/formsFields/${params.formId}`)
      );
      const formAnswers = await get(
        ref(database, `/users/${uid}/formsAnswers/${params.formId}`)
      );
      return {
        formDetails: formDetails.val(),
        formFields: formFields.val(),
        formAnswers: formAnswers.val(),
      };
    } else {
      return "no user";
    }
  } catch (error) {
    console.error(error);
  }
};

export default formAnswersLoader;
