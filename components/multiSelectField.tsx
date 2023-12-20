import React from "react";
import {Select, SelectItem, Avatar, Chip} from "@nextui-org/react";

export default function MultiSelectField() {

    const tags = [{id: 1, name: "Piss"}, {id: 2, name: "Puke"}, {id: 3, name: "Stumble"}, {id: 4, name: "Gay"}];

  return (
    <Select
      items={tags}
      label="Tags"
      variant="bordered"
      isMultiline={true}
      selectionMode="multiple"
      placeholder="Select one or multiple tags"
      labelPlacement="outside"
      classNames={{
        base: "max-w-xs",
        trigger: "min-h-unit-12 py-2",
      }}
      renderValue={(items) => {
        return (
            <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip key={item.key}>{item?.data?.name}</Chip>
            ))}
          </div>
        );
      }}
    >
      {(tag) => (
        <SelectItem key={tag.id} textValue={tag.name}>
          <div className="flex gap-2 items-center">
            <div className="flex flex-col">
              <span className="text-small">{tag.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}
