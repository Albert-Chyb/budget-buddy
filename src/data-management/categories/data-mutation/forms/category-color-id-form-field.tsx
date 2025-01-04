import { FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/form.tsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select.tsx';
import { CategoryColor } from '@/database/category-colors/query.ts';
import { recordIdValueAdapter } from '@/helpers/input-value-adapter.ts';

const NO_VALUE_PLACEHOLDER = 'Bez koloru';

interface CategoryColorIdFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  categoryColors: CategoryColor[];
}

export const CategoryColorIdFormField = <T extends FieldValues>(
  props: CategoryColorIdFormFieldProps<T>,
) => {
  const { name, categoryColors } = props;
  const form = useFormContext();
  const { toInputValue, fromInputValue, resetFlag } = recordIdValueAdapter;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>Wybierz kolor</FormLabel>
          <FormControl>
            <Select
              name={field.name}
              value={toInputValue(field.value)}
              onValueChange={(value) => field.onChange(fromInputValue(value))}
              disabled={field.disabled}
            >
              <SelectTrigger
                ref={field.ref}
                onBlur={field.onBlur}
              >
                <SelectValue placeholder={NO_VALUE_PLACEHOLDER} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={resetFlag}>
                  {NO_VALUE_PLACEHOLDER}
                </SelectItem>
                {categoryColors.map((color) => (
                  <SelectItem
                    key={color.id}
                    value={toInputValue(color.id)}
                  >
                    {color.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
