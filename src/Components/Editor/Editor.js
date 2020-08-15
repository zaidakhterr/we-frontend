import "./editor.css";

import React, { useMemo, useCallback } from "react";
import { Editable, withReact, useSlate, Slate } from "slate-react";
import { Editor as SlateEditor, Transforms, createEditor } from "slate";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import Icon from "@ant-design/icons";
import isHotkey from "is-hotkey";

import { ReactComponent as Code } from "./../../Assets/Icons/code.svg";
import { ReactComponent as Bold } from "./../../Assets/Icons/format_bold.svg";
import { ReactComponent as Italic } from "./../../Assets/Icons/format_italic.svg";
import { ReactComponent as Underline } from "./../../Assets/Icons/format_underlined.svg";
import { ReactComponent as BulletedList } from "./../../Assets/Icons/format_list_bulleted.svg";
import { ReactComponent as NumberedList } from "./../../Assets/Icons/format_list_numbered.svg";
import { ReactComponent as Heading1 } from "./../../Assets/Icons/looks_one.svg";
import { ReactComponent as Heading2 } from "./../../Assets/Icons/looks_two.svg";
import { ReactComponent as Quote } from "./../../Assets/Icons/format_quote.svg";

const HOTKEYS = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    SlateEditor.removeMark(editor, format);
  } else {
    SlateEditor.addMark(editor, format, true);
  }
};

const isBlockActive = (editor, format) => {
  const [match] = SlateEditor.nodes(editor, {
    match: n => n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor, format) => {
  const marks = SlateEditor.marks(editor);
  return marks ? marks[format] === true : false;
};

const Element = ({ attributes, children, element }) => {
  switch (element.type) {
    case "block-quote":
      return <blockquote {...attributes}>{children}</blockquote>;
    case "bulleted-list":
      return <ul {...attributes}>{children}</ul>;
    case "heading-one":
      return <h1 {...attributes}>{children}</h1>;
    case "heading-two":
      return <h2 {...attributes}>{children}</h2>;
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return <ol {...attributes}>{children}</ol>;
    case "code-block":
      return (
        <code className="code-block" {...attributes}>
          {children}
        </code>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const ToolbarButton = ({ active, icon, title, onMouseDown }) => {
  return (
    <Tooltip
      arrowPointAtCenter
      placement="topLeft"
      color="#2b3b3b"
      title={title}
    >
      <span
        className="toolbar-btn"
        style={{
          color: active ? "#fff" : "#2b3b3b",
          backgroundColor: active ? "#ed9327" : "#fff",
        }}
        onMouseDown={onMouseDown}
      >
        <Icon className="toolbar-icon" component={icon} />
      </span>
    </Tooltip>
  );
};

const BlockButton = ({ format, icon, title }) => {
  const editor = useSlate();
  return (
    <ToolbarButton
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleBlock(editor, format);
      }}
      icon={icon}
      title={title}
    />
  );
};

const MarkButton = ({ format, icon, title }) => {
  const editor = useSlate();
  return (
    <ToolbarButton
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault();
        toggleMark(editor, format);
      }}
      icon={icon}
      title={title}
    />
  );
};

const Toolbar = () => {
  return (
    <>
      <div className="toolbar">
        <MarkButton
          title={
            <>
              Bold <code>Ctrl</code> <code>B</code>
            </>
          }
          format="bold"
          icon={Bold}
        />
        <MarkButton
          title={
            <>
              Italic <code>Ctrl</code> <code>I</code>
            </>
          }
          format="italic"
          icon={Italic}
        />
        <MarkButton
          title={
            <>
              Underline <code>Ctrl</code> <code>U</code>
            </>
          }
          format="underline"
          icon={Underline}
        />
        <MarkButton
          title={
            <>
              Code <code>Ctrl</code> <code>`</code>
            </>
          }
          format="code"
          icon={Code}
        />
        <BlockButton title="Heading 1" format="heading-one" icon={Heading1} />
        <BlockButton title="Heading 2" format="heading-two" icon={Heading2} />
        <BlockButton title="Block Quote" format="block-quote" icon={Quote} />
        <BlockButton
          title="Numbered List"
          format="numbered-list"
          icon={NumberedList}
        />
        <BlockButton
          title="Bulleted List"
          format="bulleted-list"
          icon={BulletedList}
        />
        <BlockButton title="Code Block" format="code-block" icon={Code} />
      </div>
    </>
  );
};

const Editor = ({ value, setValue, error, readOnly = false }) => {
  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <>
      <Slate
        editor={editor}
        value={value}
        onChange={newValue => {
          setValue(newValue);
        }}
      >
        <div
          className="editor"
          style={{
            borderColor: error ? "#ff4d4f" : "",
            minHeight: readOnly ? "none" : "30px",
          }}
        >
          {!readOnly && <Toolbar />}
          <Editable
            readOnly={readOnly}
            className="editable"
            style={{ minHeight: readOnly ? "none" : "200px" }}
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            spellCheck={false}
            onKeyDown={event => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </div>
      </Slate>
    </>
  );
};

Editor.propTypes = {
  value: PropTypes.array.isRequired,
  setValue: PropTypes.func,
};

export default Editor;
