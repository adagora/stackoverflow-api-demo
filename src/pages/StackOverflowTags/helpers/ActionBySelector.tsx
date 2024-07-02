import Selector from "../../../components/Selector/Selector";
import SelectorOption from "../../../components/Selector/SelectorOption";
import { IStackOverflowTagsFilter } from "../@types/IStackOverflowTagsFilter";
import {
  directionOptions,
  pageSizeOptions,
  sortOptions
} from "./OptionsSelector";

export const SortBySelector: React.FC<{
  value: string;
  onChange: (value: Pick<IStackOverflowTagsFilter, "sortedBy">) => void;
}> = ({ value, onChange }) => {
  return (
    <Selector
      label="Sort By"
      value={value}
      onChange={({ target }): void => {
        onChange({
          ...target,
          sortedBy: target.value as "popular" | "activity" | "name"
        });
      }}
      aria-labelledby="SortByLabel"
    >
      {sortOptions.map((option) => (
        <SelectorOption key={option.value} value={option.value}>
          {option.label}
        </SelectorOption>
      ))}
    </Selector>
  );
};

export const SortDirectionSelector: React.FC<{
  value: string;
  onChange: (value: Pick<IStackOverflowTagsFilter, "sortedDirection">) => void;
}> = ({ value, onChange }) => {
  return (
    <Selector
      label="Sort Direction"
      value={value}
      onChange={({ target }): void => {
        onChange({
          ...target,
          sortedDirection: target.value as "asc" | "desc"
        });
      }}
      aria-labelledby="SortDirectionLabel"
    >
      {directionOptions.map((option) => (
        <SelectorOption key={option.value} value={option.value}>
          {option.label}
        </SelectorOption>
      ))}
    </Selector>
  );
};

export const PageSizeSelector: React.FC<{
  value: number | string;
  onChange: (value: Pick<IStackOverflowTagsFilter, "pageSize">) => void;
}> = ({ value, onChange }) => {
  return (
    <Selector
      label="Items per Page"
      value={value}
      onChange={({ target }): void => {
        onChange({
          ...target,
          pageSize: parseInt(target.value as string, 10)
        });
      }}
      aria-labelledby="PageSizeLabel"
      sx={{ width: 100 }}
    >
      {pageSizeOptions.map((option) => (
        <SelectorOption key={option.value} value={option.value}>
          {option.label}
        </SelectorOption>
      ))}
    </Selector>
  );
};
