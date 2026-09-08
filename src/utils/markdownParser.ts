type Block =
    | { type: "heading"; level: number; content: string }
    | { type: "p"; content: string }
    | { type: "quote"; content: string }
    | { type: "hr" }
    | { type: "ul"; items: string[] }
    | { type: "ol"; items: string[] }
    | { type: "code"; content: string };

function parseInline(text: string): string {
    let html = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
    html = html.replace(/~~(.+?)~~/g, "<del>$1</del>");
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    return html;
}

function parseBlocks(markdown: string): Block[] {
    const lines = (markdown || "").split("\n");
    const blocks: Block[] = [];
    let i = 0;

    while (i < lines.length) {
        const line = lines[i];

        if (line.trim() === "") {
            i++;
            continue;
        }

        if (line.startsWith("```")) {
            const codeLines: string[] = [];
            i++;
            while (i < lines.length && !lines[i].startsWith("```")) {
                codeLines.push(lines[i]);
                i++;
            }
            i++;
            blocks.push({ type: "code", content: codeLines.join("\n") });
            continue;
        }

        const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
        if (headingMatch) {
            blocks.push({ type: "heading", level: headingMatch[1].length, content: headingMatch[2] });
            i++;
            continue;
        }

        if (/^>\s?/.test(line)) {
            const quoteLines: string[] = [];
            while (i < lines.length && /^>\s?/.test(lines[i])) {
                quoteLines.push(lines[i].replace(/^>\s?/, ""));
                i++;
            }
            blocks.push({ type: "quote", content: quoteLines.join(" ") });
            continue;
        }

        if (/^(-{3,}|\*{3,}|_{3,})$/.test(line.trim())) {
            blocks.push({ type: "hr" });
            i++;
            continue;
        }

        if (/^\s*[-*+]\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^\s*[-*+]\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\s*[-*+]\s+/, ""));
                i++;
            }
            blocks.push({ type: "ul", items });
            continue;
        }

        if (/^\s*\d+\.\s+/.test(line)) {
            const items: string[] = [];
            while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
                items.push(lines[i].replace(/^\s*\d+\.\s+/, ""));
                i++;
            }
            blocks.push({ type: "ol", items });
            continue;
        }

        const paraLines: string[] = [];
        while (i < lines.length && lines[i].trim() !== "" && !lines[i].match(/^(#{1,6})\s+/) && !lines[i].startsWith("```")) {
            paraLines.push(lines[i]);
            i++;
        }
        blocks.push({ type: "p", content: paraLines.join(" ") });
    }

    return blocks;
}

export function markdownToHtml(markdown: string): string {
    const blocks = parseBlocks(markdown);

    return blocks
        .map((block) => {
            switch (block.type) {
                case "heading":
                    return `<h${block.level}>${parseInline(block.content)}</h${block.level}>`;
                case "p":
                    return `<p>${parseInline(block.content)}</p>`;
                case "quote":
                    return `<blockquote>${parseInline(block.content)}</blockquote>`;
                case "hr":
                    return "<hr />";
                case "ul":
                    return `<ul>${block.items.map((item) => `<li>${parseInline(item)}</li>`).join("")}</ul>`;
                case "ol":
                    return `<ol>${block.items.map((item) => `<li>${parseInline(item)}</li>`).join("")}</ol>`;
                case "code":
                    return `<pre><code>${block.content.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</code></pre>`;
                default:
                    return "";
            }
        })
        .join("\n");
}