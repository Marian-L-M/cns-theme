import { __ } from "@wordpress/i18n";
import { useState } from "@wordpress/element";
import {
  useBlockProps,
  InspectorControls,
  URLInput,
  BlockControls,
} from "@wordpress/block-editor";
import {
  Button,
  Modal,
  PanelBody,
  PanelRow,
  SelectControl,
  TextControl,
  ToolbarGroup,
  ToolbarButton,
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
      <div class="cns-um__wrapper">
        <Button className="cns-um__toggle" aria-label="user menu">
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
        <ul class="cns-um__nav-links"></ul>
      </div>
    </div>
  );
}
