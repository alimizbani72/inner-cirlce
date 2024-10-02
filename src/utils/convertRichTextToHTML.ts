import escapeHTML from "escape-html";
import type { Descendant } from "slate";
import { Text } from "slate";

function serializeNode(node: any, _index: number): string {
  if (Text.isText(node)) {
    let text = escapeHTML(node.text);

    if ((node as any).bold) {
      text = `<strong>${text}</strong>`;
    }

    if ((node as any).code) {
      text = `<code>${text}</code>`;
    }

    if ((node as any).italic) {
      text = `<em>${text}</em>`;
    }

    if ((node as any).strikethrough) {
      text = `<del>${text}</del>`;
    }

    if ((node as any).underline) {
      text = `<u>${text}</u>`;
    }

    if ((node as any).text === "") {
      text = `<br />`;
    }

    // Handle other leaf types here...

    return text;
  }

  if (!node) {
    return "";
  }

  switch (node.type) {
    case "h1":
      return `<h1>${node.children.map((n: any, i: number) => serializeNode(n, i)).join("")}</h1>`;
    case "h2":
      return `<h2>${node.children.map((n: any, i: number) => serializeNode(n, i)).join("")}</h2>`;
    case "h3":
      return `<h3>${node.children.map((n: any, i: number) => serializeNode(n, i)).join("")}</h3>`;
    case "h4":
      return `<h4>${node.children.map((n: any, i: number) => serializeNode(n, i)).join("")}</h4>`;
    case "h5":
      return `<h5>${node.children.map((n: any, i: number) => serializeNode(n, i)).join("")}</h5>`;
    case "h6":
      return `<h6>${node.children.map((n: any, i: number) => serializeNode(n, i)).join("")}</h6>`;
    case "blockquote":
      return `<blockquote>${node.children.map((n: any, i: number) => serializeNode(n, i)).join("")}</blockquote>`;
    case "ul":
      return `<ul>${node.children.map((n: any, i: number) => serializeNode(n, i)).join("")}</ul>`;
    case "ol":
      return `<ol>${node.children.map((n: any, i: number) => serializeNode(n, i)).join("")}</ol>`;
    case "li":
      return `<li>${node.children.map((n: any, i: number) => serializeNode(n, i)).join("")}</li>`;
    case "link":
      return `<a href="${escapeHTML(node.url)}" ${node.newTab ? 'target="_blank"' : ""}>${node.children
        .map((n: any, i: number) => serializeNode(n, i))
        .join("")}</a>`;
    default:
      return `<p>${node.children.map((n: any, i: number) => serializeNode(n, i)).join("")}</p>`;
  }
}

export function convertRichTextToHTML(richText: Descendant[]): string {
  return richText.map((node, index) => serializeNode(node, index)).join("");
}
