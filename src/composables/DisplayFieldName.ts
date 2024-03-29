// converts a graphql field name to a user defined display name
import { computed } from "vue";
export function useDisplayFieldName(
  name: string,
  fieldRenames?: Record<string, string>
) {
  const displayFieldName = computed(() => {
    if (!fieldRenames) {
      return name;
    }
    const fieldName = fieldRenames.hasOwnProperty(name)
      ? fieldRenames[name]
      : name;
    return fieldName;
  });
  return { displayFieldName };
}
