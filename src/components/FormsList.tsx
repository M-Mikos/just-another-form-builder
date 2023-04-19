// Components
import FormListItem from "./FormListItem";

// Types
import { Form } from "../types/types";

const INITIAL_FORMS: Form[] = [
  {
    id: "sampleform1",
    title: "Sample Form 1",
    description: "This is sample description of Sample Form 1",
    fields: [
      {
        id: "field1",
        name: "name",
        required: true,
        formElement: "input",
        attributes: {
          type: "text",
          value: null,
          min: null,
          max: null,
          step: null,
          rows: null,
        },
        answers: ["Persefona", "Kasjopeja", "Minerwa"],
      },
      {
        id: "field1",
        name: "name",
        required: true,
        formElement: "input",
        attributes: {
          type: "text",
          value: null,
          min: null,
          max: null,
          step: null,
          rows: null,
        },
        answers: ["Persefona", "Kasjopeja", "Minerwa"],
      },
      {
        id: "field2",
        name: "bio",
        required: true,
        formElement: "textarea",
        attributes: {
          type: null,
          value: null,
          min: null,
          max: null,
          step: null,
          rows: null,
        },
        answers: [
          "Była córką Demeter i Zeusa. W mitologii rzymskiej Persefonę utożsamiono z Prozerpiną. Została porwana przez Hadesa, gdy wraz z towarzyszkami bawiła się na łące. Kiedy próbowała zerwać piękny kwiat narcyza, ziemia rozwarła się i pojawił się Hades na złotym rydwanie, uprowadzając ją do swego królestwa.",
          "Uchodziła za żonę króla Etiopii, Cefeusza (Kefeusa) i matkę Andromedy. Była bardzo urodziwa, ale jednocześnie niezwykle próżna i zarozumiała. Bogowie przemienili ją po śmierci w gwiazdozbiór nieba północnego. Mityczna Kasjopeja jest identyfikowana z gwiazdozbiorem Kasjopei (Cassiopeia).",
          "Jest to prawdopodobnie bogini pochodzenia etruskiego (znana jest etruska bogini Menrva). Razem z Jowiszem i Junoną tworzyła Trójcę Kapitolińską. Utożsamiano ją z grecką Ateną, którą również często przedstawiano w zbroi i hełmie. Jej atrybutem była sowa, będąca alegorią jej mądrości.",
        ],
      },
      {
        id: "field3",
        name: "From 1 to 10, are you happy?",
        required: true,
        formElement: "input",
        attributes: {
          type: null,
          value: null,
          min: 1,
          max: 10,
          step: 1,
          rows: null,
        },
        answers: [4, 8, 2],
      },
    ],
  },
  {
    id: "sampleform2",
    title: "Sample Form 2",
    description: "This is sample description of Sample Form 2",
    fields: [],
  },
  {
    id: "sampleform3",
    title: "Sample Form 3",
    description: "This is sample description of Sample Form 3",
    fields: [],
  },
];

const FormList = () => {
  return (
    <ul>
      {INITIAL_FORMS.map((form) => (
        <FormListItem
          title={form.title}
          description={form.description}
          id={form.id}
        />
      ))}
    </ul>
  );
};

export default FormList;
