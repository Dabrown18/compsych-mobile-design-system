'use client';

import {
  useState,
  type ComponentType,
  type ReactNode,
} from 'react';
import styles from './mobile-playground.module.css';
import playgroundStyles from '../playground/playground.module.css';

// ---------------------------------------------------------------------------
// Control schema — mirrors playground.tsx types, inlined to avoid re-export
// ordering issues that confuse webpack's module resolver.
// ---------------------------------------------------------------------------

export interface PlaygroundEnumControl {
  name: string;
  type: 'enum';
  options: readonly string[];
  defaultValue: string;
  label?: string;
}

export interface PlaygroundBooleanControl {
  name: string;
  type: 'boolean';
  defaultValue: boolean;
  label?: string;
}

export interface PlaygroundStringControl {
  name: string;
  type: 'string';
  defaultValue: string;
  placeholder?: string;
  label?: string;
}

export type PlaygroundControl =
  | PlaygroundEnumControl
  | PlaygroundBooleanControl
  | PlaygroundStringControl;

// ---------------------------------------------------------------------------

export interface MobilePlaygroundProps {
  component?: ComponentType<Record<string, unknown>>;
  controls: readonly PlaygroundControl[];
  staticProps?: Record<string, unknown>;
  renderChildren?: (props: Record<string, unknown>) => ReactNode;
  render?: (
    values: Record<string, unknown>,
    setValue: (name: string, value: unknown) => void,
  ) => ReactNode;
}

function buildInitialState(controls: readonly PlaygroundControl[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const c of controls) {
    out[c.name] = c.defaultValue;
  }
  return out;
}

export function MobilePlayground({
  component: Component,
  controls,
  staticProps = {},
  renderChildren,
  render,
}: MobilePlaygroundProps) {
  const [values, setValues] = useState<Record<string, unknown>>(() =>
    buildInitialState(controls),
  );

  function setValue(name: string, value: unknown) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  const combinedProps = { ...staticProps, ...values };

  let stage: ReactNode = null;
  if (render) {
    stage = render(values, setValue);
  } else if (Component) {
    stage = (
      <Component {...combinedProps}>
        {renderChildren ? renderChildren(combinedProps) : undefined}
      </Component>
    );
  }

  return (
    <div className={playgroundStyles.root}>
      <div className={styles.main}>
        <div className={styles.stage}>
          {stage}
        </div>

        <div className={playgroundStyles.controls}>
          {controls.map((c) => (
            <ControlRow
              key={c.name}
              control={c}
              value={values[c.name]}
              onChange={setValue}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ControlRow({
  control,
  value,
  onChange,
}: {
  control: PlaygroundControl;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  return (
    <div className={playgroundStyles.controlRow}>
      <label className={playgroundStyles.controlLabel}>
        {control.label ?? control.name}
      </label>
      <div className={playgroundStyles.controlField}>
        {control.type === 'enum' && (
          <SegmentedControl
            options={(control as PlaygroundEnumControl).options}
            value={String(value)}
            onChange={(v) => onChange(control.name, v)}
          />
        )}
        {control.type === 'boolean' && (
          <SwitchControl
            checked={Boolean(value)}
            onChange={(v) => onChange(control.name, v)}
          />
        )}
        {control.type === 'string' && (
          <TextInput
            value={String(value ?? '')}
            placeholder={(control as PlaygroundStringControl).placeholder}
            onChange={(v) => onChange(control.name, v)}
          />
        )}
      </div>
    </div>
  );
}

function SegmentedControl({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div role="radiogroup" className={playgroundStyles.segmented}>
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            className={`${playgroundStyles.segment} ${active ? playgroundStyles.segmentActive : ''}`}
            onClick={() => onChange(opt)}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function SwitchControl({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className={`${playgroundStyles.switch} ${checked ? playgroundStyles.switchOn : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className={playgroundStyles.switchThumb} aria-hidden />
    </button>
  );
}

function TextInput({
  value,
  placeholder,
  onChange,
}: {
  value: string;
  placeholder?: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type="text"
      className={playgroundStyles.textInput}
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}
