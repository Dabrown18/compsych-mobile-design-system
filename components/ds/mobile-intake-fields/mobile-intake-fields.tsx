'use client';

import { CheckboxField } from '../mobile-form-fields/checkbox-field';
import { DropdownField, type DropdownFieldOption } from '../mobile-form-fields/dropdown-field';
import { FieldLabel } from '../mobile-form-fields/field-label';
import { RadioGroup, type RadioOption } from '../mobile-form-fields/radio-group';
import { Input } from '../mobile-input/mobile-input';

export interface TextFieldConfig {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
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

export interface RadioGroupConfig<T extends string> {
  label: string;
  required?: boolean;
  options: RadioOption<T>[];
  selected: T | null;
  onSelect: (value: T) => void;
  invalid?: boolean;
}

export interface IntakeFieldsProps<
  TGenderIdentity extends string,
  TBenefitHolderRelationship extends string,
> {
  description?: TextFieldConfig & { helperText?: string };
  firstName: TextFieldConfig;
  lastName: TextFieldConfig;
  genderIdentity: RadioGroupConfig<TGenderIdentity>;
  ageRange: DropdownFieldConfig<string>;
  ageConfirmed: {
    label: string;
    checked: boolean;
    onPress: () => void;
    required?: boolean;
  };
  usState: DropdownFieldConfig<string>;
  benefitHolderRelationship: RadioGroupConfig<TBenefitHolderRelationship>;
}

export function IntakeFields<
  TGenderIdentity extends string,
  TBenefitHolderRelationship extends string,
>({
  description,
  firstName,
  lastName,
  genderIdentity,
  ageRange,
  ageConfirmed,
  usState,
  benefitHolderRelationship,
}: IntakeFieldsProps<TGenderIdentity, TBenefitHolderRelationship>) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      {description && (
        <Input
          label={description.label}
          value={description.value}
          onChange={(e) => description.onChangeText(e.target.value)}
          placeholder={description.placeholder}
          helperText={description.helperText}
          invalid={description.invalid}
        />
      )}

      <Input
        label={firstName.label}
        value={firstName.value}
        onChange={(e) => firstName.onChangeText(e.target.value)}
        placeholder={firstName.placeholder}
        invalid={firstName.invalid}
      />

      <Input
        label={lastName.label}
        value={lastName.value}
        onChange={(e) => lastName.onChangeText(e.target.value)}
        placeholder={lastName.placeholder}
        invalid={lastName.invalid}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <FieldLabel
          label={genderIdentity.label}
          required={genderIdentity.required}
        />
        <RadioGroup
          options={genderIdentity.options}
          selected={genderIdentity.selected}
          onSelect={genderIdentity.onSelect}
          invalid={genderIdentity.invalid}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <FieldLabel
          label={ageRange.label}
          required
        />
        <DropdownField
          options={ageRange.options}
          value={ageRange.value}
          onSelect={ageRange.onSelect}
          placeholder={ageRange.placeholder}
          title={ageRange.title}
          invalid={ageRange.invalid}
        />
      </div>

      <CheckboxField
        checked={ageConfirmed.checked}
        onPress={ageConfirmed.onPress}
        label={ageConfirmed.label}
        required={ageConfirmed.required}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <FieldLabel
          label={usState.label}
          required
        />
        <DropdownField
          options={usState.options}
          value={usState.value}
          onSelect={usState.onSelect}
          placeholder={usState.placeholder}
          title={usState.title}
          invalid={usState.invalid}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <FieldLabel
          label={benefitHolderRelationship.label}
          required={benefitHolderRelationship.required}
        />
        <RadioGroup
          options={benefitHolderRelationship.options}
          selected={benefitHolderRelationship.selected}
          onSelect={benefitHolderRelationship.onSelect}
          invalid={benefitHolderRelationship.invalid}
        />
      </div>
    </div>
  );
}
