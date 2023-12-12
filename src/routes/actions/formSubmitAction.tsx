import { push, set, ref } from "firebase/database";

// Data & config
import { database } from "../../../firebase";
import { redirect } from "react-router";

// Types
import { ActionFunction } from "react-router";

const formSubmitAction: ActionFunction = async ({ params, request }) => {
  try {
    const uid = params.authorId;
    // Get form data and format to object
    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData);

    // Get key for database entry
    const newAnswerKey = push(
      ref(database, `/users/${uid}/formsAnswers/${params.formId}`)
    ).key as string;

    // Set new answer in database
    set(
      ref(
        database,
        `/users/${uid}/formsAnswers/${params.formId}/${newAnswerKey}`
      ),
      formDataObj
    );
    // Redirect to ThankYou Page
    // return { ok: true };
    return redirect("thankyou");
  } catch (error) {}

  return null;
};

export default formSubmitAction;
