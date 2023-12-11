// Functions & hooks
import { push, set, update, ref, remove } from "firebase/database";
import { redirect } from "react-router";

// Data & config
import { auth, database } from "../../../firebase";
import { FORMS_COLORS } from "../../../config";

const formListAction: ActionFunction = async ({ request }) => {
  try {
    // Get current user unique ID
    const user = auth.currentUser;
    if (!user) return;

    const uid = user.uid;

    // Get form data and format to object
    const formData = await request.formData();
    const formDataObj = Object.fromEntries(formData);

    // Select action method
    switch (request.method) {
      case "POST":
        // Add new form
        // Get key for new form database entry
        const newFormKey = push(ref(database, `/users/${uid}/forms`))
          .key as string;

        // Pick random color
        const color: string =
          FORMS_COLORS[Math.floor(Math.random() * FORMS_COLORS.length)];

        // Set new form in database
        set(ref(database, `/users/${uid}/forms/${newFormKey}`), {
          description: formDataObj.formDescription,
          id: newFormKey,
          tagColor: color,
          title: formDataObj.formTitle,
          authorId: uid,
        });

        // Redirect to new form
        return redirect(`/${newFormKey}`);

      case "PATCH":
        update(ref(database, `/users/${uid}/forms/${formDataObj.formId}`), {
          title: formDataObj.formTitle,
          description: formDataObj.formDescription,
          tagColor: formDataObj.tagColor,
        });
        break;

      case "DELETE":
        // Deleting form detail
        remove(ref(database, `/users/${uid}/forms/${formDataObj.formId}`));

        // Deleting form fields
        remove(
          ref(database, `/users/${uid}/formsFields/${formDataObj.formId}`)
        );

        // Deleting form answers
        remove(
          ref(database, `/users/${uid}/formsAnswers/${formDataObj.formId}`)
        );
        break;
    }

    return { ok: true };
  } catch (error) {
    console.error(error);
  }

  return null;
};

export default formListAction;
