'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = 'tsx' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(code.trim()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div style={{
      position: 'relative',
      borderRadius: 12,
      background: '#16181d',
      border: '1px solid rgba(255,255,255,0.08)',
      overflow: 'hidden',
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.4)',
          fontFamily: 'var(--font-inter, sans-serif)',
        }}>
          {language}
        </span>
        <button
          type="button"
          onClick={copy}
          style={{
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 6,
            padding: '3px 10px',
            fontSize: 12,
            color: copied ? '#4ade80' : 'rgba(255,255,255,0.5)',
            cursor: 'pointer',
            fontFamily: 'var(--font-inter, sans-serif)',
            transition: 'color 0.15s, border-color 0.15s',
            borderColor: copied ? 'rgba(74,222,128,0.4)' : undefined,
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code */}
      <pre style={{
        margin: 0,
        padding: '20px 24px',
        overflowX: 'auto',
        fontSize: 13.5,
        lineHeight: 1.7,
        color: '#e2e4e9',
        fontFamily: '"SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", monospace',
        whiteSpace: 'pre',
      }}>
        <code>{code.trim()}</code>
      </pre>
    </div>
  );
}
