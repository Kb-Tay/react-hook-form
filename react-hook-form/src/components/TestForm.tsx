import React from "react";
import { useFieldArray, useForm, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { type Path, type ArrayPath, type Control } from "react-hook-form";
import { register } from "module";

type Props = {};

type DynamicProps<T extends FieldValues> = {
  prefix: ArrayPath<T>;
  control: Control<T>;
};

const schema = z.object({
  name: z.string(),
  age: z.number(),
  fav_food: z.array(
    z.object({
      food: z.string(),
      likes: z.number(),
    })
  ),
});

type Schema = z.infer<typeof schema>;

const defaultValues: Schema = {
  name: "Hello",
  age: 10,
  fav_food: [
    {
      food: "macs",
      likes: 10,
    },
  ],
};

type FormComponent<T> = {
  field: Path<T>;
  type: "text" | "number";
};

type Manual = Schema["fav_food"][number];

type NestedFormComponent<T> = {
  type: "array";
  field: ArrayPath<T>;
  form: FormComponent<Manual>[];
};

const formComponents: (FormComponent<Schema> | NestedFormComponent<Schema>)[] =
  [
    {
      field: "name",
      type: "text",
    },
    {
      field: "age",
      type: "number",
    },
    {
      field: "fav_food",
      type: "array",
      form: [
        {
          type: "food",
        },
      ],
    },
  ];

function DynamicFormField<T extends FieldValues>({
  prefix,
  control,
}: DynamicProps<T>) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: prefix,
  });

  return (
    <div>
      {/* {
        fields.map((field) => Object)
      } */}
    </div>
  );
  // <button
  //       className="bg-slate-300"
  //       onClick={() =>
  //         append({
  //           food: "test",
  //           likes: 0,
  //         })
  //       }
  //     >
  //       Add
  //     </button>
  //     <button className="bg-slate-300" onClick={() => remove(0)}>
  //       Remove
  //     </button>
}

type test = ArrayPath<Schema>;

export default function TestForm({}: Props) {
  const { register, control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "fav_food",
  // });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        // handle inputs
        console.log(data);
      })}
      className="flex flex-col"
    >
      {formComponents.map((field) =>
        field.type != "array" ? (
          <input
            className="border-2"
            {...register(field.field)}
            type={field.type}
          />
        ) : (
          <DynamicFormField prefix={field.field} control={control} />
        )
      )}
      <input type="submit" />
    </form>
  );
}
