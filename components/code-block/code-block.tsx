'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

type TokenType = 'keyword' | 'string' | 'comment' | 'tag' | 'attr' | 'number' | 'punct' | 'plain';

interface Token { text: string; type: TokenType }

const KEYWORDS = new Set([
  'import', 'export', 'default', 'from', 'const', 'let', 'var',
  'return', 'function', 'type', 'interface', 'extends', 'class',
  'new', 'this', 'true', 'false', 'null', 'undefined', 'async',
  'await', 'if', 'else', 'for', 'while', 'of', 'in', 'typeof', 'void', 'as',
]);

const COLORS: Record<TokenType, string> = {
  keyword: '#c792ea',
  string:  '#c3e88d',
  comment: '#546e7a',
  tag:     '#f07178',
  attr:    '#ffcb6b',
  number:  '#f78c6c',
  punct:   '#89ddff',
  plain:   '#e2e4e9',
};

function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  let pos = 0;
  let inTag = false;

  const push = (text: string, type: TokenType) => tokens.push({ text, type });

  while (pos < code.length) {
    // Line comment
    if (code.startsWith('//', pos)) {
      const end = code.indexOf('\n', pos);
      const text = end < 0 ? code.slice(pos) : code.slice(pos, end);
      push(text, 'comment'); pos += text.length; continue;
    }
    // Block comment
    if (code.startsWith('/*', pos)) {
      const end = code.indexOf('*/', pos + 2);
      const text = end < 0 ? code.slice(pos) : code.slice(pos, end + 2);
      push(text, 'comment'); pos += text.length; continue;
    }
    // Template literal
    if (code[pos] === '`') {
      let j = pos + 1;
      while (j < code.length && code[j] !== '`') { if (code[j] === '\\') j++; j++; }
      push(code.slice(pos, j + 1), 'string'); pos = j + 1; continue;
    }
    // Quoted string
    const q = code[pos];
    if (q === '"' || q === "'") {
      let j = pos + 1;
      while (j < code.length && code[j] !== q) { if (code[j] === '\\') j++; j++; }
      push(code.slice(pos, j + 1), 'string'); pos = j + 1; inTag = false; continue;
    }
    // JSX closing tag </Foo
    const closeTag = code.slice(pos).match(/^<\/([A-Za-z][a-zA-Z0-9.]*)/);
    if (closeTag) {
      push('</', 'punct'); push(closeTag[1], 'tag');
      pos += closeTag[0].length; inTag = true; continue;
    }
    // JSX opening tag <Foo
    const openTag = code.slice(pos).match(/^<([A-Z][a-zA-Z0-9.]*)/);
    if (openTag) {
      push('<', 'punct'); push(openTag[1], 'tag');
      pos += openTag[0].length; inTag = true; continue;
    }
    // Self-close />
    if (inTag && code.startsWith('/>', pos)) {
      push('/>', 'punct'); pos += 2; inTag = false; continue;
    }
    // Close >
    if (inTag && code[pos] === '>') {
      push('>', 'punct'); pos++; inTag = false; continue;
    }
    // Number
    if (/[0-9]/.test(code[pos])) {
      let j = pos;
      while (j < code.length && /[0-9.]/.test(code[j])) j++;
      push(code.slice(pos, j), 'number'); pos = j; continue;
    }
    // Word
    if (/[a-zA-Z_$]/.test(code[pos])) {
      let j = pos;
      while (j < code.length && /[\w$]/.test(code[j])) j++;
      const word = code.slice(pos, j);
      const rest = code.slice(j);
      if (inTag && !KEYWORDS.has(word) && /^[\s\n]*[={/>\n]/.test(rest)) {
        push(word, /^\s*=/.test(rest) ? 'attr' : 'attr');
      } else {
        push(word, KEYWORDS.has(word) ? 'keyword' : 'plain');
      }
      pos = j; continue;
    }
    // Everything else — merge whitespace/plain runs
    const ch = code[pos];
    const last = tokens[tokens.length - 1];
    if (last && last.type === 'plain') { last.text += ch; } else { push(ch, 'plain'); }
    pos++;
  }

  return tokens;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const trimmed = code.trim();

  function copy() {
    navigator.clipboard.writeText(trimmed).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  const tokens = tokenize(trimmed);

  return (
    <div style={{
      borderRadius: 12,
      background: '#16181d',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <span style={{
          fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-inter, sans-serif)',
        }}>
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          style={{
            background: 'transparent',
            border: `1px solid ${copied ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.15)'}`,
            borderRadius: 6, padding: '3px 10px', fontSize: 12,
            color: copied ? '#4ade80' : 'rgba(255,255,255,0.5)',
            cursor: 'pointer', fontFamily: 'var(--font-inter, sans-serif)',
            transition: 'color 0.15s, border-color 0.15s',
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <pre style={{
        margin: 0, padding: '20px 24px', overflowX: 'auto',
        fontSize: 13.5, lineHeight: 1.7, whiteSpace: 'pre',
        fontFamily: '"SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace',
      }}>
        <code>
          {tokens.map((tok, i) => (
            <span key={i} style={{ color: COLORS[tok.type] }}>{tok.text}</span>
          ))}
        </code>
      </pre>
    </div>
  );
}
