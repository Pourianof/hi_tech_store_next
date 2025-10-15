import Icon from "@/ui/icons/icon";
import Select, { ActionMeta, OnChangeValue } from "react-select";
import { useCategoryComponents } from "./componentProvider";
import { useEffect, useState } from "react";
import { CategoryComponent } from "@/core/models/category";
import { useCategoryFormContext } from "./categoryFormContext";

function mapComponentToSelectOption(components: CategoryComponent[]) {
  return components.map((cmnpt) => ({
    label: cmnpt.name,
    value: cmnpt,
  }));
}
export function CategoryComponents() {
  const componentsContext = useCategoryComponents();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const categoryFormContext = useCategoryFormContext();
  const [selectedComponents, setSelectedComponents] = useState<
    CategoryComponent[]
  >([]);

  useEffect(() => {
    if (componentsContext.hasLoaded && componentsContext.components.length) {
      const newlyCreatedComponents = componentsContext.components.filter(
        (c) =>
          (c as unknown as { isNew: boolean }).isNew &&
          !selectedComponents?.find(
            (_c) => c.componentTypeId == _c.componentTypeId
          )
      );

      setSelectedComponents((cs) => [...cs, ...newlyCreatedComponents]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentsContext.hasLoaded, componentsContext.components]);

  function handleSelectionChange(
    val: OnChangeValue<{ label: string; value: CategoryComponent }, true>,
    actionMeta: ActionMeta<{ label: string; value: CategoryComponent }>
  ) {
    switch (actionMeta.action) {
      case "select-option":
        setSelectedComponents(() => [...val.map((c) => c.value)]);
        break;
      case "pop-value":
      case "remove-value":
        setSelectedComponents([...val.map((c) => c.value)]);
    }
  }

  function handleMenuOpening() {
    componentsContext.loadComponents();
    setIsMenuOpened(true);
  }

  return (
    <div className="border my-2 p-2 flex flex-col gap-2">
      <h4 className="font-semibold border-b py-2">
        <Icon name="component" className="text-2xl inline-block me-2" />
        Category Components
      </h4>
      <div aria-label="summary">
        <div>
          <h5 className="text-center my-2 bg-gray-300 font-semibold p-1 rounded-sm">
            Select or Create component for category
          </h5>
          <p className="bg-green-300 text-sm p-3 rounded">
            Components are template of data which define a piece of a product of
            this category.
            <br />
            For example we can have <b>Ram</b> component for <b>laptops</b>{" "}
            category which define details of this part of product like{" "}
            <i>Capacity</i>, <i>Brand</i>, <i>Clock rate</i> and other detail
            about this component.
          </p>
        </div>
      </div>
      <div>
        <div>
          <h3 className="font-semibold">Select from existing components:</h3>
          <Select
            components={{
              MultiValueLabel: ({ data }) => {
                return <span className="py-0.5 px-2">{data.label}</span>;
              },
              Option: ({ data: { value: cmnpt }, innerProps }) => (
                <div
                  className={"p-2 hover:bg-blue-200 hover:[&>div]:bg-blue-300"}
                  {...innerProps}
                >
                  <div className="bg-gray-neutral-ed rounded p-2">
                    <h3 className="font-semibold">{cmnpt.name}</h3>
                    <div>
                      <p className="text-sm">{cmnpt.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {cmnpt.properties.map((p) => (
                          <div
                            className="text-xs bg-gray-neutral-cb p-1 rounded text-gray-neutral-44"
                            key={p.propertyId}
                          >
                            {p.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            }}
            isLoading={isMenuOpened && !componentsContext.hasLoaded}
            menuIsOpen={isMenuOpened && componentsContext.hasLoaded}
            onMenuOpen={handleMenuOpening}
            onMenuClose={() => setIsMenuOpened(false)}
            options={mapComponentToSelectOption(componentsContext.components)}
            isSearchable
            isMulti
            value={mapComponentToSelectOption(selectedComponents)}
            onChange={handleSelectionChange}
            placeholder="Selet from existing components..."
          />
          <div className="flex items-center py-2 gap-2">
            <h3 className="font-semibold">Or register new one:</h3>
            <button
              className="text-2xl py-0.5 px-2 bg-blue-200 hover:bg-blue-300 rounded-lg cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                categoryFormContext.changeToComponentFormMode();
              }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
