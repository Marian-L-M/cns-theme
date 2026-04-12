import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
  useBlockProps,
  InspectorControls,
  URLInput,
} from "@wordpress/block-editor";
import {
  Button,
  Modal,
  PanelBody,
  PanelRow,
  SelectControl,
  TextControl,
} from "@wordpress/components";
import "./editor.scss";

export default function Edit({ attributes, setAttributes }) {
  const DRAFT_DEFAULTS = {
    label: "",
    url: "",
    linkNewTab: false,
    order: 0,
  };

  const { items } = attributes;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [draft, setDraft] = useState(DRAFT_DEFAULTS);

  function openAddModal() {
    setDraft(DRAFT_DEFAULTS);
    setEditingIndex(null);
    setIsModalOpen(true);
  }

  function openEditModal(index) {
    const item = items[index];
    setDraft({
      label: item.label,
      url: item.url || "",
      linkNewTab: item.linkNewTab || false,
      order: item.order ?? 0,
    });
    setEditingIndex(index);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  function saveItem() {
    const newItem = {
      id: editingIndex !== null ? items[editingIndex].id : String(Date.now()),
      label: draft.label,
      url: draft.url,
      linkNewTab: draft.linkNewTab,
      order: draft.order,
    };

    if (editingIndex !== null) {
      setAttributes({
        items: items.map((item, i) => (i === editingIndex ? newItem : item)),
      });
    } else {
      setAttributes({ items: [...items, newItem] });
    }

    closeModal();
  }
  function removeItem(index) {
    setAttributes({ items: items.filter((_, i) => i !== index) });
    setEditingIndex(null);
    setIsModalOpen(false);
  }

  return (
    <div {...useBlockProps()}>
      <InspectorControls>
        <PanelBody title={__("Mode Settings", "cns-theme")} initialOpen={false}>
          <PanelRow>
            <SelectControl
              label={__("Mobile display", "cns-theme")}
              value={attributes.mode}
              options={[
                {
                  label: "Side Menu",
                  value: "side-nav",
                },
                {
                  label: "Dropdown",
                  value: "dropdown-nav",
                },
              ]}
              onChange={(value) => setAttributes({ mode: value })}
              __next40pxDefaultSize
            />
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      {isModalOpen && (
        <Modal
          title={
            editingIndex !== null
              ? __("Edit Item", "cns-theme")
              : __("Add Item", "cns-theme")
          }
          onRequestClose={closeModal}
          className="cns-header-nav__modal"
        >
          {/* Adjusted until here */}
          <TextControl
            label={__("Label", "cns-theme")}
            value={draft.label}
            onChange={(value) =>
              setDraft((prev) => ({ ...prev, label: value }))
            }
          />
          <div className="cns-header-nav__url-field">
            <label className="components-base-control__label">
              {__("Search post or add url", "cns-theme")}
            </label>
            <URLInput
              value={draft.url}
              onChange={(url) => setDraft((prev) => ({ ...prev, url: url }))}
              placeholder={__("Search pages or paste URL…", "cns-theme")}
            />
          </div>
          <div className="cns-header-nav__modal-actions">
            <Button variant="primary" onClick={saveItem}>
              {__("Save", "cns-theme")}
            </Button>
            <Button variant="secondary" onClick={closeModal}>
              {__("Cancel", "cns-theme")}
            </Button>
            <Button
              variant="tertiary"
              onClick={() => removeItem(editingIndex)}
              isDestructive
            >
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M7.10002 5H3C2.44772 5 2 5.44772 2 6C2 6.55228 2.44772 7 3 7H4.06055L4.88474 20.1871C4.98356 21.7682 6.29471 23 7.8789 23H16.1211C17.7053 23 19.0164 21.7682 19.1153 20.1871L19.9395 7H21C21.5523 7 22 6.55228 22 6C22 5.44772 21.5523 5 21 5H19.0073C19.0018 4.99995 18.9963 4.99995 18.9908 5H16.9C16.4367 2.71776 14.419 1 12 1C9.58104 1 7.56329 2.71776 7.10002 5ZM9.17071 5H14.8293C14.4175 3.83481 13.3062 3 12 3C10.6938 3 9.58254 3.83481 9.17071 5ZM17.9355 7H6.06445L6.88085 20.0624C6.91379 20.5894 7.35084 21 7.8789 21H16.1211C16.6492 21 17.0862 20.5894 17.1192 20.0624L17.9355 7ZM14.279 10.0097C14.83 10.0483 15.2454 10.5261 15.2068 11.0771L14.7883 17.0624C14.7498 17.6134 14.2719 18.0288 13.721 17.9903C13.17 17.9517 12.7546 17.4739 12.7932 16.9229L13.2117 10.9376C13.2502 10.3866 13.7281 9.97122 14.279 10.0097ZM9.721 10.0098C10.2719 9.97125 10.7498 10.3866 10.7883 10.9376L11.2069 16.923C11.2454 17.4739 10.83 17.9518 10.2791 17.9903C9.72811 18.0288 9.25026 17.6134 9.21173 17.0625L8.79319 11.0771C8.75467 10.5262 9.17006 10.0483 9.721 10.0098Z"
                  fill="#0F1729"
                />
              </svg>
            </Button>
          </div>
        </Modal>
      )}
      <nav className="cns-header__nav">
        <ul className={`cns-header__nav__links ${attributes.mode} is-active`}>
          {items.map((item, index) => (
            <li key={item.id} className="cns-header__nav__item">
              <Button
                variant="tertiary"
                size="medium"
                onClick={() => openEditModal(index)}
              >
                <span>{item.label}</span>
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3.99997H6C4.89543 3.99997 4 4.8954 4 5.99997V18C4 19.1045 4.89543 20 6 20H18C19.1046 20 20 19.1045 20 18V12M18.4142 8.41417L19.5 7.32842C20.281 6.54737 20.281 5.28104 19.5 4.5C18.7189 3.71895 17.4526 3.71895 16.6715 4.50001L15.5858 5.58575M18.4142 8.41417L12.3779 14.4505C12.0987 14.7297 11.7431 14.9201 11.356 14.9975L8.41422 15.5858L9.00257 12.6441C9.08001 12.2569 9.27032 11.9013 9.54951 11.6221L15.5858 5.58575M18.4142 8.41417L15.5858 5.58575"
                    stroke="#000000"
                    stroke-width="1"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Button>
            </li>
          ))}
          <Button
            variant="primary"
            onClick={openAddModal}
            className="cns-header__nav__add-btn"
          >
            + Add link
          </Button>
        </ul>
        <div className="cns-header__nav__btn-container">
          <Button className="user-btn" aria-label="user menu">
            <svg
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z"
                fill="currentColor"
              />
              <path
                d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z"
                fill="currentColor"
              />
            </svg>
          </Button>
          <Button className="hamburger-btn">
            <span></span>
            <span></span>
            <span></span>
          </Button>
        </div>
      </nav>
    </div>
  );
}
