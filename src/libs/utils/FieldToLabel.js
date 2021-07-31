import capitalizeFirstLetter from "./capitalizeFirstLetter";

export default function FieldToLabel(field_name) {
  let field_name_array = field_name?.split("_") || [];
  field_name_array.forEach((word, index) => {
    field_name_array[index] = capitalizeFirstLetter(word);
    return field_name_array[index];
  });
  return field_name_array.join(" ");
}
