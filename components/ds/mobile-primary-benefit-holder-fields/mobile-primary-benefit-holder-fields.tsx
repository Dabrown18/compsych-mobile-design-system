'use client';

import { CheckboxField } from '../mobile-form-fields/checkbox-field';
import { DropdownField, type DropdownFieldOption } from '../mobile-form-fields/dropdown-field';
import { EmailField } from '../mobile-form-fields/email-field';
import { FieldLabel } from '../mobile-form-fields/field-label';
import { PhoneNumberField } from '../mobile-form-fields/phone-number-field';
import { Input } from '../mobile-input/mobile-input';

export interface TextFieldConfig {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  editable?: boolean;
  invalid?: boolean;
}

export interface DropdownFieldConfig<T extends string | number> {
  label: string;
  options: DropdownFieldOption<T>[];
  value: T | null;
  onSelect: (value: T) => void;
  placeholder: string;
  title: string;
  invalid?: boolean;
}

export interface PrimaryBenefitHolderFieldsProps {
  firstName: TextFieldConfig;
  lastName: TextFieldConfig;
  employerLabel: string;
  employer: string;
  isLoadingGroups: boolean;
  group: DropdownFieldConfig<number>;
  phoneNumber: TextFieldConfig;
  phoneType: DropdownFieldConfig<string>;
  email: {
    label?: string;
    required?: boolean;
    value: string;
    onChangeText: (value: string) => void;
    onValidChange?: (valid: boolean) => void;
    invalidEmailMessage: string;
  };
  followUpConsent: {
    label: string;
    checked: boolean;
    onPress: () => void;
  };
}

export function PrimaryBenefitHolderFields({
  firstName,
  lastName,
  employerLabel,
  employer,
  isLoadingGroups,
  group,
  phoneNumber,
  phoneType,
  email,
  followUpConsent,
}: PrimaryBenefitHolderFieldsProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <Input
        label={firstName.label}
        value={firstName.value}
        onChange={(e) => firstName.onChangeText(e.target.value)}
        placeholder={firstName.placeholder}
        disabled={firstName.editable === false}
        invalid={firstName.invalid}
      />

      <Input
        label={lastName.label}
        value={lastName.value}
        onChange={(e) => lastName.onChangeText(e.target.value)}
        placeholder={lastName.placeholder}
        disabled={lastName.editable === false}
        invalid={lastName.invalid}
      />

      <Input
        label={employerLabel}
        value={employer}
        disabled
        onChange={() => {}}
      />

      {isLoadingGroups && (
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            border: '2px solid var(--sys-color-outline-variant)',
            borderTopColor: 'var(--sys-color-primary)',
            animation: 'mobile-primary-benefit-holder-fields-spin 0.8s linear infinite',
          }}
        />
      )}

      {!isLoadingGroups && group.options.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <FieldLabel
            label={group.label}
            required
          />
          <DropdownField
            options={group.options}
            value={group.value}
            onSelect={group.onSelect}
            placeholder={group.placeholder}
            title={group.title}
            invalid={group.invalid}
          />
        </div>
      )}

      <PhoneNumberField
        label={phoneNumber.label}
        required
        value={phoneNumber.value}
        onChangeText={phoneNumber.onChangeText}
        placeholder={phoneNumber.placeholder}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <FieldLabel
          label={phoneType.label}
          required
        />
        <DropdownField
          options={phoneType.options}
          value={phoneType.value}
          onSelect={phoneType.onSelect}
          placeholder={phoneType.placeholder}
          title={phoneType.title}
          invalid={phoneType.invalid}
        />
      </div>

      <EmailField
        label={email.label}
        required={email.required}
        value={email.value}
        onChangeText={email.onChangeText}
        onValidChange={email.onValidChange}
        invalidEmailMessage={email.invalidEmailMessage}
      />

      <CheckboxField
        checked={followUpConsent.checked}
        onPress={followUpConsent.onPress}
        label={followUpConsent.label}
      />

      <style>{`@keyframes mobile-primary-benefit-holder-fields-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
